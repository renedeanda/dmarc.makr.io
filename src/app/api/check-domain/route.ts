
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
      dmarc: dmarcResult,
      spf: spfResult,
      dkim: dkimResult,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error checking domain records' }, { status: 500 })
  }
}

async function checkDMARC(domain: string): Promise<string> {
  try {
    const records = await resolveTxt(`_dmarc.${domain}`)
    return records.some(record => record[0].startsWith('v=DMARC1')) ? 'valid' : 'invalid'
  } catch (error) {
    return 'not found'
  }
}

async function checkSPF(domain: string): Promise<string> {
  try {
    const records = await resolveTxt(domain)
    return records.some(record => record[0].startsWith('v=spf1')) ? 'valid' : 'invalid'
  } catch (error) {
    return 'not found'
  }
}

async function checkDKIM(domain: string): Promise<string> {
  // Note: DKIM is more complex to check without knowing the selector
  // This is a simplified check that looks for a default selector
  try {
    const records = await resolveTxt(`default._domainkey.${domain}`)
    return records.some(record => record[0].startsWith('v=DKIM1')) ? 'valid' : 'not found'
  } catch (error) {
    return 'not found'
  }
}
