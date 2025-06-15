import React from 'react';
import { RefreshCw, DollarSign, Clock, CheckCircle, AlertTriangle, Mail } from 'lucide-react';

const RefundPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">Last updated: December 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <DollarSign className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Paddle.com Payment Processing</h3>
                <p className="text-gray-700 text-sm">
                  All payments are processed by Paddle.com Market Limited, who acts as the Merchant of Record. 
                  Refunds are processed directly through Paddle's system and will appear on your original payment method. 
                  This policy complements Paddle's refund terms and conditions.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Our Refund Guarantee</h2>
            <p className="text-gray-700 mb-6">
              We stand behind our service and want you to be completely satisfied with Devmint. Our refund policy
              is designed to be fair and transparent, ensuring you can try our service with confidence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">30-Day Money Back Guarantee</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Full refund available within 30 days of your initial subscription for Pro and Enterprise plans.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Pro-rated Refunds</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  If you downgrade or cancel mid-cycle, we'll provide pro-rated refunds for unused service.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Eligibility</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-green-700">✓ Eligible for Full Refund</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 bg-green-50 p-4 rounded-xl">
              <li>First-time subscribers within 30 days of initial payment</li>
              <li>Service disruptions lasting more than 24 hours</li>
              <li>Documented technical issues preventing service use</li>
              <li>Billing errors or duplicate charges</li>
              <li>Accidental subscription upgrades (within 48 hours)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-red-700">✗ Not Eligible for Refund</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 bg-red-50 p-4 rounded-xl">
              <li>Free plan users (no payment made)</li>
              <li>Violation of Terms of Service</li>
              <li>Requests made after 30 days of initial payment</li>
              <li>Partial usage of monthly API allocations</li>
              <li>Change of mind after extended service use</li>
              <li>Renewal charges (can be cancelled for future billing)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Process</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Submit Refund Request</h4>
                  <p className="text-gray-700 text-sm">
                    Contact our support team at <strong>support@devmint.site</strong> with your account details
                    and reason for the refund request.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Review Process</h4>
                  <p className="text-gray-700 text-sm">
                    Our team will review your request within 2 business days and may request additional information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Processing & Notification</h4>
                  <p className="text-gray-700 text-sm">
                    Approved refunds are processed through Paddle.com within 5-7 business days. 
                    You'll receive email confirmation once processed.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription Cancellations</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Cancellation Information</h3>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li>• You can cancel your subscription anytime through your account dashboard</li>
                    <li>• Cancellation takes effect at the end of your current billing period</li>
                    <li>• You retain access to paid features until the end of the billing period</li>
                    <li>• No automatic refunds are issued for cancellations - service continues until period ends</li>
                    <li>• You can request a refund separately if eligible under this policy</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Special Circumstances</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Annual Subscriptions</h3>
            <p className="text-gray-700 mb-4">
              Annual subscribers are eligible for a full refund within 30 days of initial payment. After 30 days, 
              refunds may be considered on a case-by-case basis, calculated as the unused portion of the annual term.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Credits</h3>
            <p className="text-gray-700 mb-4">
              In cases where a full refund isn't appropriate, we may offer service credits that can be applied 
              to future billing periods. These credits never expire and can be used for any Devmint service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise Customers</h3>
            <p className="text-gray-700 mb-6">
              Enterprise customers with custom contracts should refer to their specific agreement terms. 
              Standard refund policies may not apply to custom enterprise arrangements.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Processing Timeline</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Refund Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Review Time</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Billing Error</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Same day</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">1-3 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">30-Day Guarantee</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">1-2 business days</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">5-7 business days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Service Issue</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">2-3 business days</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">5-7 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Special Case</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">5-7 business days</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">7-10 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Contact Information</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    Billing Support
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Email:</strong> support@devmint.site
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Response time:</strong> Within 4 hours during business days
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Phone:</strong> +1(740)738-2589 (Enterprise customers only)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Required Information</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Account email address</li>
                    <li>• Subscription or invoice number</li>
                    <li>• Reason for refund request</li>
                    <li>• Any supporting documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Still Have Questions?</h3>
            <p className="text-gray-600 mb-4">
              Our customer success team is here to help you understand our refund policy and assist with any concerns.
            </p>
            <a 
              href="mailto:support@devmint.site"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Contact Billing Support
              <Mail className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;