import React from 'react';
import { ShieldCheck, Eye, Lock, Database, Users, Globe } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-6">
              At Devmint Technologies ("we," "our," or "us"), we are committed to protecting your privacy and personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
              our API services and website. This policy also describes your rights regarding your personal data and 
              how you can contact us about privacy matters.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                Data Processing Partnership with Paddle.com
              </h3>
              <p className="text-gray-700">
                Payment processing is handled by Paddle.com Market Limited. When you make a purchase, Paddle 
                acts as the Merchant of Record and processes your payment information according to their privacy 
                policy. We receive limited transaction data necessary for service delivery.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide Directly</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, password, company name</li>
              <li><strong>Profile Information:</strong> Profile picture, job title, industry, company size</li>
              <li><strong>Communication Data:</strong> Support tickets, emails, chat messages</li>
              <li><strong>Billing Information:</strong> Processed by Paddle.com (we receive transaction confirmations only)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Information We Collect Automatically</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Usage Data:</strong> API calls, feature usage, service interactions</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
              <li><strong>Performance Data:</strong> Response times, error rates, system performance metrics</li>
              <li><strong>Log Data:</strong> Access logs, security logs, system events</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Data You Process Through Our APIs</h3>
            <p className="text-gray-700 mb-6">
              When you use our APIs, you may send us data to process (such as invoice information, customer data, etc.). 
              We process this data solely to provide our services and do not use it for any other purpose. You remain 
              the data controller for this information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Service Provision
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Provide and maintain our services</li>
                  <li>• Process API requests</li>
                  <li>• Generate invoices and reports</li>
                  <li>• Manage your account</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Communication
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Send service notifications</li>
                  <li>• Provide customer support</li>
                  <li>• Send security alerts</li>
                  <li>• Share product updates</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information. We may share your information only in these circumstances:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">Service Providers</h4>
                <p className="text-gray-700 text-sm">
                  With trusted third-party service providers (like Paddle.com for payments) who help us operate our service.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">Legal Requirements</h4>
                <p className="text-gray-700 text-sm">
                  When required by law, court order, or government request.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-900">Business Transfers</h4>
                <p className="text-gray-700 text-sm">
                  In connection with a merger, acquisition, or sale of assets (with advance notice).
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-green-600" />
                Our Security Measures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <ul className="space-y-2">
                  <li>• AES-256 encryption for data at rest</li>
                  <li>• TLS 1.3 for data in transit</li>
                  <li>• SOC 2 Type II compliance</li>
                  <li>• Regular security audits</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Multi-factor authentication</li>
                  <li>• Role-based access controls</li>
                  <li>• 24/7 security monitoring</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your information for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Account Data:</strong> Retained while your account is active and for 90 days after deletion</li>
              <li><strong>Usage Data:</strong> Retained for 2 years for analytics and service improvement</li>
              <li><strong>Communication Records:</strong> Retained for 7 years for legal compliance</li>
              <li><strong>Financial Records:</strong> Retained for 7 years as required by law</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Under GDPR and Similar Laws, You Have the Right To:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access & Portability</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Request a copy of your data</li>
                    <li>• Export your data in portable format</li>
                    <li>• Receive data processing details</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Control & Correction</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Correct inaccurate information</li>
                    <li>• Delete your personal data</li>
                    <li>• Restrict processing activities</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              Our services are provided from the United States. If you are located outside the US, your information 
              will be transferred to and processed in the US. We ensure appropriate safeguards are in place for 
              international transfers, including Standard Contractual Clauses approved by the European Commission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If we become aware that we have collected personal information from 
              a child under 13, we will take steps to delete such information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for service functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand service usage (can be disabled)</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Updates to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy periodically. We will notify you of significant changes via email 
              or through our service. The "Last updated" date at the top indicates when the policy was last revised.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p><strong>Privacy Officer:</strong></p>
                  <p>Email: support@devmint.site</p>
                  <p>Phone: +1(740)738-2589</p>
                </div>
                <div>
                  <p><strong>Mailing Address:</strong></p>
                  <p>Devmint Technologies</p>
                  <p>1342 Lucile Avenue</p>
                  <p>Los Angeles, CA 90026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Regional Compliance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900">GDPR (EU)</strong>
              <p>Full compliance with European data protection requirements</p>
            </div>
            <div>
              <strong className="text-gray-900">CCPA (California)</strong>
              <p>California Consumer Privacy Act compliance</p>
            </div>
            <div>
              <strong className="text-gray-900">PIPEDA (Canada)</strong>
              <p>Personal Information Protection and Electronic Documents Act</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;