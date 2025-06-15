import React, { useState } from 'react';
import PaddleCheckout from './PaddleCheckout';
import { Heart, DollarSign, Gift, CreditCard } from 'lucide-react';

const DonationWidget: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState(false);

  // Predefined amounts starting from $1 (as requested)
  const predefinedAmounts = [1, 5, 10, 25, 50, 100];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1) {
      setSelectedAmount(numValue);
    }
  };

  const getFinalAmount = () => {
    if (customAmount) {
      const numValue = parseFloat(customAmount);
      return !isNaN(numValue) && numValue >= 1 ? numValue : 0;
    }
    return selectedAmount;
  };

  const isValidAmount = () => {
    return getFinalAmount() >= 1;
  };

  if (showCheckout) {
    return (
      <div className="max-w-md mx-auto">
        <PaddleCheckout
          planType="donation"
          customAmount={getFinalAmount()}
          onSuccess={() => {
            console.log('Donation completed successfully');
            // The success handling is now done in the Paddle event handler
          }}
          onError={(error) => {
            console.error('Donation error:', error);
            alert(`Donation failed: ${error}\nPlease try again or contact support.`);
            setShowCheckout(false);
          }}
        />
        <button
          onClick={() => setShowCheckout(false)}
          className="w-full mt-4 py-2 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          ← Back to Amount Selection
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Support Devmint</h3>
        <p className="text-gray-600">
          Help us continue building amazing API tools for developers worldwide
        </p>
      </div>

      <div className="space-y-6">
        {/* Predefined Amounts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose an amount (minimum $1.00):
          </label>
          <div className="grid grid-cols-3 gap-3">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  selectedAmount === amount && !customAmount
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter a custom amount:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="1"
              step="0.01"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount (min $1.00)"
            />
          </div>
          {customAmount && !isValidAmount() && (
            <p className="text-red-600 text-sm mt-1">⚠️ Minimum donation amount is $1.00</p>
          )}
          {customAmount && isValidAmount() && (
            <p className="text-green-600 text-sm mt-1">✅ Valid donation amount: ${getFinalAmount().toFixed(2)}</p>
          )}
        </div>

        {/* Current Selection Display */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Selected donation amount:</div>
            <div className="text-2xl font-bold text-blue-600">
              ${getFinalAmount().toFixed(2)}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-green-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Gift className="w-5 h-5 mr-2 text-green-600" />
            Your donation helps us:
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Maintain 99.9% uptime infrastructure</li>
            <li>• Develop new API features and tools</li>
            <li>• Provide free tier for developers</li>
            <li>• Improve documentation and support</li>
            <li>• Keep our services affordable</li>
            <li>• Support open-source development</li>
          </ul>
        </div>

        {/* Payment Methods Info */}
        <div className="bg-purple-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
            Secure Payment Methods:
          </h4>
          <div className="text-sm text-gray-700 space-y-1">
            <div>💳 Credit/Debit Cards (Visa, Mastercard, Amex, Discover)</div>
            <div>📱 Digital Wallets (Apple Pay, Google Pay, PayPal)</div>
            <div>🏦 Bank Transfers & Local Payment Methods</div>
            <div>🔒 256-bit SSL encryption by Paddle.com</div>
          </div>
        </div>

        {/* Donate Button */}
        <button
          onClick={() => setShowCheckout(true)}
          disabled={!isValidAmount()}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
            isValidAmount()
              ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 transform hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Heart className="w-5 h-5 mr-2" />
          {isValidAmount() 
            ? `Donate $${getFinalAmount().toFixed(2)} Now` 
            : 'Enter Amount (Min $1.00)'
          }
        </button>

        {/* Security & Trust Info */}
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-2">
            🔒 Secure payment processing by{' '}
            <a 
              href="https://paddle.com" 
              className="text-blue-600 hover:underline font-medium" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Paddle.com
            </a>
          </div>
          <div className="text-xs text-gray-500">
            ✅ PCI DSS Level 1 compliant • 🌍 Global payment support • 📧 Instant receipt
          </div>
        </div>

        {/* Thank You Message */}
        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <div className="text-sm text-yellow-800">
            <strong>❤️ Thank you for considering a donation!</strong><br />
            Every contribution helps us build better tools for the developer community.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationWidget;