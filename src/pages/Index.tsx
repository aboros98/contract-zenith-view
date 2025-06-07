
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Shield, BarChart3, Clock, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    if (!file) return;
    
    setIsUploading(true);
    console.log("File uploaded:", file.name);
    
    // Simulate upload process
    setTimeout(() => {
      // Store file info for dashboard
      localStorage.setItem('processingFile', JSON.stringify({
        name: file.name,
        size: file.size,
        uploadTime: Date.now(),
        progress: 0,
        status: 'processing'
      }));
      
      navigate("/dashboard");
    }, 1000);
  };

  const features = [
    {
      icon: Shield,
      title: "Compliance Check",
      description: "Ensure contracts meet regulatory standards with automated compliance checks.",
      color: "text-electric-green"
    },
    {
      icon: BarChart3,
      title: "Risk Assessment",
      description: "Identify potential risks and liabilities before they become problems.",
      color: "text-electric-amber"
    },
    {
      icon: Clock,
      title: "Timeline Analysis",
      description: "Track key dates and deadlines to manage contract lifecycle effectively.",
      color: "text-electric-blue"
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Upload Contract",
      description: "Drag and drop your contract document into the platform.",
      icon: Upload,
      color: "bg-electric-blue"
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our AI algorithms analyze the contract for key insights.",
      icon: Sparkles,
      color: "bg-electric-amber"
    },
    {
      step: 3,
      title: "Receive Report",
      description: "Get a detailed report with compliance, risks, and timeline analysis.",
      icon: CheckCircle,
      color: "bg-electric-green"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warm-gray-50 to-background">
      {/* Full-screen drag overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 bg-primary/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300"
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

      {/* Enhanced Header */}
      <header className="border-b border-warm-gray-200 glass-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-foreground tracking-tight">Dobi</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-warm-gray-600 hover:text-foreground">
                Features
              </Button>
              <Button variant="ghost" size="sm" className="text-warm-gray-600 hover:text-foreground">
                About
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:shadow-premium-md">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 px-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 tracking-tight leading-tight">
              Intelligent Contract
              <span className="block bg-gradient-primary bg-clip-text text-transparent">Analysis Platform</span>
            </h1>
            <p className="text-xl text-warm-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your legal documents with AI-powered analysis. Get instant compliance insights, 
              risk assessments, and detailed clause breakdowns.
            </p>
          </div>

          {/* Enhanced Upload Interface */}
          <div className="max-w-md mx-auto mb-16">
            {!showUploadZone ? (
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-premium-xl transition-all duration-300 px-8 py-4 text-lg font-medium"
                  onClick={() => setShowUploadZone(true)}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-3" />
                      Analyze Contract
                    </>
                  )}
                </Button>
                <p className="text-sm text-warm-gray-500 mt-4">
                  Or drag and drop your document anywhere on this page
                </p>
              </div>
            ) : (
              <Card className="card-premium border-2 border-dashed border-primary/30 bg-primary/5">
                <CardContent className="p-8">
                  <div
                    className="cursor-pointer rounded-xl p-6 text-center transition-all duration-300 hover:bg-primary/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Choose your file
                    </h3>
                    <p className="text-warm-gray-600 mb-4">
                      Upload PDF or Word document for analysis
                    </p>
                    <Button size="lg" className="bg-gradient-primary px-6" disabled={isUploading}>
                      {isUploading ? "Processing..." : "Browse Files"}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileSelect}
                      disabled={isUploading}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-300 shadow-premium group-hover:shadow-premium-md`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-warm-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Enhanced Process Overview */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-12 tracking-tight">
              How it Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-premium-md transition-all duration-300`}>
                    <span className="text-lg font-bold">{step.step}</span>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-300 shadow-premium group-hover:shadow-premium-md">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
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
