import React from 'react';
import { Shield, FileText, Clock, AlertCircle } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl mb-8">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-sm text-blue-800">
              <strong>Important Notice:</strong> These terms incorporate Paddle.com's payment processing terms. 
              By using our services, you also agree to Paddle's Terms of Service and Privacy Policy.
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing or using Devmint services ("Service"), you agree to be bound by these Terms of Service ("Terms").
              If you disagree with any part of these terms, you may not access the Service. These Terms apply to all visitors, 
              users, and others who access or use the Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Devmint provides API services including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Invoice generation and management APIs</li>
              <li>PDF document creation and customization</li>
              <li>Subscription management services</li>
              <li>Payment processing integration</li>
              <li>Business automation tools</li>
              <li>Analytics and reporting services</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            <p className="text-gray-700 mb-4">
              To access certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription Plans and Billing</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Processing by Paddle.com</h3>
              <p className="text-gray-700 mb-3">
                All payments are processed by Paddle.com Market Limited ("Paddle"), our authorized payment processor. 
                Paddle acts as the Merchant of Record for all transactions.
              </p>
              <p className="text-gray-700">
                By subscribing to our services, you also agree to Paddle's Terms of Service available at 
                <a href="https://paddle.com/legal/terms" className="text-blue-600 hover:underline ml-1">
                  https://paddle.com/legal/terms
                </a>
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Subscription Terms</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Subscriptions automatically renew at the end of each billing period</li>
              <li>You may cancel your subscription at any time through your account dashboard</li>
              <li>Cancellations take effect at the end of the current billing period</li>
              <li>No refunds are provided for partial months or years of service</li>
              <li>We reserve the right to change pricing with 30 days' notice</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Free Trial</h3>
            <p className="text-gray-700 mb-6">
              We may offer free trials of our Service. Free trials are limited to one per customer and may require 
              payment information. If you don't cancel before the trial ends, you will be charged for the subscription.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. API Usage and Rate Limits</h2>
            <p className="text-gray-700 mb-4">
              Your use of our APIs is subject to the following terms:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>API usage is limited based on your subscription plan</li>
              <li>Rate limits are enforced to ensure service availability for all users</li>
              <li>Excessive usage may result in temporary service suspension</li>
              <li>API keys are confidential and must not be shared publicly</li>
              <li>You are responsible for securing your API credentials</li>
              <li>API keys must be stored securely and rotated regularly</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Privacy and Security</h2>
            <p className="text-gray-700 mb-4">
              We take data privacy seriously and are committed to protecting your information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>We comply with GDPR, CCPA, and other applicable privacy laws</li>
              <li>Your data is encrypted in transit and at rest using industry-standard encryption</li>
              <li>We maintain SOC 2 Type II compliance</li>
              <li>Data processing is detailed in our Privacy Policy</li>
              <li>You retain ownership of your data</li>
              <li>We do not sell or share your personal data with third parties</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Acceptable Use Policy</h2>
            <p className="text-gray-700 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service for illegal or fraudulent activities</li>
              <li>Resell or redistribute our services without written permission</li>
              <li>Generate spam or unsolicited communications</li>
              <li>Overload our systems with excessive requests</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability</h2>
            <p className="text-gray-700 mb-6">
              We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may perform 
              scheduled maintenance that temporarily affects service availability. We will provide advance notice of 
              scheduled maintenance when possible through our status page and email notifications.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              The Service and its original content, features, and functionality are owned by Devmint Technologies and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property laws. You may not copy, modify, distribute, or reverse engineer any part of our Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              To the maximum extent permitted by law, Devmint shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including without limitation, loss of profits, data, 
              use, goodwill, or other intangible losses, resulting from your use of the Service. Our total liability
              shall not exceed the amount paid by you for the Service in the 12 months preceding the claim.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your account and access to the Service immediately, without prior notice, 
              for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, 
              or for any other reason. Upon termination, your right to use the Service will cease immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes 
              via email or through the Service. Your continued use of the Service after changes constitutes 
              acceptance of the new Terms. Material changes will be effective 30 days after notification.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms are governed by the laws of the State of California, United States, without regard to 
              conflict of law principles. Any disputes will be resolved in the state or federal courts located 
              in Los Angeles County, California.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-2">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700">
                <strong>Devmint Technologies</strong><br />
                <strong>Email:</strong> support@devmint.site<br />
                <strong>Address:</strong> 1342 Lucile Avenue, Los Angeles, CA 90026<br />
                <strong>Phone:</strong> +1(740)738-2589
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Document History</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Version 2.1</strong> - December 2024: Updated Paddle.com integration terms and clarified service descriptions</p>
            <p><strong>Version 2.0</strong> - October 2024: Major revision for compliance updates</p>
            <p><strong>Version 1.0</strong> - January 2024: Initial version</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;