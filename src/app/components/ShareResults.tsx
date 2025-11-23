'use client'

import { useState } from 'react';
import { Share2, Download, Copy, CheckCircle, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ShareResultsProps {
  domain: string;
  results: any;
  score: number;
}

export default function ShareResults({ domain, results, score }: ShareResultsProps) {
  const [copied, setCopied] = useState(false);

  const generateReport = () => {
    const dkimSummary = results.dkimResults?.map((d: any) => `  - Selector "${d.selector}": ${d.status}`).join('\n') || '  No DKIM selectors found';

    // Determine overall security level
    let securityLevel = 'Critical';
    if (score >= 80) securityLevel = 'Strong';
    else if (score >= 50) securityLevel = 'Moderate';
    else if (score >= 30) securityLevel = 'Weak';

    // Generate recommendations
    const recommendations: string[] = [];
    const issues: string[] = [];
    let priorityActions: string[] = [];

    // DMARC analysis
    if (results.dmarc === 'not found') {
      issues.push('❌ DMARC: Not configured (High Risk)');
      recommendations.push(`
📧 DMARC Not Found - HIGH PRIORITY
   Problem: Your domain has no DMARC policy, making it vulnerable to email
   spoofing and phishing attacks.

   Impact: Attackers can send emails that appear to come from your domain.
   Legitimate emails may be marked as spam by some receivers.

   Action Required:
   1. Create a DMARC record with monitoring policy:
      _dmarc.${domain}  TXT  "v=DMARC1; p=none; rua=mailto:dmarc@${domain}"
   2. Monitor reports for 1-2 weeks
   3. Gradually increase policy to p=quarantine, then p=reject

   Learn more: https://dmarc.makr.io/guide/setup-dmarc`);
      priorityActions.push('Set up DMARC record (Start with p=none for monitoring)');
    } else if (results.dmarc === 'invalid') {
      issues.push('⚠️  DMARC: Invalid configuration');
      recommendations.push(`
⚠️  DMARC Invalid Configuration
   Problem: Your DMARC record exists but has syntax errors or invalid values.

   Current Record: ${results.dmarcRecord || 'Unable to retrieve'}

   Action Required:
   1. Review your DMARC record for syntax errors
   2. Ensure it starts with "v=DMARC1;"
   3. Check that policy (p=) is set to none, quarantine, or reject
   4. Validate email addresses in rua= and ruf= tags

   Troubleshooting: https://dmarc.makr.io/issues`);
      priorityActions.push('Fix DMARC syntax errors');
    } else {
      issues.push('✅ DMARC: Properly configured');
      // Check policy strength
      if (results.dmarcRecord?.includes('p=none')) {
        recommendations.push(`
📊 DMARC in Monitoring Mode
   Status: Your DMARC policy is set to "none" (monitoring only).

   Current Record: ${results.dmarcRecord}

   Recommendation: After reviewing DMARC reports and ensuring legitimate email
   flows are working correctly, consider strengthening your policy:
   - p=quarantine: Suspicious emails go to spam
   - p=reject: Suspicious emails are blocked entirely

   Note: Only increase policy after thoroughly testing with p=none for 2-4 weeks.`);
        priorityActions.push('Review DMARC reports and consider strengthening policy');
      }
    }

    // SPF analysis
    if (results.spf === 'not found') {
      issues.push('❌ SPF: Not configured (High Risk)');
      recommendations.push(`
📧 SPF Not Found - HIGH PRIORITY
   Problem: Your domain has no SPF record, allowing anyone to send email
   claiming to be from your domain.

   Impact: Your legitimate emails may be rejected or marked as spam.
   Attackers can easily spoof your domain.

   Action Required:
   1. Identify all servers/services that send email for your domain
      (e.g., Google Workspace, Microsoft 365, SendGrid, Mailchimp)
   2. Create an SPF record listing authorized senders:
      ${domain}  TXT  "v=spf1 include:_spf.google.com ~all"
   3. Use ~all (soft fail) initially, then upgrade to -all after testing

   Common providers:
   - Google Workspace: include:_spf.google.com
   - Microsoft 365: include:spf.protection.outlook.com
   - SendGrid: include:sendgrid.net

   Learn more: https://dmarc.makr.io/guide`);
      priorityActions.push('Create SPF record with authorized mail servers');
    } else if (results.spf === 'invalid') {
      issues.push('⚠️  SPF: Invalid configuration');
      recommendations.push(`
⚠️  SPF Invalid Configuration
   Problem: Your SPF record has errors that prevent proper validation.

   Current Record: ${results.spfRecord || 'Unable to retrieve'}

   Common Issues:
   - More than 10 DNS lookups (SPF limit)
   - Syntax errors (missing "v=spf1" prefix)
   - Invalid mechanisms or modifiers
   - Multiple SPF records (only one allowed)

   Action Required:
   1. Validate your SPF record syntax
   2. Count DNS lookups (use ip4: instead of include: where possible)
   3. Ensure only one SPF record exists
   4. Test changes before deploying

   Troubleshooting: https://dmarc.makr.io/issues`);
      priorityActions.push('Fix SPF record errors');
    } else {
      issues.push('✅ SPF: Properly configured');
      // Check for best practices
      if (results.spfRecord?.includes('~all')) {
        recommendations.push(`
📊 SPF Uses Soft Fail
   Status: Your SPF record ends with ~all (soft fail).

   Current Record: ${results.spfRecord}

   Recommendation: After confirming all legitimate mail sources are included,
   consider upgrading to -all (hard fail) for maximum protection:
   - ~all: Mark suspicious email as spam
   - -all: Reject suspicious email entirely

   Note: Only use -all after thorough testing to avoid blocking legitimate email.`);
      }
    }

    // DKIM analysis
    const dkimValid = results.dkimResults?.some((d: any) => d.status === 'valid');
    if (!dkimValid && results.dkimResults?.length === 0) {
      issues.push('❌ DKIM: Not configured (Medium Risk)');
      recommendations.push(`
🔐 DKIM Not Found - MEDIUM PRIORITY
   Problem: Your domain has no DKIM signatures, reducing email trustworthiness.

   Impact: Your emails lack cryptographic verification. Some receivers may treat
   your emails with more suspicion, affecting deliverability.

   Action Required:
   1. Check with your email provider for DKIM setup instructions
   2. Generate a DKIM key pair (2048-bit recommended)
   3. Publish the public key in DNS:
      selector._domainkey.${domain}  TXT  "v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY"
   4. Configure your mail server to sign outgoing emails

   Provider-specific guides:
   - Google Workspace: Admin console > Apps > Google Workspace > Gmail > Authenticate email
   - Microsoft 365: Use a third-party signing service or custom setup
   - SendGrid/Mailchimp: Usually auto-configured

   Learn more: https://dmarc.makr.io/guide`);
      priorityActions.push('Set up DKIM signing with your email provider');
    } else if (!dkimValid && results.dkimResults?.length > 0) {
      issues.push('⚠️  DKIM: Configured but failing validation');
      recommendations.push(`
⚠️  DKIM Validation Failing
   Problem: DKIM selectors found but not validating correctly.

   Selectors checked:
${results.dkimResults?.map((d: any) => `   - ${d.selector}: ${d.status}`).join('\n')}

   Common Issues:
   - Public key not published in DNS
   - Key mismatch between DNS and mail server
   - DNS propagation delay (wait 24-48 hours)
   - Incorrect DNS record format

   Action Required:
   1. Verify DKIM public key is published in DNS
   2. Check with email provider that private key matches
   3. Ensure DNS record doesn't have line breaks or extra spaces
   4. Wait for DNS propagation if recently added

   Troubleshooting: https://dmarc.makr.io/issues`);
      priorityActions.push('Verify DKIM keys are properly published in DNS');
    } else {
      issues.push('✅ DKIM: Properly configured');
    }

    // Generate final report
    const report = `
DMARC SECURITY REPORT
${'='.repeat(70)}

Domain: ${domain}
Generated: ${new Date().toLocaleString()}
Security Score: ${score}/100 (${securityLevel})

EXECUTIVE SUMMARY
${'='.repeat(70)}

${issues.join('\n')}

Security Level: ${securityLevel.toUpperCase()}
${score < 30 ? 'CRITICAL: Your domain is highly vulnerable to email spoofing and phishing.' :
  score < 50 ? 'WARNING: Your email security needs immediate attention.' :
  score < 80 ? 'MODERATE: Basic protections in place, but improvements recommended.' :
  'STRONG: Your email authentication is well-configured!'}

DETAILED FINDINGS
${'='.repeat(70)}

DMARC (Domain-based Message Authentication)
Status: ${results.dmarc}
${results.dmarcRecord ? `Record: ${results.dmarcRecord}` : 'No record found'}

SPF (Sender Policy Framework)
Status: ${results.spf}
${results.spfRecord ? `Record: ${results.spfRecord}` : 'No record found'}

DKIM (DomainKeys Identified Mail)
${dkimSummary}

${priorityActions.length > 0 ? `
PRIORITY ACTIONS
${'='.repeat(70)}

${priorityActions.map((action, idx) => `${idx + 1}. ${action}`).join('\n')}
` : ''}

${recommendations.length > 0 ? `
DETAILED RECOMMENDATIONS
${'='.repeat(70)}

${recommendations.join('\n\n')}
` : `
RECOMMENDATIONS
${'='.repeat(70)}

Excellent! Your email authentication is properly configured.

Best practices to maintain security:
- Monitor DMARC reports regularly for suspicious activity
- Review and update SPF record when adding new email services
- Rotate DKIM keys annually for maximum security
- Keep DMARC policy at p=reject for strongest protection
- Document your email authentication setup for your team
`}

NEXT STEPS
${'='.repeat(70)}

1. Address priority actions listed above
2. Review detailed recommendations
3. Test changes in a staging environment if possible
4. Monitor email deliverability after making changes
5. Set up DMARC report monitoring (rua= email address)
6. Re-check your domain after implementing fixes

Need Help?
- Setup Guides: https://dmarc.makr.io/guide
- Troubleshooting: https://dmarc.makr.io/issues
- Compare Protocols: https://dmarc.makr.io/compare/email-authentication

${'='.repeat(70)}
Report generated using DMARC Checker by MAKR.io
Check any domain instantly: https://dmarc.makr.io?domain=${domain}
${'='.repeat(70)}
    `.trim();

    return report;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Determine security level and color
    let securityLevel = 'Critical';
    let securityColor: [number, number, number] = [220, 38, 38]; // red
    if (score >= 80) {
      securityLevel = 'Strong';
      securityColor = [34, 197, 94]; // green
    } else if (score >= 50) {
      securityLevel = 'Moderate';
      securityColor = [245, 158, 11]; // amber
    } else if (score >= 30) {
      securityLevel = 'Weak';
      securityColor = [249, 115, 22]; // orange
    }

    // Header with branding
    doc.setFillColor(251, 191, 36); // amber-400
    doc.rect(0, 0, pageWidth, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('DMARC Security Report', pageWidth / 2, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Powered by MAKR.io', pageWidth / 2, 25, { align: 'center' });

    // Domain and score section
    let yPos = 45;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Domain: ${domain}`, 14, yPos);

    yPos += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPos);

    // Security Score Box
    yPos += 10;
    const scoreBoxHeight = 25;
    doc.setFillColor(...securityColor);
    doc.roundedRect(14, yPos, pageWidth - 28, scoreBoxHeight, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Security Score: ${score}/100`, pageWidth / 2, yPos + 10, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Level: ${securityLevel}`, pageWidth / 2, yPos + 19, { align: 'center' });

    // Results table
    yPos += scoreBoxHeight + 10;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Email Authentication Results', 14, yPos);

    yPos += 5;
    const dkimStatus = results.dkimResults?.some((d: any) => d.status === 'valid') ? 'valid' :
                       results.dkimResults?.length > 0 ? 'invalid' : 'not found';

    const resultsData = [
      ['Protocol', 'Status', 'Record'],
      [
        'DMARC',
        results.dmarc,
        results.dmarcRecord || 'N/A'
      ],
      [
        'SPF',
        results.spf,
        results.spfRecord || 'N/A'
      ],
      [
        'DKIM',
        dkimStatus,
        results.dkimResults?.map((d: any) => `${d.selector}: ${d.status}`).join(', ') || 'N/A'
      ]
    ];

    autoTable(doc, {
      startY: yPos,
      head: [resultsData[0]],
      body: resultsData.slice(1),
      theme: 'striped',
      headStyles: {
        fillColor: [251, 191, 36], // amber-400
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 'auto' }
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {
          const status = data.cell.raw as string;
          if (status === 'valid') {
            data.cell.styles.textColor = [34, 197, 94]; // green
            data.cell.styles.fontStyle = 'bold';
          } else if (status === 'invalid') {
            data.cell.styles.textColor = [239, 68, 68]; // red
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = [249, 115, 22]; // orange
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    // Priority Actions (if any)
    const priorityActions: string[] = [];
    if (results.dmarc === 'not found') {
      priorityActions.push('• Set up DMARC record (Start with p=none for monitoring)');
    } else if (results.dmarc === 'invalid') {
      priorityActions.push('• Fix DMARC syntax errors');
    }
    if (results.spf === 'not found') {
      priorityActions.push('• Create SPF record with authorized mail servers');
    } else if (results.spf === 'invalid') {
      priorityActions.push('• Fix SPF record errors');
    }
    const dkimValid = results.dkimResults?.some((d: any) => d.status === 'valid');
    if (!dkimValid && results.dkimResults?.length === 0) {
      priorityActions.push('• Set up DKIM signing with your email provider');
    } else if (!dkimValid && results.dkimResults?.length > 0) {
      priorityActions.push('• Verify DKIM keys are properly published in DNS');
    }

    // @ts-ignore - autoTable adds finalY to doc
    yPos = doc.lastAutoTable.finalY + 10;

    if (priorityActions.length > 0 && yPos < pageHeight - 80) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Priority Actions', 14, yPos);

      yPos += 7;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      priorityActions.forEach((action) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = 20;
        }
        const splitAction = doc.splitTextToSize(action, pageWidth - 28);
        doc.text(splitAction, 14, yPos);
        yPos += splitAction.length * 5 + 3;
      });
    }

    // Recommendations section
    if (yPos < pageHeight - 60) {
      yPos += 5;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Key Recommendations', 14, yPos);

      yPos += 7;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      const recommendations = [];
      if (score < 80) {
        if (results.dmarc === 'not found') {
          recommendations.push('Deploy DMARC with p=none to start monitoring email authentication');
        }
        if (results.spf === 'not found') {
          recommendations.push('Create SPF record listing all authorized email servers');
        }
        if (!dkimValid) {
          recommendations.push('Enable DKIM signing through your email service provider');
        }
      } else {
        recommendations.push('Excellent! Your email authentication is properly configured.');
        recommendations.push('Continue monitoring DMARC reports for suspicious activity.');
      }

      recommendations.forEach((rec) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = 20;
        }
        const splitRec = doc.splitTextToSize(`• ${rec}`, pageWidth - 28);
        doc.text(splitRec, 14, yPos);
        yPos += splitRec.length * 4 + 2;
      });
    }

    // Next Steps section
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos += 10;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Next Steps', 14, yPos);

    yPos += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const nextSteps = [
      '1. Address priority actions listed above',
      '2. Review detailed recommendations on our website',
      '3. Test changes in a staging environment if possible',
      '4. Monitor email deliverability after making changes',
      '5. Re-check your domain after implementing fixes'
    ];

    nextSteps.forEach((step) => {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(step, 14, yPos);
      yPos += 5;
    });

    // Resources section
    yPos += 5;
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Need Help?', 14, yPos);

    yPos += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(59, 130, 246); // blue
    doc.text('• Setup Guides: https://dmarc.makr.io/guide', 14, yPos);
    yPos += 5;
    doc.text('• Troubleshooting: https://dmarc.makr.io/issues', 14, yPos);
    yPos += 5;
    doc.text('• Compare Protocols: https://dmarc.makr.io/compare/email-authentication', 14, yPos);

    // Footer
    doc.setTextColor(156, 163, 175); // gray-400
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    const footerText = 'Report generated using DMARC Checker by MAKR.io - https://dmarc.makr.io';
    doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Save PDF
    doc.save(`dmarc-report-${domain}-${Date.now()}.pdf`);
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
    const dkimStatus = results.dkimResults?.some((d: any) => d.status === 'valid') ? 'valid' :
                       results.dkimResults?.length > 0 ? 'invalid' : 'not found';

    let securityLevel = 'Critical';
    if (score >= 80) securityLevel = 'Strong';
    else if (score >= 50) securityLevel = 'Moderate';
    else if (score >= 30) securityLevel = 'Weak';

    const shareData = {
      title: `DMARC Security Report for ${domain}`,
      text: `${domain} Email Security Report

Security Score: ${score}/100 (${securityLevel})

Results:
• DMARC: ${results.dmarc}
• SPF: ${results.spf}
• DKIM: ${dkimStatus}

${score < 80 ? 'Action needed to improve email security.' : 'Email authentication is well-configured!'}

Check your domain at:`,
      url: `https://dmarc.makr.io?domain=${domain}`
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
        className="flex-1 min-w-[140px] bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Download className="w-4 h-4" />
        Download TXT
      </button>
      <button
        onClick={downloadPDF}
        className="flex-1 min-w-[140px] bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <FileText className="w-4 h-4" />
        Download PDF
      </button>
    </div>
  );
}
