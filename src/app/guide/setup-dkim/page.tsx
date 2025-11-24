import Link from 'next/link';
import { AlertCircle, CheckCircle, Key } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Complete DKIM Setup Guide - Step-by-Step Tutorial | DMARC Checker',
  description: 'Learn how to set up DKIM (DomainKeys Identified Mail) records for your domain. Includes key generation, DNS setup, selector configuration, and troubleshooting.',
};

export default function SetupDkimGuide() {
  return (
    <>
      <PageHeader
        title="Complete DKIM Setup Guide"
        description="Step-by-step instructions for implementing DKIM to digitally sign your emails and prevent tampering."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'DKIM Setup' }
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
              15 min read
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
              <li>• What DKIM is and how digital signatures protect your emails</li>
              <li>• How to generate DKIM public/private key pairs</li>
              <li>• Understanding DKIM selectors and rotation</li>
              <li>• Step-by-step DNS configuration for DKIM</li>
              <li>• How to verify DKIM is working correctly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">What is DKIM?</h2>
      <p className="text-gray-700 mb-4">
        DKIM (DomainKeys Identified Mail) is an email authentication method that uses cryptographic signatures to verify that an email hasn't been altered in transit and was actually sent from your domain.
      </p>
      <p className="text-gray-700 mb-6">
        When you send an email, your mail server adds a digital signature to the email header using a private key. Receiving servers verify this signature using your public key published in DNS. If the signature is valid and the content hasn't changed, the email passes DKIM authentication.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">How DKIM Works</h2>
      <div className="not-prose my-8">
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-gray-900">Email is sent from your server</h3>
            </div>
            <p className="text-gray-600">Your mail server signs the email using your private DKIM key</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-gray-900">Signature is added to email header</h3>
            </div>
            <p className="text-gray-600">A DKIM-Signature header is added containing the encrypted hash</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-gray-900">Receiving server retrieves public key</h3>
            </div>
            <p className="text-gray-600">The receiving server looks up your DKIM public key from DNS</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h3 className="font-semibold text-gray-900">Signature is verified</h3>
            </div>
            <p className="text-gray-600">If the signature matches and content is unchanged, DKIM passes</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Understanding DKIM Selectors</h2>
      <p className="text-gray-700 mb-4">
        A DKIM selector is a unique identifier for your DKIM key pair. It allows you to have multiple DKIM keys for different purposes or to rotate keys without disrupting email flow.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm text-gray-900 mb-2">Example DKIM DNS record format:</p>
        <code className="text-sm">[selector]._domainkey.yourdomain.com</code>
        <p className="text-sm text-gray-600 mt-3">Common selectors:</p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2">
          <li>• <code>default._domainkey.yourdomain.com</code></li>
          <li>• <code>google._domainkey.yourdomain.com</code> (Google Workspace)</li>
          <li>• <code>s1._domainkey.yourdomain.com</code> (SendGrid)</li>
          <li>• <code>k1._domainkey.yourdomain.com</code> (Mailgun)</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 1: Generate DKIM Keys</h2>
      <p className="text-gray-700 mb-4">
        The method for generating DKIM keys depends on your email provider or mail server:
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Google Workspace</h3>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>Sign in to Google Admin console</li>
        <li>Go to Apps → Google Workspace → Gmail → Authenticate email</li>
        <li>Click "Generate new record" under DKIM authentication</li>
        <li>Choose prefix length (2048-bit recommended)</li>
        <li>Copy the DNS TXT record values provided</li>
      </ol>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Microsoft 365</h3>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>Sign in to Microsoft 365 Defender portal</li>
        <li>Go to Email & collaboration → Policies & rules → Threat policies</li>
        <li>Click on DKIM</li>
        <li>Select your domain and click "Create DKIM keys"</li>
        <li>Copy the two CNAME records provided (selector1 and selector2)</li>
      </ol>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Using OpenSSL (Self-Hosted)</h3>
      <p className="text-gray-700 mb-4">
        For self-hosted mail servers, generate keys using OpenSSL:
      </p>

      <div className="not-prose bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
        <code className="text-sm">
          # Generate private key<br/>
          openssl genrsa -out dkim_private.pem 2048<br/><br/>
          # Generate public key<br/>
          openssl rsa -in dkim_private.pem -pubout -out dkim_public.pem<br/><br/>
          # Format public key for DNS (remove headers and newlines)<br/>
          tr -d '\n' &lt; dkim_public.pem | sed 's/-----BEGIN PUBLIC KEY-----//' | sed 's/-----END PUBLIC KEY-----//'
        </code>
      </div>

      <div className="not-prose bg-red-50 border border-red-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 mb-2">Security Warning</h3>
            <p className="text-sm text-red-800">
              <strong>NEVER share your private key.</strong> The private key should only be stored on your mail server with restricted file permissions (chmod 600). Only the public key is published in DNS.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 2: Add DKIM Record to DNS</h2>
      <p className="text-gray-700 mb-4">
        The format of your DKIM DNS record varies by provider:
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">TXT Record Format</h3>
      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm font-semibold text-gray-900 mb-2">Hostname:</p>
        <code className="text-sm">default._domainkey.yourdomain.com</code>
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">Record Type:</p>
        <code className="text-sm">TXT</code>
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">Value:</p>
        <code className="text-sm break-all">v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...</code>
        <p className="text-sm text-gray-600 mt-3">
          <strong>Breaking it down:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2">
          <li>• <code>v=DKIM1</code> - DKIM version (required)</li>
          <li>• <code>k=rsa</code> - Key type (RSA)</li>
          <li>• <code>p=...</code> - Your public key (base64 encoded)</li>
        </ul>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Common Provider-Specific Examples</h3>

      <div className="not-prose space-y-6 my-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            Google Workspace
          </h4>
          <p className="text-xs text-gray-600 mb-2">Hostname:</p>
          <code className="text-sm bg-gray-50 p-2 rounded block mb-2">google._domainkey.yourdomain.com</code>
          <p className="text-xs text-gray-600 mb-2">Value:</p>
          <code className="text-xs bg-gray-50 p-2 rounded block break-all">v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...</code>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            Microsoft 365
          </h4>
          <p className="text-xs text-gray-600 mb-2">Two CNAME records required:</p>
          <div className="space-y-2">
            <div>
              <code className="text-xs bg-gray-50 p-2 rounded block">selector1._domainkey.yourdomain.com</code>
              <p className="text-xs text-gray-600 mt-1">→ CNAME to selector1-yourdomain-com._domainkey.yourdomain.onmicrosoft.com</p>
            </div>
            <div>
              <code className="text-xs bg-gray-50 p-2 rounded block">selector2._domainkey.yourdomain.com</code>
              <p className="text-xs text-gray-600 mt-1">→ CNAME to selector2-yourdomain-com._domainkey.yourdomain.onmicrosoft.com</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            SendGrid
          </h4>
          <p className="text-xs text-gray-600 mb-2">Three CNAME records:</p>
          <div className="space-y-1">
            <code className="text-xs bg-gray-50 p-2 rounded block">s1._domainkey.yourdomain.com</code>
            <code className="text-xs bg-gray-50 p-2 rounded block">s2._domainkey.yourdomain.com</code>
            <code className="text-xs bg-gray-50 p-2 rounded block">em[number].yourdomain.com</code>
          </div>
        </div>
      </div>

      <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">DNS Propagation</h3>
            <p className="text-sm text-yellow-800">
              DKIM DNS changes can take up to 48 hours to propagate globally, though most providers update within 15-30 minutes. You can verify propagation using DNS lookup tools.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 3: Configure Your Mail Server</h2>
      <p className="text-gray-700 mb-4">
        After publishing your DKIM public key in DNS, configure your mail server to sign outgoing emails:
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Google Workspace</h3>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>After adding DNS records, return to Google Admin console</li>
        <li>Click "Start authentication" button</li>
        <li>Google will verify your DNS records automatically</li>
        <li>DKIM signing will begin within 24-48 hours</li>
      </ol>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Microsoft 365</h3>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>After adding CNAME records, return to DKIM settings</li>
        <li>Toggle "Sign messages for this domain with DKIM signatures" to On</li>
        <li>Microsoft will verify DNS records automatically</li>
        <li>DKIM signing will start immediately after verification</li>
      </ol>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Postfix (Self-Hosted)</h3>
      <p className="text-gray-700 mb-4">
        Install and configure OpenDKIM:
      </p>

      <div className="not-prose bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto">
        <code className="text-sm">
          # Install OpenDKIM<br/>
          apt-get install opendkim opendkim-tools<br/><br/>
          # Configure in /etc/opendkim.conf<br/>
          Domain yourdomain.com<br/>
          KeyFile /etc/opendkim/keys/dkim_private.pem<br/>
          Selector default<br/>
          Socket inet:8891@localhost
        </code>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 4: Verify DKIM is Working</h2>
      <p className="text-gray-700 mb-4">
        After configuration, verify that DKIM is properly signing your emails:
      </p>

      <div className="not-prose my-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          Check Your DKIM Record Now
        </Link>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Send a Test Email</h3>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>Send a test email to yourself or check-auth@verifier.port25.com</li>
        <li>View the email's raw source/headers</li>
        <li>Look for a <code>DKIM-Signature</code> header</li>
        <li>Verify the signature shows <code>d=yourdomain.com</code></li>
      </ol>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">1. Use 2048-bit Keys</h3>
      <p className="text-gray-700 mb-4">
        While 1024-bit keys are still supported, 2048-bit keys provide better security and are recommended by most email providers.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">2. Rotate DKIM Keys Regularly</h3>
      <p className="text-gray-700 mb-4">
        Rotate your DKIM keys every 6-12 months. Use multiple selectors to enable smooth key rotation without disrupting email flow.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">3. Sign All Outgoing Email</h3>
      <p className="text-gray-700 mb-4">
        Configure your mail server to sign all outgoing email, not just marketing or transactional emails. This provides maximum protection.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">4. Monitor DKIM Failures</h3>
      <p className="text-gray-700 mb-4">
        Enable DMARC reporting to monitor DKIM authentication failures and identify configuration issues or unauthorized sending sources.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">DKIM Record Not Found</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Verify the selector name matches your mail server configuration</li>
        <li>Check that the hostname includes <code>._domainkey.</code></li>
        <li>Wait 15-30 minutes for DNS propagation</li>
        <li>Use <code>dig TXT selector._domainkey.yourdomain.com</code> to verify</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">DKIM Signature Verification Failed</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Ensure your public key in DNS matches the private key on your server</li>
        <li>Check that the key is properly formatted (no line breaks or extra spaces)</li>
        <li>Verify the selector in your mail server config matches DNS</li>
        <li>Confirm your mail server's DKIM signing service is running</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">DNS Record Too Long</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Some DNS providers don't support long TXT records</li>
        <li>Split the public key into multiple strings in the TXT record</li>
        <li>Format: <code>v=DKIM1; k=rsa; p=&quot;string1&quot; &quot;string2&quot;</code></li>
        <li>Alternatively, use a 1024-bit key (less secure but shorter)</li>
      </ul>

      <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Next Steps</h3>
            <p className="text-sm text-green-800 mb-3">
              Once DKIM is configured, complete your email authentication by setting up SPF (if not done) and DMARC to tie everything together.
            </p>
            <div className="flex gap-2">
              <Link
                href="/guide/setup-spf"
                className="text-sm font-medium text-green-800 hover:text-green-900 underline"
              >
                Setup SPF →
              </Link>
              <span className="text-green-600">•</span>
              <Link
                href="/guide/setup-dmarc"
                className="text-sm font-medium text-green-800 hover:text-green-900 underline"
              >
                Setup DMARC →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <div className="not-prose mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/guide/setup-spf"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">SPF Setup Guide</h4>
            <p className="text-sm text-gray-600">Set up SPF to authorize sending servers</p>
          </Link>
          <Link
            href="/compare/email-authentication"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">DMARC vs SPF vs DKIM</h4>
            <p className="text-sm text-gray-600">Understand how these protocols work together</p>
          </Link>
          <Link
            href="/guide/setup-dmarc"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">DMARC Setup Guide</h4>
            <p className="text-sm text-gray-600">Final step: Set up DMARC policy</p>
          </Link>
          <Link
            href="/issues"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">Common Issues</h4>
            <p className="text-sm text-gray-600">Troubleshoot DKIM problems</p>
          </Link>
          </div>
        </div>
          </article>
        </div>
      </div>
    </>
  );
}
