
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Shield, BarChart3, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Only hide drag state if leaving the entire viewport
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
    navigate("/dashboard");
  };

  const features = [
    {
      icon: Shield,
      title: "Compliance Check",
      description: "Ensure contracts meet regulatory standards with automated compliance checks.",
    },
    {
      icon: BarChart3,
      title: "Risk Assessment",
      description: "Identify potential risks and liabilities before they become problems.",
    },
    {
      icon: Clock,
      title: "Timeline Analysis",
      description: "Track key dates and deadlines to manage contract lifecycle effectively.",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Upload Contract",
      description: "Drag and drop your contract document into the platform.",
      icon: Upload,
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our AI algorithms analyze the contract for key insights.",
      icon: FileText,
    },
    {
      step: 3,
      title: "Receive Report",
      description: "Get a detailed report with compliance, risks, and timeline analysis.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warm-gray-50 to-background">
      {/* Full-screen drag overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 bg-primary/5 backdrop-blur-sm flex items-center justify-center transition-premium"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Drop your contract here
            </h3>
            <p className="text-warm-gray-600">
              Release to start analysis
            </p>
          </div>
        </div>
      )}

      {/* Premium Header */}
      <header className="border-b border-warm-gray-200 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold text-foreground tracking-tight">Dobi</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-warm-gray-600 hover:text-foreground transition-premium">
                Features
              </Button>
              <Button variant="ghost" size="sm" className="text-warm-gray-600 hover:text-foreground transition-premium">
                About
              </Button>
              <Button size="sm" className="shadow-premium bg-gradient-primary border-0 hover:shadow-premium-md transition-premium">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-24 px-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-display-lg font-serif font-bold text-foreground mb-6 tracking-tight leading-tight">
              Intelligent Contract
              <span className="block text-gradient">Analysis Platform</span>
            </h1>
            <p className="text-xl text-warm-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Transform your legal documents with AI-powered analysis. Get instant compliance insights, 
              risk assessments, and detailed clause breakdowns.
            </p>
          </div>

          {/* Minimalist Upload Interface */}
          <div className="max-w-xl mx-auto mb-16">
            {!showUploadZone ? (
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="shadow-premium-lg bg-gradient-primary border-0 hover:shadow-premium-xl transition-premium px-12 py-6 text-lg font-medium"
                  onClick={() => setShowUploadZone(true)}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Analyze Contract
                </Button>
                <p className="text-sm text-warm-gray-500 mt-4">
                  Or drag and drop your document anywhere on this page
                </p>
              </div>
            ) : (
              <Card className="border-2 border-dashed border-primary/30 bg-primary/5 shadow-premium-lg hover:shadow-premium-xl transition-premium">
                <CardContent className="p-12">
                  <div
                    className="cursor-pointer rounded-xl p-8 text-center transition-premium hover:bg-primary/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Choose your file
                    </h3>
                    <p className="text-warm-gray-600 mb-6 leading-relaxed">
                      Upload PDF or Word document for analysis
                    </p>
                    <Button size="lg" className="shadow-premium bg-gradient-primary border-0 px-8">
                      Browse Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-premium shadow-premium group-hover:shadow-premium-md">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-warm-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Process Overview */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8 tracking-tight">
              How it Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-premium group-hover:shadow-premium-md transition-premium">
                    <span className="text-lg font-semibold">{step.step}</span>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-premium shadow-premium group-hover:shadow-premium-md">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-warm-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
