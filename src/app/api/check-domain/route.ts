
import { NextResponse } from 'next/server'
import dns from 'dns'
import { promisify } from 'util'

const resolveTxt = promisify(dns.resolveTxt)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
  }

  try {
    const [dmarcResult, spfResult, dkimResult] = await Promise.all([
      checkDMARC(domain),
      checkSPF(domain),
      checkDKIM(domain),
    ])

    return NextResponse.json({
      dmarc: dmarcResult.status,
      dmarcRecord: dmarcResult.record,
      spf: spfResult.status,
      spfRecord: spfResult.record,
      dkim: dkimResult.status,
      dkimRecord: dkimResult.record,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error checking domain records' }, { status: 500 })
  }
}

async function checkDMARC(domain: string): Promise<{ status: string; record: string }> {
  try {
    const records = await resolveTxt(`_dmarc.${domain}`)
    const dmarcRecord = records.find(record => record[0].startsWith('v=DMARC1'))
    if (dmarcRecord) {
      return { status: 'valid', record: dmarcRecord[0] }
    } else {
      return { status: 'invalid', record: 'No valid DMARC record found' }
    }
  } catch (error) {
    return { status: 'not found', record: 'No DMARC record found' }
  }
}

async function checkSPF(domain: string): Promise<{ status: string; record: string }> {
  try {
    const records = await resolveTxt(domain)
    const spfRecord = records.find(record => record[0].startsWith('v=spf1'))
    if (spfRecord) {
      return { status: 'valid', record: spfRecord[0] }
    } else {
      return { status: 'invalid', record: 'No valid SPF record found' }
    }
  } catch (error) {
    return { status: 'not found', record: 'No SPF record found' }
  }
}

async function checkDKIM(domain: string): Promise<{ status: string; record: string }> {
  // Note: DKIM is more complex to check without knowing the selector
  // This is a simplified check that looks for a default selector
  try {
    const records = await resolveTxt(`default._domainkey.${domain}`)
    const dkimRecord = records.find(record => record[0].startsWith('v=DKIM1'))
    if (dkimRecord) {
      return { status: 'valid', record: dkimRecord[0] }
    } else {
      return { status: 'invalid', record: 'No valid DKIM record found for default selector' }
    }
  } catch (error) {
    return { status: 'not found', record: 'No DKIM record found for default selector' }
  }
}
