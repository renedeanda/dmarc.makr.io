'use client'

import { useState } from 'react';
import { Share2, Download, Copy, CheckCircle } from 'lucide-react';

interface ShareResultsProps {
  domain: string;
  results: any;
  score: number;
}

export default function ShareResults({ domain, results, score }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);

  const generateReport = () => {
    const dkimSummary = results.dkimResults?.map((d: any) => `  - Selector "${d.selector}": ${d.status}`).join('\n') || '  No DKIM selectors found';

    const report = `
DMARC Security Report
=====================
Domain: ${domain}
Generated: ${new Date().toLocaleString()}
Security Score: ${score}/100

RESULTS:
--------
DMARC: ${results.dmarc}${results.dmarcRecord ? `\nRecord: ${results.dmarcRecord}` : ''}

SPF: ${results.spf}${results.spfRecord ? `\nRecord: ${results.spfRecord}` : ''}

DKIM:
${dkimSummary}

---
Report generated using DMARC Checker by MAKR.io
Check your domain: https://dmarc.makr.io
    `.trim();

    return report;
  };

  const downloadReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dmarc-report-${domain}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyResults = () => {
    const report = generateReport();
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareResults = async () => {
    const shareData = {
      title: `DMARC Check Results for ${domain}`,
      text: `Security Score: ${score}/100\n\nDMARC: ${results.dmarc}\nSPF: ${results.spf}\nDKIM: ${results.dkimResults?.some((d: any) => d.status === 'valid') ? 'valid' : 'not found'}`,
      url: `https://dmarc.makr.io`
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy
        copyResults();
      }
    } catch (err) {
      // User cancelled or error - fallback to copy
      copyResults();
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        onClick={shareResults}
        className="flex-1 min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share Results
      </button>
      <button
        onClick={copyResults}
        className="flex-1 min-w-[140px] bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        {copied ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy Report
          </>
        )}
      </button>
      <button
        onClick={downloadReport}
        className="flex-1 min-w-[140px] bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
}
