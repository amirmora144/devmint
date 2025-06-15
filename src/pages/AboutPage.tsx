import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Shield, 
  Clock, 
  ArrowRight,
  Zap,
  Building,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { label: "Active Developers", value: "5,000+", icon: <Users className="w-6 h-6" /> },
    { label: "API Calls Daily", value: "2M+", icon: <Zap className="w-6 h-6" /> },
    { label: "Countries Served", value: "45+", icon: <Globe className="w-6 h-6" /> },
    { label: "Uptime Guarantee", value: "99.9%", icon: <Clock className="w-6 h-6" /> }
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "CEO & Co-Founder",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former VP of Engineering at leading fintech companies. 12+ years building scalable payment systems."
    },
    {
      name: "David Chen",
      role: "CTO & Co-Founder",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Ex-Stripe engineer with expertise in distributed systems and API architecture."
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Product",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Product strategist with deep understanding of developer needs and enterprise requirements."
    },
    {
      name: "Alex Thompson",
      role: "VP of Engineering",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Infrastructure expert ensuring 99.9% uptime and enterprise-grade security standards."
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security First",
      description: "We prioritize security in everything we do, implementing industry-leading practices to protect your data and your customers' information."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Developer-Centric",
      description: "Built by developers, for developers. We understand the challenges and create solutions that make your life easier."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Reliability",
      description: "Our infrastructure is designed for maximum uptime and performance, so you can focus on building great products."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Scale",
      description: "Serving customers worldwide with local presence and support in major markets across the globe."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Devmint</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to simplify API development and empower businesses to build better, 
              faster, and more reliable billing solutions. Founded in 2022, Devmint has grown to serve
              thousands of developers and businesses worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Devmint was born from frustration. As developers, our founders spent countless hours
                building and maintaining billing infrastructure instead of focusing on core business logic. 
                They knew there had to be a better way.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Starting with a simple invoice generation API, we've grown into a comprehensive platform 
                that serves everything from startups to mid-market companies. Our focus remains the same: 
                making powerful APIs accessible to everyone.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, Devmint processes millions of API calls monthly, helping businesses automate
                invoicing, manage subscriptions, and scale their operations with confidence.
              </p>
              <Link
                to="/support"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team working together"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Devmint
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The talented individuals behind Devmint's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Company Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Entity</h3>
                    <p className="text-gray-600">
                      Devmint Technologies<br />
                      Sole Proprietorship<br />
                      Operating in California, USA
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Address</h3>
                    <p className="text-gray-600">
                      1342 Lucile Avenue<br />
                      Los Angeles, CA 90026<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <p className="text-gray-600">
                      General: hello@devmint.site<br />
                      Support: support@devmint.site<br />
                      Sales: sales@devmint.site
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-gray-600">
                      US/Canada: +1(740)738-2589<br />
                      International: +917373842315<br />
                      Available 9 AM - 6 PM PST for Pro+ customers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Certifications & Compliance</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">SOC 2 Type II</h3>
                  </div>
                  <p className="text-gray-600">
                    Independently audited security controls ensuring the highest level of data protection.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">GDPR Compliant</h3>
                  </div>
                  <p className="text-gray-600">
                    Full compliance with European General Data Protection Regulation requirements.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-8 h-8 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">PCI DSS Level 1</h3>
                  </div>
                  <p className="text-gray-600">
                    Highest level of payment card industry data security standard compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;