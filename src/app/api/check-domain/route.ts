
import { NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  try {
    const [dmarcRecord, spfRecord] = await Promise.all([
      getDmarcRecord(domain),
      getSpfRecord(domain),
    ]);

    const dkimResults = await checkDkimSelectors(domain);

    return NextResponse.json({
      dmarc: dmarcRecord ? 'valid' : 'not found',
      dmarcRecord,
      spf: spfRecord ? 'valid' : 'not found',
      spfRecord,
      dkimResults,
    });
  } catch (error) {
    console.error('Error checking domain:', error);
    return NextResponse.json({ error: 'Failed to check domain' }, { status: 500 });
  }
}

async function getDmarcRecord(domain: string): Promise<string | null> {
  try {
    const records = await resolveTxt(`_dmarc.${domain}`);
    return records[0].join('');
  } catch (error) {
    return null;
  }
}

async function getSpfRecord(domain: string): Promise<string | null> {
  try {
    const records = await resolveTxt(domain);
    const spfRecord = records.find(record => record[0].startsWith('v=spf1'));
    return spfRecord ? spfRecord.join('') : null;
  } catch (error) {
    return null;
  }
}

async function checkDkimSelectors(domain: string): Promise<{ selector: string; status: string }[]> {
  const commonSelectors = ['default', 'google', 'selector1', 'selector2', 'k1', 'dkim'];
  const results = await Promise.all(
    commonSelectors.map(async (selector) => {
      try {
        const records = await resolveTxt(`${selector}._domainkey.${domain}`);
        return { selector, status: 'valid' };
      } catch (error) {
        return { selector, status: 'not found' };
      }
    })
  );
  return results.filter(result => result.status === 'valid');
}
