
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Upload, Shield, BarChart3, Clock, ArrowRight, CheckCircle, Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragActive(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFile(files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    console.log("File uploaded:", file.name);
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      navigate("/analysis");
    }, 2000);
  };

  const handleDemoStart = () => {
    setShowDemo(true);
    setIsAnalyzing(true);
    // Simulate demo analysis
    setTimeout(() => {
      navigate("/analysis");
    }, 3000);
  };

  const features = [
    {
      icon: Shield,
      title: "AI Compliance Analysis",
      description: "Advanced algorithms detect regulatory compliance issues and suggest improvements in real-time.",
    },
    {
      icon: BarChart3,
      title: "Risk Assessment",
      description: "Comprehensive risk scoring with detailed breakdown of potential liabilities and mitigation strategies.",
    },
    {
      icon: Clock,
      title: "Smart Timeline Tracking",
      description: "Automated deadline detection and milestone tracking to ensure contract lifecycle management.",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Upload Contract",
      description: "Securely upload your contract document through our encrypted platform.",
      icon: Upload,
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our advanced AI processes every clause, term, and condition with legal precision.",
      icon: Sparkles,
    },
    {
      step: 3,
      title: "Detailed Report",
      description: "Receive comprehensive insights with compliance scores, risk analysis, and recommendations.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pattern-dots">
      {/* Full-screen drag overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 bg-primary/10 backdrop-blur-sm flex items-center justify-center transition-premium"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center animate-fade-in-up">
            <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow-warm">
              <Upload className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-3xl font-serif font-semibold text-foreground mb-4">
              Drop your contract here
            </h3>
            <p className="text-xl text-warm-beige-600">
              Release to start intelligent analysis
            </p>
          </div>
        </div>
      )}

      {/* Analysis overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-glow-warm">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
              Analyzing Contract
            </h3>
            <div className="flex items-center justify-center space-x-2 text-warm-beige-600">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="mt-4 text-warm-beige-600">AI is processing your document...</p>
          </div>
        </div>
      )}

      {/* Premium Header */}
      <header className="border-b border-warm-beige-200 glass-beige sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-gradient-bronze tracking-tight">Dobi</span>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="text-warm-beige-600 hover:text-foreground transition-premium">
                Features
              </Button>
              <Button variant="ghost" size="sm" className="text-warm-beige-600 hover:text-foreground transition-premium">
                About
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="shadow-premium bg-gradient-primary border-0 hover:shadow-premium-md transition-premium">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-gradient-card border-warm-beige-200">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                      Experience Dobi in Action
                    </h3>
                    <p className="text-warm-beige-600 mb-8 leading-relaxed">
                      See how our AI analyzes a sample service agreement with real compliance insights and risk assessments.
                    </p>
                    <Button 
                      onClick={handleDemoStart}
                      className="w-full shadow-premium bg-gradient-primary border-0 hover:shadow-premium-md transition-premium"
                    >
                      Start Demo Analysis
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-32 px-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-bronze-100 rounded-full opacity-30 animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-terracotta-100 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-bronze-200 rounded-full opacity-25 animate-float" style={{ animationDelay: '4s' }} />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="animate-fade-in-up">
              <h1 className="text-display-lg font-serif font-bold text-foreground mb-8 tracking-tight leading-tight">
                Transform Legal
                <span className="block text-gradient-bronze">Analysis with AI</span>
              </h1>
              <p className="text-xl text-warm-beige-600 mb-12 leading-relaxed">
                Revolutionary contract analysis powered by advanced AI. Get instant compliance insights, 
                comprehensive risk assessments, and detailed clause breakdowns in minutes, not hours.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="shadow-premium-lg bg-gradient-primary border-0 hover:shadow-premium-xl transition-premium px-8 py-6 text-lg font-medium hover-lift"
                  onClick={() => setShowUploadZone(true)}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Start Analysis
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-2 border-warm-beige-300 hover:border-primary/50 bg-transparent hover:bg-primary/5 px-8 py-6 text-lg font-medium transition-premium"
                    >
                      <Play className="w-5 h-5 mr-3" />
                      Watch Demo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-gradient-card border-warm-beige-200">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                        Experience Dobi in Action
                      </h3>
                      <p className="text-warm-beige-600 mb-8 leading-relaxed">
                        See how our AI analyzes a sample service agreement with real compliance insights and risk assessments.
                      </p>
                      <Button 
                        onClick={handleDemoStart}
                        className="w-full shadow-premium bg-gradient-primary border-0 hover:shadow-premium-md transition-premium"
                      >
                        Start Demo Analysis
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="text-sm text-warm-beige-500">
                <span className="inline-flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Enterprise-grade security
                </span>
                <span className="mx-4">•</span>
                <span>GDPR compliant</span>
                <span className="mx-4">•</span>
                <span>SOC 2 certified</span>
              </p>
            </div>

            {/* Right Column - Upload Interface */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {!showUploadZone ? (
                <Card className="border-2 border-dashed border-primary/30 bg-gradient-card shadow-premium-xl hover:shadow-premium-2xl transition-premium hover-lift pattern-grid">
                  <CardContent className="p-12 text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <FileText className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      Ready to Transform Your Workflow?
                    </h3>
                    <p className="text-warm-beige-600 mb-8 leading-relaxed">
                      Drag and drop your contract anywhere on this page or click below to get started
                    </p>
                    <Button 
                      size="lg" 
                      className="shadow-premium bg-gradient-primary border-0 hover:shadow-premium-md transition-premium px-8"
                      onClick={() => setShowUploadZone(true)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-dashed border-primary/50 bg-primary/5 shadow-premium-xl hover:shadow-premium-2xl transition-premium">
                  <CardContent className="p-12">
                    <div
                      className="cursor-pointer rounded-2xl p-12 text-center transition-premium hover:bg-primary/10 border-2 border-dashed border-primary/30"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-glow-warm">
                        <Upload className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                        Upload Your Contract
                      </h3>
                      <p className="text-warm-beige-600 mb-8 leading-relaxed">
                        Supports PDF, Word, and text documents up to 10MB
                      </p>
                      <Button size="lg" className="shadow-premium bg-gradient-primary border-0 px-12 hover:shadow-premium-md transition-premium">
                        Choose File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-display-sm font-serif font-bold text-foreground mb-6 tracking-tight">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-warm-beige-600 max-w-3xl mx-auto leading-relaxed">
              Our proprietary AI technology combines legal expertise with machine learning 
              to deliver unprecedented accuracy in contract analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-warm-beige-200 shadow-premium-lg hover:shadow-premium-xl transition-premium hover-lift group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-premium shadow-premium group-hover:shadow-premium-md">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-warm-beige-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-display-sm font-serif font-bold text-foreground mb-6 tracking-tight">
              How Dobi Works
            </h2>
            <p className="text-xl text-warm-beige-600 max-w-3xl mx-auto leading-relaxed">
              From upload to insights in three simple steps. Our AI handles the complexity 
              while you focus on making informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary text-white flex items-center justify-center mx-auto shadow-premium group-hover:shadow-premium-md transition-premium">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-warm-beige-300 transform -translate-y-1/2" />
                  )}
                </div>
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-premium shadow-premium group-hover:shadow-premium-md">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-warm-beige-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-beige-200 bg-gradient-card py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold text-gradient-bronze">Dobi</span>
          </div>
          <p className="text-warm-beige-600 mb-6">
            Transforming legal analysis through artificial intelligence
          </p>
          <div className="flex justify-center space-x-6 text-sm text-warm-beige-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
