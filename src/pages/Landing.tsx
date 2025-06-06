
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Gift, HandCoins, Zap, ShieldCheck, Star, Sun, Moon, Code, ArrowRight, Sparkles, Store, Users, Heart, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { useTheme } from '@/components/ThemeProvider';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { upiIds, addUpiId } = useAppContext();
  
  const handleGetStarted = () => {
    const existingUpi = upiIds.find(upi => upi.upiId === "adnanmuhammad4393@okicici");
    if (!existingUpi) {
      addUpiId({
        upiId: "adnanmuhammad4393@okicici",
        name: "Muhammed Adnan",
        isDefault: true
      });
    }
    navigate('/app');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Enhanced Header */}
      <header className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <QrCode className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-upi-blue transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-upi-blue/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-upi-blue to-purple-600 bg-clip-text text-transparent">
              CodeCashier
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
              Free & Premium
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="rounded-full h-8 w-8 sm:h-9 sm:w-9 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </Button>
            <Button 
              onClick={() => navigate('/widget')} 
              variant="outline" 
              size="sm" 
              className="text-xs border-upi-blue/30 hover:bg-upi-blue/10 backdrop-blur-sm transition-all duration-300 hidden sm:inline-flex"
            >
              <Code size={12} className="mr-1" />
              Widget
            </Button>
            <Button 
              onClick={() => navigate('/app')} 
              size="sm" 
              className="text-xs sm:text-sm bg-gradient-to-r from-upi-blue to-purple-600 hover:from-upi-blue/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="hidden sm:inline">Start Free</span>
              <span className="sm:hidden">Free</span>
              <ArrowRight size={12} className="ml-1" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Enhanced Hero Section with SEO-optimized content */}
      <section className="flex-1 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16 xl:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="animate-fade-in">
                <Badge className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-upi-blue border-upi-blue/20 mb-4 sm:mb-6 text-xs sm:text-sm">
                  <Sparkles size={12} />
                  100% Free • No Registration Required
                </Badge>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight leading-tight animate-fade-in animation-delay-200 px-4 lg:px-0">
                Free{' '}
                <span className="bg-gradient-to-r from-upi-blue via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  UPI QR Code Generator
                </span>{' '}
                for Small Business
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 max-w-2xl animate-fade-in animation-delay-400 px-4 lg:px-0">
                Generate UPI payment QR codes instantly for your retail store, restaurant, event, donation drive, or service business. Accept PhonePe, Google Pay, Paytm, and all UPI payments effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in animation-delay-600 px-4 lg:px-0">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted} 
                  className="bg-gradient-to-r from-upi-blue to-purple-600 hover:from-upi-blue/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6"
                >
                  Start Generating QR Codes Free
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/widget')} 
                  className="border-2 border-upi-blue/30 text-upi-blue hover:bg-upi-blue/10 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6"
                >
                  <Code size={16} className="mr-2" />
                  Embed on Website
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400 animate-fade-in animation-delay-800 px-4 lg:px-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-green-500" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-yellow-500" />
                  <span>Instant Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-purple-500" />
                  <span>Free Forever</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Visual Element */}
            <div className="flex justify-center lg:justify-end animate-scale-in animation-delay-1000 order-1 lg:order-2">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-700/50 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-6 sm:inset-8 bg-gradient-to-br from-upi-blue/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
                    <QrCode size={80} className="sm:w-24 sm:h-24 lg:w-30 lg:h-30 text-upi-blue/70" />
                  </div>
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Niche-Specific Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Badge className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200 mb-4 sm:mb-6 text-xs sm:text-sm">
              <Star size={12} />
              Perfect for Every Business
            </Badge>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent px-4">
              Trusted by 10,000+ Businesses Across India
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              From street vendors to large enterprises, CodeCashier powers UPI payments for every business type
            </p>
          </div>

          {/* Niche-specific use cases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {[
              {
                icon: Store,
                title: "Retail & Shops",
                description: "Perfect for grocery stores, clothing shops, electronics stores, and all retail businesses accepting UPI payments.",
                keywords: "retail QR code, shop payment QR, store UPI QR, merchant QR code",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Events & Services",
                description: "Ideal for event ticket sales, catering services, photography, home services, and consultation fees.",
                keywords: "event payment QR, service payment QR, consultation QR, ticket QR code",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Heart,
                title: "Donations & NGOs",
                description: "Streamline donations for NGOs, temples, churches, schools, and community fundraising initiatives.",
                keywords: "donation QR code, NGO payment QR, temple donation QR, fundraising QR",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Briefcase,
                title: "Professional Services",
                description: "Accept payments for freelance work, tutoring, medical consultations, legal services, and more.",
                keywords: "freelancer payment QR, tuition fee QR, professional service QR, consultant QR",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((niche, index) => (
              <Card 
                key={niche.title}
                className="group border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-fade-in"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${niche.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <niche.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold group-hover:text-upi-blue transition-colors duration-300">
                    {niche.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                    {niche.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 opacity-75">
                    {niche.keywords}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: QrCode,
                title: "Instant QR Generation",
                description: "Generate unlimited UPI QR codes for any amount. Works with PhonePe, Google Pay, Paytm, BHIM, and all UPI apps.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: ShieldCheck,
                title: "Bank-Grade Security",
                description: "Your UPI ID and transaction data are encrypted and secure. We never store your financial information.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate QR codes in seconds. No registration, no waiting. Start accepting payments immediately.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Star,
                title: "Premium Dashboard",
                description: "Track all your payments with our advanced dashboard. Export transaction history and manage multiple UPI IDs.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Code,
                title: "Website Integration",
                description: "Embed our donation widget on your website with simple HTML code. Perfect for online fundraising.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: HandCoins,
                title: "Multi-Purpose Use",
                description: "Perfect for shops, restaurants, events, donations, services, freelancing, and any business accepting UPI.",
                gradient: "from-emerald-500 to-teal-500"
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className="group border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-fade-in"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold group-hover:text-upi-blue transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                {feature.title === "Website Integration" && (
                  <CardFooter className="p-4 sm:p-6 pt-0">
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => navigate('/widget')} 
                      className="p-0 text-upi-blue hover:text-purple-600 transition-colors duration-300 text-xs sm:text-sm"
                    >
                      Try Widget Now
                      <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-focused CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-upi-blue/10 to-purple-600/10 dark:from-upi-blue/5 dark:to-purple-600/5">
        <div className="container max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Start Accepting UPI Payments Today
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of Indian businesses using CodeCashier for seamless UPI payment collection. 100% free, no hidden charges, instant setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleGetStarted} 
              className="bg-gradient-to-r from-upi-blue to-purple-600 hover:from-upi-blue/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base lg:text-lg px-8 py-6"
            >
              Create Your First QR Code Free
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              No registration required • Works instantly • Supports all UPI apps
            </p>
          </div>
        </div>
      </section>
      
      {/* Enhanced Footer with SEO elements */}
      <footer className="border-t border-white/20 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 py-6 sm:py-8 lg:py-12">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <QrCode className="h-5 w-5 text-upi-blue" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">CodeCashier</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                India's most trusted free UPI QR code generator for businesses of all sizes.
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  4.8★ Rating
                </Badge>
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  10,000+ Users
                </Badge>
              </div>
            </div>

            {/* Use Cases */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Perfect For</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Retail Stores & Shops</li>
                <li>• Restaurants & Cafes</li>
                <li>• Event Organizers</li>
                <li>• NGOs & Donations</li>
                <li>• Freelancers & Services</li>
                <li>• Online Businesses</li>
              </ul>
            </div>

            {/* Keywords for SEO */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Features</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Free UPI QR Generator</li>
                <li>• PhonePe, GPay Compatible</li>
                <li>• Instant QR Creation</li>
                <li>• Secure & Encrypted</li>
                <li>• No Registration Needed</li>
                <li>• Website Integration</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Created with ❤️ by Muhammed Adnan
                </p>
                <a 
                  href="https://www.producthunt.com/products/codecashier?utm_source=badge-follow&utm_medium=badge&utm_source=badge-codecashier" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1067890&theme=light&size=small" 
                    alt="CodeCashier - Generate UPI QR codes instantly | Product Hunt" 
                    style={{width: '86px', height: '32px'}} 
                    width="86" 
                    height="32" 
                  />
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-400">
                <span>© 2024 CodeCashier</span>
                <span>•</span>
                <span>Free UPI QR Code Generator India</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
