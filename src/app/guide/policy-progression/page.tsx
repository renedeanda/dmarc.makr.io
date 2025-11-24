import Link from 'next/link';
import { AlertCircle, CheckCircle, TrendingUp, Shield } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'DMARC Policy Progression Guide - From p=none to p=reject | DMARC Checker',
  description: 'Learn how to safely progress your DMARC policy from monitoring (p=none) to enforcement (p=reject). Includes timeline, best practices, and rollback strategies.',
};

export default function PolicyProgressionGuide() {
  return (
    <>
      <PageHeader
        title="DMARC Policy Progression Guide"
        description="Step-by-step guide for safely moving from p=none to p=reject for maximum email security."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'Policy Progression' }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-8 pt-6">
          <article className="prose prose-lg max-w-none">
          {/* Meta info */}
          <div className="not-prose flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              18 min read
            </span>
            <span>•</span>
            <span>Last updated: November 2025</span>
            <span>•</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
              Intermediate
            </span>
          </div>

      {/* Introduction */}
      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">What you'll learn</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• The three DMARC policy levels and what they mean</li>
              <li>• How to safely progress from p=none to p=reject</li>
              <li>• Timeline and milestones for each phase</li>
              <li>• How to analyze DMARC reports during progression</li>
              <li>• Rollback strategies if issues arise</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Why Policy Progression Matters</h2>
      <p className="text-gray-700 mb-4">
        Jumping straight to <code>p=reject</code> without proper monitoring can result in legitimate emails being rejected, potentially disrupting your business communications. A gradual progression allows you to:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Identify all legitimate email sources before enforcement</li>
        <li>Fix authentication issues without impacting deliverability</li>
        <li>Build confidence in your DMARC configuration</li>
        <li>Minimize risk of blocking important emails</li>
        <li>Document your email infrastructure thoroughly</li>
      </ul>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Understanding DMARC Policy Levels</h2>

      <div className="not-prose my-8">
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">p=none (Monitor)</h3>
                <p className="text-sm text-gray-600">Monitoring only - No action taken</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Emails that fail DMARC are delivered normally. You receive aggregate reports showing which emails passed or failed authentication. Perfect for initial setup and discovery.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">p=quarantine (Soft Enforcement)</h3>
                <p className="text-sm text-gray-600">Failed emails go to spam</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Emails that fail DMARC are marked as spam/junk but still deliverable. Recipients can find them in spam folders. Good intermediate step before full enforcement.
            </p>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 text-red-800 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">p=reject (Full Enforcement)</h3>
                <p className="text-sm text-gray-600">Failed emails are blocked</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Emails that fail DMARC are completely rejected and never reach the recipient. Maximum protection against email spoofing and phishing. Your end goal.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">The Recommended Progression Timeline</h2>

      <div className="not-prose my-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          <div className="space-y-8">
            {/* Phase 1 */}
            <div className="relative pl-20">
              <div className="absolute left-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Phase 1: p=none</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Week 1-4
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Goal:</strong> Discover all email sources and establish baseline
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">DMARC Record:</p>
                  <code className="block bg-gray-50 p-3 rounded text-xs">
                    v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100; adkim=r; aspf=r
                  </code>
                  <p className="font-semibold text-gray-900 mt-4">Key Activities:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Set up DMARC record with p=none</li>
                    <li>Configure email to receive aggregate reports (RUA)</li>
                    <li>Collect data for 2-4 weeks</li>
                    <li>Identify all legitimate sending sources</li>
                    <li>Fix SPF and DKIM for failing sources</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative pl-20">
              <div className="absolute left-0 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Phase 2: p=quarantine</h3>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Week 5-8
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Goal:</strong> Test enforcement with recoverable failures
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">DMARC Record:</p>
                  <code className="block bg-gray-50 p-3 rounded text-xs">
                    v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=25; adkim=r; aspf=r
                  </code>
                  <p className="font-semibold text-gray-900 mt-4">Key Activities:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Start with pct=25 (25% of emails)</li>
                    <li>Monitor reports for any legitimate failures</li>
                    <li>Gradually increase pct to 50, 75, then 100</li>
                    <li>Watch for complaints about missing emails</li>
                    <li>Tighten alignment (adkim=s, aspf=s) if ready</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative pl-20">
              <div className="absolute left-0 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">Phase 3: p=reject</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Week 9+
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Goal:</strong> Full protection against email spoofing
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">DMARC Record:</p>
                  <code className="block bg-gray-50 p-3 rounded text-xs">
                    v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=25; adkim=s; aspf=s
                  </code>
                  <p className="font-semibold text-gray-900 mt-4">Key Activities:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Start with pct=25 for initial testing</li>
                    <li>Monitor closely for any delivery issues</li>
                    <li>Gradually increase pct to 100 over 2-3 weeks</li>
                    <li>Use strict alignment (adkim=s, aspf=s)</li>
                    <li>Continue monitoring reports indefinitely</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Using the pct Tag for Gradual Rollout</h2>
      <p className="text-gray-700 mb-4">
        The <code>pct</code> tag allows you to apply your DMARC policy to only a percentage of failing emails, providing an additional safety net during transitions:
      </p>

      <table className="not-prose w-full border-collapse border border-gray-200 my-8">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-3 text-left font-semibold">pct Value</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Percentage</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Recommended Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-3"><code>pct=25</code></td>
            <td className="border border-gray-200 p-3">25% of failing emails</td>
            <td className="border border-gray-200 p-3">1 week</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>pct=50</code></td>
            <td className="border border-gray-200 p-3">50% of failing emails</td>
            <td className="border border-gray-200 p-3">1 week</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>pct=75</code></td>
            <td className="border border-gray-200 p-3">75% of failing emails</td>
            <td className="border border-gray-200 p-3">1 week</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>pct=100</code></td>
            <td className="border border-gray-200 p-3">100% of failing emails (default)</td>
            <td className="border border-gray-200 p-3">Permanent</td>
          </tr>
        </tbody>
      </table>

      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Pro Tip: Double Rollout</h3>
            <p className="text-sm text-blue-800">
              Use <code>pct</code> when changing policies (p=none → p=quarantine → p=reject). For example: change to <code>p=quarantine; pct=25</code>, gradually increase pct to 100, then change to <code>p=reject; pct=25</code> and repeat. This provides two layers of gradual rollout for maximum safety.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Analyzing DMARC Reports</h2>
      <p className="text-gray-700 mb-4">
        During each phase, carefully analyze your DMARC aggregate reports (RUA) to identify issues:
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">What to Look For</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li><strong>Volume of failures</strong> - High failure rates indicate configuration issues</li>
        <li><strong>Failing sources</strong> - Identify which IPs/domains are failing authentication</li>
        <li><strong>SPF vs DKIM failures</strong> - Determine which protocol needs fixing</li>
        <li><strong>Alignment issues</strong> - Check if From domain matches SPF/DKIM domains</li>
        <li><strong>Unknown sources</strong> - Investigate unfamiliar IPs sending from your domain</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Common Failing Sources to Fix</h3>
      <div className="not-prose space-y-3 my-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Marketing Platforms</h4>
          <p className="text-sm text-gray-600">Mailchimp, SendGrid, Constant Contact - Add their SPF includes and DKIM records</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">CRM Systems</h4>
          <p className="text-sm text-gray-600">Salesforce, HubSpot, Zoho - Configure DKIM and update SPF</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Help Desk Software</h4>
          <p className="text-sm text-gray-600">Zendesk, Freshdesk, Intercom - Set up proper authentication</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Forwarding Services</h4>
          <p className="text-sm text-gray-600">Email forwarding breaks SPF - Consider using SRS or exempting with pct</p>
        </div>
      </div>

      <div className="not-prose my-8">
        <Link
          href="/guide/dmarc-reports"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Learn How to Read DMARC Reports →
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Decision Points: When to Progress</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">✅ Ready to Move from p=none to p=quarantine</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>100% of legitimate email passes DMARC (or close to it)</li>
        <li>You've identified and fixed all authentication issues</li>
        <li>All known sending services have SPF/DKIM configured</li>
        <li>You've been monitoring for at least 2-4 weeks</li>
        <li>DMARC reports show consistent passing rates</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">✅ Ready to Move from p=quarantine to p=reject</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>No complaints about legitimate emails in spam</li>
        <li>DMARC pass rates remain consistently high (95%+)</li>
        <li>You've tested at pct=100 for at least 2 weeks</li>
        <li>All stakeholders are informed about the change</li>
        <li>You have a rollback plan ready</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">🚫 Not Ready to Progress If...</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>More than 5% of legitimate email is failing</li>
        <li>You're still discovering new sending sources</li>
        <li>Recent reports show authentication failures</li>
        <li>Critical business emails are failing DMARC</li>
        <li>You haven't documented your email infrastructure</li>
      </ul>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Rollback Strategy</h2>
      <p className="text-gray-700 mb-4">
        If you encounter issues after progressing your policy, you can safely roll back:
      </p>

      <div className="not-prose my-8">
        <div className="space-y-4">
          <div className="border border-red-200 bg-red-50 rounded-lg p-6">
            <h4 className="font-semibold text-red-900 mb-3">Emergency Rollback (Immediate)</h4>
            <p className="text-sm text-red-800 mb-3">If legitimate emails are being blocked:</p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-red-800">
              <li>Change DMARC record to <code>p=none</code></li>
              <li>Wait 5-10 minutes for DNS propagation</li>
              <li>Verify change with DNS lookup</li>
              <li>Investigate and fix the root cause</li>
              <li>Resume progression when ready</li>
            </ol>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 mb-3">Gradual Rollback (Preferred)</h4>
            <p className="text-sm text-yellow-800 mb-3">If you notice issues but they're not urgent:</p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-yellow-800">
              <li>Reduce <code>pct</code> value (100 → 75 → 50 → 25)</li>
              <li>If issues persist, downgrade policy (reject → quarantine or quarantine → none)</li>
              <li>Keep <code>pct</code> at a safe level while investigating</li>
              <li>Fix authentication issues for failing sources</li>
              <li>Resume progression cautiously</li>
            </ol>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Advanced: Subdomain Policies</h2>
      <p className="text-gray-700 mb-4">
        Use the <code>sp</code> tag to set different policies for subdomains:
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <code className="text-sm">v=DMARC1; p=reject; sp=quarantine; rua=mailto:dmarc@example.com</code>
        <p className="text-sm text-gray-600 mt-3">
          This configuration applies <code>p=reject</code> to the main domain but <code>sp=quarantine</code> to all subdomains, allowing you to enforce stricter policies on your primary domain while being more lenient with subdomains.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">1. Never Skip p=none</h3>
      <p className="text-gray-700 mb-4">
        Always start with <code>p=none</code> to discover your email ecosystem. Skipping this phase significantly increases the risk of blocking legitimate email.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">2. Take Your Time</h3>
      <p className="text-gray-700 mb-4">
        There's no rush to reach <code>p=reject</code>. It's better to spend extra time monitoring than to block important emails. Some organizations take 3-6 months to reach full enforcement.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">3. Communicate Changes</h3>
      <p className="text-gray-700 mb-4">
        Inform your IT team, marketing, sales, and other stakeholders before changing policies. Have them watch for delivery issues and report them immediately.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">4. Document Everything</h3>
      <p className="text-gray-700 mb-4">
        Maintain a list of all services sending email on your behalf, their SPF/DKIM configuration, and when they were added. This makes troubleshooting much easier.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">5. Continue Monitoring After p=reject</h3>
      <p className="text-gray-700 mb-4">
        Don't stop reviewing DMARC reports after reaching <code>p=reject</code>. New email services may be added over time, and you need to ensure they're properly configured.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting Common Issues</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Legitimate Email Going to Spam (p=quarantine)</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Check DMARC reports to identify which source is failing</li>
        <li>Verify SPF includes and DKIM records for that source</li>
        <li>Temporarily reduce <code>pct</code> to minimize impact</li>
        <li>Fix authentication and test before increasing pct again</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Legitimate Email Being Blocked (p=reject)</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Immediately roll back to <code>p=quarantine</code> or reduce pct</li>
        <li>Identify the failing source from DMARC reports</li>
        <li>Set up proper SPF and DKIM for that source</li>
        <li>Test thoroughly before progressing to p=reject again</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Forwarded Email Failing</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Email forwarding inherently breaks SPF alignment</li>
        <li>Consider using SRS (Sender Rewriting Scheme) on forwarding servers</li>
        <li>Rely on DKIM for forwarded email (DKIM survives forwarding)</li>
        <li>Use <code>aspf=r</code> (relaxed SPF) instead of <code>aspf=s</code></li>
      </ul>

      <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">You're Ready!</h3>
            <p className="text-sm text-green-800 mb-3">
              Follow this guide carefully, and you'll reach <code>p=reject</code> safely. Remember: slow and steady wins the race. Email deliverability is too important to rush.
            </p>
            <Link
              href="/tools/analyzer"
              className="text-sm font-medium text-green-800 hover:text-green-900 underline"
            >
              Analyze your current DMARC policy →
            </Link>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <div className="not-prose mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/guide/setup-dmarc"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">DMARC Setup Guide</h4>
            <p className="text-sm text-gray-600">Start here if you haven't set up DMARC yet</p>
          </Link>
          <Link
            href="/guide/dmarc-reports"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">Understanding DMARC Reports</h4>
            <p className="text-sm text-gray-600">Learn how to read and analyze your reports</p>
          </Link>
          <Link
            href="/tools/analyzer"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">DMARC Policy Analyzer</h4>
            <p className="text-sm text-gray-600">Analyze your current DMARC configuration</p>
          </Link>
          <Link
            href="/issues"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">Common Issues</h4>
            <p className="text-sm text-gray-600">Troubleshoot DMARC problems</p>
          </Link>
          </div>
        </div>
          </article>
        </div>
      </div>
    </>
  );
}
