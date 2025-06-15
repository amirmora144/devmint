import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  FileText, 
  CreditCard, 
  Settings, 
  Key, 
  Download,
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [selectedInvoiceTemplate, setSelectedInvoiceTemplate] = useState('modern');

  const sidebarItems = [
    { path: '/dashboard', icon: <BarChart3 className="w-5 h-5" />, label: 'Overview', exact: true },
    { path: '/dashboard/invoices', icon: <FileText className="w-5 h-5" />, label: 'Invoices' },
    { path: '/dashboard/subscription', icon: <CreditCard className="w-5 h-5" />, label: 'Subscription' },
    { path: '/dashboard/api', icon: <Key className="w-5 h-5" />, label: 'API Keys' },
    { path: '/dashboard/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Mock data for dashboard
  const apiUsage = {
    current: user?.apiUsage || 0,
    limit: user?.apiLimit || 1000,
    percentage: ((user?.apiUsage || 0) / (user?.apiLimit || 1000)) * 100
  };

  const recentInvoices = [
    { id: 'INV-2024-001', client: 'TechFlow Solutions', amount: '$1,250.00', status: 'paid', date: '2024-12-15' },
    { id: 'INV-2024-002', client: 'Digital Dynamics', amount: '$850.00', status: 'pending', date: '2024-12-14' },
    { id: 'INV-2024-003', client: 'CloudSync Inc', amount: '$2,100.00', status: 'paid', date: '2024-12-13' }
  ];

  const invoiceTemplates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean design with blue accents',
      preview: 'https://images.pexels.com/photos/8292893/pexels-photo-8292893.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'classic',
      name: 'Classic Business',
      description: 'Traditional layout with professional styling',
      preview: 'https://images.pexels.com/photos/7887821/pexels-photo-7887821.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and elegant design',
      preview: 'https://images.pexels.com/photos/8292864/pexels-photo-8292864.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'creative',
      name: 'Creative Bold',
      description: 'Eye-catching design with color gradients',
      preview: 'https://images.pexels.com/photos/7887804/pexels-photo-7887804.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const OverviewPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your API usage and business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{apiUsage.current.toLocaleString()}</span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>API Calls</span>
              <span>{apiUsage.current.toLocaleString()}/{apiUsage.limit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                style={{ width: `${Math.min(apiUsage.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">$4,200</span>
          </div>
          <p className="text-gray-600 text-sm">Monthly Revenue</p>
          <p className="text-green-600 text-xs">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">23</span>
          </div>
          <p className="text-gray-600 text-sm">Invoices Created</p>
          <p className="text-purple-600 text-xs">This month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900 capitalize">{user?.plan}</span>
          </div>
          <p className="text-gray-600 text-sm">Current Plan</p>
          <p className="text-yellow-600 text-xs capitalize">
            {user?.plan === 'free' ? 'Upgrade available' : 'Active subscription'}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
            <Link to="/dashboard/invoices" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-semibold text-gray-900">{invoice.id}</div>
                  <div className="text-sm text-gray-600">{invoice.client}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{invoice.amount}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/dashboard/invoices" className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Create Invoice</div>
                <div className="text-sm text-gray-600">Generate a new invoice</div>
              </div>
            </Link>
            
            <Link to="/dashboard/api" className="flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Manage API Keys</div>
                <div className="text-sm text-gray-600">Create or revoke API keys</div>
              </div>
            </Link>
            
            <Link to="/dashboard/subscription" className="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {user?.plan === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
                </div>
                <div className="text-sm text-gray-600">
                  {user?.plan === 'free' ? 'Access more features' : 'View billing details'}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const InvoicesPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice Generation</h1>
          <p className="text-gray-600">Create professional invoices with customizable templates</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          New Invoice
        </button>
      </div>

      {/* Template Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Invoice Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {invoiceTemplates.map((template) => (
            <div 
              key={template.id} 
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                selectedInvoiceTemplate === template.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedInvoiceTemplate(template.id)}
            >
              <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                <img 
                  src={template.preview} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              {selectedInvoiceTemplate === template.id && (
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Invoice Details</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Email *</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="client@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client Address</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter client address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="INV-2024-001"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Invoice Items</label>
            <div className="border border-gray-300 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Rate</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-1"></div>
              </div>
              <div className="px-4 py-3 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Service description"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                    placeholder="$0.00"
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <button className="text-red-600 hover:text-red-700">×</button>
                </div>
              </div>
            </div>
            <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>

          <div className="flex items-center justify-between pt-6">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Preview Invoice
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const SubscriptionPage = () => {
    if (!user) return null;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your Devmint subscription and billing</p>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              user.plan === 'free' ? 'bg-gray-100 text-gray-800' :
              user.plan === 'pro' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {user.plan.toUpperCase()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-900 mb-2">{user.apiLimit.toLocaleString()}</div>
              <div className="text-gray-600 text-sm">API Calls/Month</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {user.plan === 'free' ? '5' : user.plan === 'pro' ? '25+' : 'Unlimited'}
              </div>
              <div className="text-gray-600 text-sm">Invoice Templates</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {user.plan === 'enterprise' ? '24/7' : user.plan === 'pro' ? 'Priority' : 'Email'}
              </div>
              <div className="text-gray-600 text-sm">Support Level</div>
            </div>
          </div>
        </div>

        {/* Upgrade Options */}
        {user.plan !== 'enterprise' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upgrade Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.plan === 'free' && (
                <div className="border-2 border-blue-600 rounded-xl p-6 bg-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Professional Plan</h3>
                    <div className="text-2xl font-bold text-blue-600">$29/mo</div>
                  </div>
                  <ul className="space-y-3 mb-6 text-gray-700">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />50,000 API calls/month</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />25+ premium templates</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Priority support</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Team collaboration</li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                    Upgrade to Professional
                  </button>
                </div>
              )}
              
              <div className="border border-gray-300 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Enterprise Plan</h3>
                  <div className="text-2xl font-bold text-purple-600">$99/mo</div>
                </div>
                <ul className="space-y-3 mb-6 text-gray-700">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Unlimited API calls</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Custom templates</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />24/7 phone support</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Dedicated account manager</li>
                </ul>
                <button className="w-full py-3 border border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Billing History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Billing History</h2>
          <div className="space-y-4">
            {user.plan !== 'free' ? (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">December 2024</div>
                    <div className="text-sm text-gray-600">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${user.plan === 'pro' ? '29.00' : '99.00'}</div>
                    <div className="text-xs text-green-600">Paid</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-semibold text-gray-900">November 2024</div>
                    <div className="text-sm text-gray-600">{user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${user.plan === 'pro' ? '29.00' : '99.00'}</div>
                    <div className="text-xs text-green-600">Paid</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No billing history available for free plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ApiKeysPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">API Keys</h1>
        <p className="text-gray-600">Manage your API keys and access tokens</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your API Keys</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Key
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-semibold text-gray-900">Production Key</div>
                <div className="text-sm text-gray-600">Created Dec 1, 2024</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm text-gray-700">
              {user?.apiKey}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your company name"
            />
          </div>

          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Dashboard</div>
                <div className="text-sm text-gray-600 capitalize">{user?.plan} plan</div>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive(item.path, item.exact)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/api" element={<ApiKeysPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;