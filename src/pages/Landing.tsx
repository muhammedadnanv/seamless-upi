
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Gift, HandCoins, Zap, ShieldCheck, Star, Sun, Moon, Code, ArrowRight, Sparkles } from 'lucide-react';
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
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-5">
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <QrCode className="h-6 w-6 md:h-7 md:w-7 text-upi-blue transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-upi-blue/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-upi-blue to-purple-600 bg-clip-text text-transparent">
              CodeCashier
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
              Premium
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="rounded-full h-9 w-9 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button 
              onClick={() => navigate('/widget')} 
              variant="outline" 
              size="sm" 
              className="text-xs sm:text-sm mr-2 border-upi-blue/30 hover:bg-upi-blue/10 backdrop-blur-sm transition-all duration-300"
            >
              <Code size={14} className="mr-1" />
              Widget
            </Button>
            <Button 
              onClick={() => navigate('/app')} 
              size="sm" 
              className="text-xs sm:text-sm bg-gradient-to-r from-upi-blue to-purple-600 hover:from-upi-blue/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Open App
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Enhanced Hero Section */}
      <section className="flex-1 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="animate-fade-in">
                <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-upi-blue border-upi-blue/20 mb-6">
                  <Sparkles size={14} />
                  Quick & Secure Payments
                </Badge>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fade-in animation-delay-200">
                Streamline Your{' '}
                <span className="bg-gradient-to-r from-upi-blue via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  UPI Payments
                </span>{' '}
                with CodeCashier
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl animate-fade-in animation-delay-400">
                Generate UPI QR codes instantly, manage transactions, and receive payments effortlessly with our premium platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-600">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted} 
                  className="bg-gradient-to-r from-upi-blue to-purple-600 hover:from-upi-blue/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-lg px-8 py-6"
                >
                  Get Started Free
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/widget')} 
                  className="border-2 border-upi-blue/30 text-upi-blue hover:bg-upi-blue/10 backdrop-blur-sm transition-all duration-300 text-lg px-8 py-6"
                >
                  <Code size={20} className="mr-2" />
                  Explore Widget
                </Button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400 animate-fade-in animation-delay-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-green-500" />
                  Secure
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-500" />
                  Instant
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-purple-500" />
                  Premium
                </div>
              </div>
            </div>
            
            {/* Enhanced Visual Element */}
            <div className="flex justify-center lg:justify-end animate-scale-in animation-delay-1000">
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-700/50 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-8 bg-gradient-to-br from-upi-blue/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
                    <QrCode size={120} className="text-upi-blue/70" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Features */}
      <section className="py-16 sm:py-20 md:py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200 mb-6">
              <Star size={14} />
              Premium Features
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Why Choose CodeCashier?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of UPI payments with our premium platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: QrCode,
                title: "Instant QR Codes",
                description: "Generate UPI payment QR codes on the fly with your preferred amount and payment details.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: ShieldCheck,
                title: "Transaction Security",
                description: "Keep your payment data secure with our advanced encryption and secure transaction processing.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Star,
                title: "Premium Features",
                description: "Access advanced reporting, voice commands, and customizable transaction history.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Code,
                title: "Embeddable Widget",
                description: "Use our customizable donation widget on your own website with simple HTML embedding.",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className="group border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-fade-in"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <CardHeader className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-semibold group-hover:text-upi-blue transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                {feature.title === "Embeddable Widget" && (
                  <CardFooter className="p-6 pt-0">
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => navigate('/widget')} 
                      className="p-0 text-upi-blue hover:text-purple-600 transition-colors duration-300"
                    >
                      Try it now
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Footer */}
      <footer className="border-t border-white/20 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 py-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-upi-blue" />
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                CodeCashier - Premium UPI Payment Platform
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Created with ❤️ by Muhammed Adnan
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>© 2024 CodeCashier</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
