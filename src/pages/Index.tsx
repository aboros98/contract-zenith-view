
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
    
    setTimeout(() => {
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
      description: "Automated compliance verification against regulatory standards with detailed reporting."
    },
    {
      icon: BarChart3,
      title: "Risk Assessment",
      description: "AI-powered risk analysis to identify potential liabilities and legal exposures."
    },
    {
      icon: Clock,
      title: "Fast Analysis",
      description: "Get comprehensive contract insights in minutes, not hours or days."
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Upload Contract",
      description: "Drag and drop your contract document into our secure platform.",
      icon: Upload
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Advanced algorithms analyze compliance, risks, and key provisions.",
      icon: Sparkles
    },
    {
      step: 3,
      title: "Review Results",
      description: "Access detailed analysis with actionable insights and recommendations.",
      icon: CheckCircle
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Full-screen drag overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 bg-primary/5 backdrop-blur-md flex items-center justify-center"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-charcoal mb-2">
              Drop your contract here
            </h3>
            <p className="text-gray-600">
              Release to start analysis
            </p>
          </div>
        </div>
      )}

      {/* Professional Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-semibold text-charcoal">Dobi</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-charcoal">
                Features
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-charcoal">
                About
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground shadow-sm">
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
            <h1 className="text-5xl md:text-6xl font-light text-charcoal mb-6 leading-tight tracking-tight">
              Professional Contract
              <span className="block text-primary font-medium">Analysis Platform</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform legal document review with AI-powered analysis. Get instant compliance insights, 
              risk assessments, and detailed clause breakdowns for faster decision-making.
            </p>
          </div>

          {/* Upload Interface */}
          <div className="max-w-md mx-auto mb-16">
            {!showUploadZone ? (
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground px-8 py-4 text-lg font-medium shadow-sm transition-all duration-200"
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
                <p className="text-sm text-gray-500 mt-4">
                  Or drag and drop your document anywhere on this page
                </p>
              </div>
            ) : (
              <Card className="bg-white border-2 border-dashed border-primary/30 shadow-sm">
                <CardContent className="p-8">
                  <div
                    className="cursor-pointer p-6 text-center transition-all duration-200"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">
                      Choose your file
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Upload PDF or Word document for analysis
                    </p>
                    <Button size="lg" className="bg-primary text-primary-foreground px-6" disabled={isUploading}>
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

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Process Overview */}
          <div>
            <h2 className="text-3xl font-light text-charcoal mb-12">
              How it Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <span className="text-lg font-bold">{step.step}</span>
                  </div>
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
