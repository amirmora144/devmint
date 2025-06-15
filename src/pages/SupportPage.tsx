import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen, 
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

const SupportPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    message: ''
  });

  const categories = [
    { id: 'all', name: 'All Topics', count: 24 },
    { id: 'api', name: 'API Usage', count: 8 },
    { id: 'billing', name: 'Billing', count: 6 },
    { id: 'account', name: 'Account', count: 5 },
    { id: 'integration', name: 'Integration', count: 5 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'api',
      question: 'How do I get started with the Devmint APIs?',
      answer: 'Getting started is easy! After signing up, you\'ll receive an API key in your dashboard. Use this key to authenticate your requests. Check our comprehensive documentation for code examples in multiple programming languages.'
    },
    {
      id: 2,
      category: 'api',
      question: 'What are the rate limits for different plans?',
      answer: 'Free plan: 100 requests/minute, Pro plan: 1,000 requests/minute, Enterprise: Custom limits. Rate limits reset every minute. If you exceed your limit, you\'ll receive a 429 status code.'
    },
    {
      id: 3,
      category: 'billing',
      question: 'Can I change my subscription plan at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan anytime from your dashboard. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.'
    },
    {
      id: 4,
      category: 'billing',
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund within 30 days of your initial subscription.'
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click the "Forgot Password" link on the login page. We\'ll send you a secure reset link via email. If you don\'t receive it, check your spam folder or contact support.'
    },
    {
      id: 6,
      category: 'integration',
      question: 'Which programming languages do you support?',
      answer: 'Our REST APIs work with any language that can make HTTP requests. We provide official SDKs for JavaScript/Node.js, Python, PHP, and Ruby, with more coming soon.'
    },
    {
      id: 7,
      category: 'api',
      question: 'How do I generate invoices using the API?',
      answer: 'Use the /invoices endpoint with POST method. Include customer details, line items, and invoice settings in your request body. The API will return a PDF invoice and unique invoice ID.'
    },
    {
      id: 8,
      category: 'account',
      question: 'Can I have multiple team members on my account?',
      answer: 'Yes! Pro and Enterprise plans support team collaboration. You can invite team members, set permissions, and manage API keys for different team members.'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your support system
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', priority: 'medium', message: '' });
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant answers to common questions or reach out to our support team for personalized assistance.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{'< 4 hrs'}</div>
            <div className="text-gray-600 text-sm">Average Response Time</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">99.2%</div>
            <div className="text-gray-600 text-sm">Customer Satisfaction</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Enterprise Support</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600 text-sm">Documentation Articles</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            {/* Contact Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Support</h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email Support</div>
                    <div className="text-sm text-gray-600">support@devmint.site</div>
                    <div className="text-xs text-blue-600">Response within 4 hours</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Live Chat</div>
                    <div className="text-sm text-gray-600">Available 9 AM - 6 PM PST</div>
                    <div className="text-xs text-green-600">Instant response</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone Support</div>
                    <div className="text-sm text-gray-600">+1(740)738-2589</div>
                    <div className="text-xs text-purple-600">Enterprise customers only</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Send us a message</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Standard issue</option>
                    <option value="high">High - Urgent issue</option>
                    <option value="critical">Critical - Service down</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Emergency Support</h4>
                  <p className="text-sm text-red-700 mb-3">
                    For critical service outages affecting production systems:
                  </p>
                  <div className="text-sm text-red-700">
                    <strong>Phone:</strong> +917373842315<br />
                    <strong>Email:</strong> support@devmint.site
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;