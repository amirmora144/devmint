import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PaddleCheckout from '../components/PaddleCheckout';
import DonationWidget from '../components/DonationWidget';
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  ArrowRight,
  Sparkles,
  Crown,
  Building,
  Phone,
  Mail,
  Globe,
  Heart
} from 'lucide-react';

const PricingPage: React.FC = () => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showCheckout, setShowCheckout] = useState<{ plan: string; billing: 'monthly' | 'yearly' } | null>(null);
  const [showDonation, setShowDonation] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for testing and small projects",
      price: { monthly: 0, yearly: 0 },
      originalPrice: { monthly: 0, yearly: 0 },
      features: [
        { name: "1,000 API calls/month", included: true },
        { name: "5 invoice templates", included: true },
        { name: "Email support", included: true },
        { name: "Basic analytics", included: true },
        { name: "API documentation", included: true },
        { name: "Community forum access", included: true },
        { name: "SSL encryption", included: true },
        { name: "Premium templates", included: false },
        { name: "Priority support", included: false },
        { name: "Team collaboration", included: false },
        { name: "Custom branding", included: false },
        { name: "Advanced analytics", included: false }
      ],
      popular: false,
      buttonText: { monthly: "Start Free", yearly: "Start Free" },
      buttonStyle: "secondary",
      icon: <Zap className="w-6 h-6" />,
      note: "No credit card required"
    },
    {
      name: "Professional",
      description: "For growing businesses and teams",
      price: { monthly: 29, yearly: 24 },
      originalPrice: { monthly: 29, yearly: 29 },
      realPrice: { monthly: 29, yearly: 288 }, // Real prices
      features: [
        { name: "50,000 API calls/month", included: true },
        { name: "25+ premium templates", included: true },
        { name: "Priority email support", included: true },
        { name: "Advanced security features", included: true },
        { name: "Custom branding", included: true },
        { name: "Team collaboration (5 seats)", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Webhook notifications", included: true },
        { name: "API rate limit increases", included: true },
        { name: "Export capabilities", included: true },
        { name: "Phone support", included: false },
        { name: "Dedicated account manager", included: false }
      ],
      popular: true,
      buttonText: { monthly: "Start 14-Day Trial", yearly: "Subscribe Yearly" },
      buttonStyle: "primary",
      icon: <Star className="w-6 h-6" />,
      note: "Most popular choice"
    },
    {
      name: "Enterprise",
      description: "For large organizations with high-volume needs",
      price: { monthly: 99, yearly: 82 },
      originalPrice: { monthly: 99, yearly: 99 },
      realPrice: { monthly: 99, yearly: 984 }, // Real prices
      features: [
        { name: "Unlimited API calls", included: true },
        { name: "All premium templates", included: true },
        { name: "24/7 phone & email support", included: true },
        { name: "Enterprise-grade security", included: true },
        { name: "White-label solution", included: true },
        { name: "Unlimited team members", included: true },
        { name: "Advanced analytics & reporting", included: true },
        { name: "Priority API processing", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "99.9% SLA guarantee", included: true },
        { name: "Custom integrations support", included: true },
        { name: "Flexible contract terms", included: true }
      ],
      popular: false,
      buttonText: { monthly: "Contact Sales", yearly: "Contact Sales" },
      buttonStyle: "secondary",
      icon: <Crown className="w-6 h-6" />,
      note: "Volume discounts available"
    }
  ];

  const addOns = [
    {
      name: "Additional API Calls",
      description: "Extra API calls beyond your plan limit",
      price: "$0.001 per call",
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Premium Support",
      description: "Dedicated support channel with faster response times",
      price: "$49/month",
      icon: <Phone className="w-5 h-5" />
    },
    {
      name: "Advanced Analytics",
      description: "Enhanced reporting and business intelligence features",
      price: "$19/month",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      name: "Extended Rate Limits",
      description: "Higher API rate limits for burst traffic handling",
      price: "$29/month",
      icon: <Users className="w-5 h-5" />
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle."
    },
    {
      question: "What happens if I exceed my API limit?",
      answer: "If you exceed your monthly API limit, your requests will be throttled. You can purchase additional API calls or upgrade to a higher plan to avoid interruptions."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund within 30 days."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees! You only pay the monthly or yearly subscription fee. Enterprise customers may have custom pricing based on their specific requirements."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time through your account dashboard. You'll retain access to paid features until the end of your billing period."
    },
    {
      question: "Do you offer volume discounts?",
      answer: "Yes! Enterprise customers and high-volume users can contact our sales team for custom pricing and volume discounts."
    }
  ];

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.realPrice && plan.realPrice.yearly > 0) {
      const monthlyCost = plan.realPrice.monthly * 12;
      const yearlyCost = plan.realPrice.yearly;
      return monthlyCost - yearlyCost;
    }
    return 0;
  };

  const getYearlyPrice = (plan: typeof plans[0]) => {
    return plan.realPrice ? plan.realPrice.yearly : plan.price.yearly * 12;
  };

  const getButtonText = (plan: typeof plans[0]) => {
    return plan.buttonText[billingCycle];
  };

  const handlePlanSelect = (planName: string) => {
    if (planName === 'Starter') {
      if (user) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/signup';
      }
    } else if (planName === 'Enterprise') {
      window.location.href = '/support';
    } else {
      // Map plan names to the expected planType values for PaddleCheckout
      const planTypeMap: { [key: string]: string } = {
        'Professional': 'pro',
        'Enterprise': 'enterprise'
      };
      
      const planType = planTypeMap[planName] || planName.toLowerCase();
      setShowCheckout({ plan: planType, billing: billingCycle });
    }
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Subscription</h1>
            <p className="text-gray-600">Secure payment processing by Paddle.com</p>
          </div>
          
          <PaddleCheckout
            planType={showCheckout.plan as 'pro' | 'enterprise'}
            billingCycle={showCheckout.billing}
            userEmail={user?.email}
            onSuccess={() => {
              alert('Subscription successful! Welcome to Devmint!');
              window.location.href = '/dashboard?payment=success';
            }}
            onError={(error) => {
              alert(`Subscription failed: ${error}`);
              setShowCheckout(null);
            }}
          />
          
          <div className="text-center mt-6">
            <button
              onClick={() => setShowCheckout(null)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to pricing plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showDonation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Support Devmint</h1>
            <p className="text-gray-600">Help us continue building amazing API tools</p>
          </div>
          
          <DonationWidget />
          
          <div className="text-center mt-6">
            <button
              onClick={() => setShowDonation(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to pricing plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            30-day money-back guarantee
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start free, scale as you grow, 
            and unlock powerful features to accelerate your development.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    billingCycle === 'monthly'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 relative ${
                    billingCycle === 'yearly'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative bg-white rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular 
                    ? 'ring-2 ring-blue-600 scale-105 lg:scale-110' 
                    : 'hover:shadow-2xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                        </span>
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'month'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && plan.realPrice && plan.realPrice.yearly > 0 && (
                        <div className="mt-2">
                          <div className="text-sm text-gray-500">
                            Billed annually: ${getYearlyPrice(plan)}
                          </div>
                          {getSavings(plan) > 0 && (
                            <div className="text-sm text-green-600 font-semibold">
                              Save ${getSavings(plan)} per year
                            </div>
                          )}
                        </div>
                      )}
                      {plan.note && (
                        <div className="mt-2">
                          <span className="text-sm text-blue-600 font-medium">
                            {plan.note}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.name)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-200 ${
                      plan.buttonStyle === 'primary'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {getButtonText(plan)}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Donation Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Support Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Love what we're building? Support Devmint with a donation to help us continue 
                providing amazing API tools for developers worldwide.
              </p>
              <button
                onClick={() => setShowDonation(true)}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Heart className="w-5 h-5 mr-2 inline" />
                Make a Donation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Add-ons & Extras</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your plan with additional features and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
                  {addon.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <div className="text-xl font-bold text-blue-600">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Plan Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-blue-200 mr-3" />
                <h2 className="text-3xl font-bold text-white">Custom Plans Available</h2>
              </div>
              <p className="text-xl text-blue-100 mb-8">
                Need something beyond our standard plans? We offer custom solutions for organizations 
                with unique requirements, high-volume usage, and specific compliance needs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-blue-100">
                  <Shield className="w-5 h-5 mr-3" />
                  <span>SOC 2 Type II Compliance</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <Globe className="w-5 h-5 mr-3" />
                  <span>Global Infrastructure</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>99.9% SLA Guarantee</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <Users className="w-5 h-5 mr-3" />
                  <span>Dedicated Support Team</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Custom Plan Pricing</h3>
              
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Volume-Based Pricing</h4>
                  <p className="text-gray-700 text-sm mb-2">Starting at $200/month for high-volume usage</p>
                  <p className="text-gray-600 text-xs">Includes millions of API calls with volume discounts</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Enterprise Features</h4>
                  <p className="text-gray-700 text-sm mb-2">$500-2,000/month range</p>
                  <p className="text-gray-600 text-xs">Advanced features, dedicated support, and SLA guarantees</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">White-Label Solutions</h4>
                  <p className="text-gray-700 text-sm mb-2">$1,000-5,000/month range</p>
                  <p className="text-gray-600 text-xs">Fully branded solutions with custom domains and branding</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a
                  href="mailto:sales@devmint.site"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Sales Team
                </a>
                <a
                  href="tel:+17407382589"
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +1(740)738-2589
                </a>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> Custom plans are quoted based on specific requirements. 
                  Minimum commitment may apply for enterprise features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who trust Devmint for their API needs. 
            Start with our free plan and scale as you grow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a
                  href="mailto:sales@devmint.site"
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                >
                  Contact Sales
                  <Mail className="w-5 h-5 ml-2" />
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;