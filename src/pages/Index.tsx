
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Shield, BarChart3, CheckCircle, Clock, AlertTriangle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    navigate("/dashboard");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warm-gray-50 to-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium-md hover:shadow-premium-lg transition-premium">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold text-foreground tracking-tight">ContractIQ</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-warm-gray-600 hover:text-foreground transition-premium letter-spacing-wide">Features</a>
              <a href="#" className="text-sm font-medium text-warm-gray-600 hover:text-foreground transition-premium letter-spacing-wide">Pricing</a>
              <a href="#" className="text-sm font-medium text-warm-gray-600 hover:text-foreground transition-premium letter-spacing-wide">Support</a>
              <Button variant="outline" size="sm" className="hover-lift border-warm-gray-200 hover:border-primary/20">
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-card border border-warm-gray-200 rounded-full shadow-premium-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-warm-gray-700 letter-spacing-wide">AI-Powered Legal Analysis</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-foreground mb-8 leading-none tracking-tight">
            Intelligent
            <br />
            <span className="text-gradient">Contract Analysis</span>
          </h1>
          
          <p className="text-xl font-light text-warm-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            Transform your contract review process with precision AI analysis. 
            Ensure compliance, identify risks, and streamline legal workflows 
            with enterprise-grade intelligence.
          </p>

          {/* Premium Upload Zone */}
          <div className="max-w-2xl mx-auto mb-20">
            <div 
              className={`relative p-16 border-2 border-dashed rounded-2xl transition-premium group cursor-pointer ${
                dragActive 
                  ? "border-primary bg-primary/5 shadow-premium-lg scale-[1.02]" 
                  : "border-warm-gray-300 hover:border-primary/50 hover:bg-gradient-card hover:shadow-premium-md"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
              />
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium-md group-hover:shadow-premium-lg group-hover:scale-105 transition-premium">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Drop your contract here</h3>
                <p className="text-warm-gray-600 mb-4">or click to browse your files</p>
                <p className="text-sm text-warm-gray-500 letter-spacing-wide">Supports PDF, DOC, DOCX • Up to 50MB</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-base font-medium shadow-premium-lg hover:shadow-premium-xl hover-lift bg-gradient-primary border-0"
              onClick={() => navigate("/dashboard")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View Sample Analysis
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-base font-medium hover-lift border-warm-gray-200 hover:border-primary/20"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-gradient-muted relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6 tracking-tight">
              Sophisticated Analysis Tools
            </h2>
            <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
              Enterprise-grade contract intelligence that adapts to your legal requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group hover-lift">
              <div className="bg-gradient-card border border-warm-gray-200 rounded-2xl p-8 shadow-premium hover:shadow-premium-lg transition-premium">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-premium">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 font-serif">Compliance Verification</h3>
                <p className="text-warm-gray-600 leading-relaxed">
                  Automatically verify contract clauses against legal requirements 
                  and industry standards with real-time validation.
                </p>
              </div>
            </div>
            
            <div className="group hover-lift">
              <div className="bg-gradient-card border border-warm-gray-200 rounded-2xl p-8 shadow-premium hover:shadow-premium-lg transition-premium">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-premium">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 font-serif">Risk Intelligence</h3>
                <p className="text-warm-gray-600 leading-relaxed">
                  Identify potential risks and liability issues with detailed 
                  explanations, severity scoring, and actionable recommendations.
                </p>
              </div>
            </div>
            
            <div className="group hover-lift">
              <div className="bg-gradient-card border border-warm-gray-200 rounded-2xl p-8 shadow-premium hover:shadow-premium-lg transition-premium">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-premium">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 font-serif">Version Control</h3>
                <p className="text-warm-gray-600 leading-relaxed">
                  Track changes across contract versions with complete 
                  audit trails and collaborative review workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6 tracking-tight">
              Streamlined Workflow
            </h2>
            <p className="text-lg text-warm-gray-600 max-w-2xl mx-auto">
              From upload to insight in four simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Upload", desc: "Secure document upload with instant processing", icon: Upload },
              { step: "02", title: "Analyze", desc: "AI-powered analysis using legal expertise", icon: BarChart3 },
              { step: "03", title: "Review", desc: "Interactive review with detailed insights", icon: CheckCircle },
              { step: "04", title: "Export", desc: "Professional reports and documentation", icon: FileText }
            ].map((item, index) => (
              <div key={index} className="text-center relative group">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium-md group-hover:shadow-premium-lg group-hover:scale-105 transition-premium">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-warm-gray-100 border-2 border-white rounded-full flex items-center justify-center shadow-premium-sm">
                    <span className="text-xs font-bold text-warm-gray-600">{item.step}</span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3 font-serif">{item.title}</h4>
                <p className="text-sm text-warm-gray-600 leading-relaxed">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-warm-gray-300 to-transparent -translate-x-1/2 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-gray-200 bg-gradient-card py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="font-serif font-semibold text-foreground text-lg">ContractIQ</span>
              </div>
              <p className="text-warm-gray-600 leading-relaxed mb-6">
                Professional contract analysis powered by advanced AI technology
              </p>
              <div className="flex space-x-4">
                {/* Social links placeholder */}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-4 font-serif">Product</h5>
              <ul className="space-y-3 text-warm-gray-600">
                <li><a href="#" className="hover:text-foreground transition-premium">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-4 font-serif">Support</h5>
              <ul className="space-y-3 text-warm-gray-600">
                <li><a href="#" className="hover:text-foreground transition-premium">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-4 font-serif">Legal</h5>
              <ul className="space-y-3 text-warm-gray-600">
                <li><a href="#" className="hover:text-foreground transition-premium">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Compliance</a></li>
                <li><a href="#" className="hover:text-foreground transition-premium">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-warm-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-warm-gray-500 text-sm">
              © 2025 ContractIQ. All rights reserved.
            </p>
            <p className="text-warm-gray-500 text-sm mt-4 md:mt-0">
              Built with precision and care
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
