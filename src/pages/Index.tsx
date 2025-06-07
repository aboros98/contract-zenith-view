
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Shield, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [dragActive, setDragActive] = useState(false);
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
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Drag overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 glass flex items-center justify-center"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center animate-scale-in">
            <div className="icon-container w-24 h-24 mx-auto mb-8">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-heading text-slate-900 mb-4">
              Drop your contract here
            </h3>
            <p className="text-lg text-slate-600">
              Release to start analysis
            </p>
          </div>
        </div>
      )}

      {/* Analysis overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 glass flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="icon-container w-20 h-20">
                <Upload className="w-10 h-10 text-primary pulse-soft" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
            </div>
            <h3 className="text-heading text-slate-900 mb-6">
              Analyzing Contract
            </h3>
            <div className="flex items-center justify-center space-x-2 text-slate-600 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="text-slate-600">AI is reading your document...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="icon-container-sm">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Dobi</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div 
        className="flex items-center justify-center min-h-[calc(100vh-100px)] px-8"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-full max-w-4xl text-center">
          <div className="mb-16 animate-fade-in">
            <h1 className="text-display text-slate-900 mb-8 tracking-tight">
              AI-Powered Contract
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Analysis</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Upload your legal documents and get instant compliance insights with detailed AI analysis
            </p>
          </div>

          {/* Upload area */}
          <Card className="card-premium border-2 border-dashed border-slate-200/60 bg-white/50 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-16">
              <div
                className="cursor-pointer rounded-2xl p-12 text-center transition-all duration-300 hover:bg-white/70 group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="icon-container w-20 h-20 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-heading text-slate-900 mb-4">
                  Upload Contract
                </h3>
                <p className="text-slate-600 mb-10 text-lg">
                  PDF, Word, or text documents up to 10MB
                </p>
                <Button className="btn-premium text-lg px-10 py-4">
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

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40">
              <div className="icon-container mx-auto mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-subheading text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600">Get results in seconds, not hours</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40">
              <div className="icon-container mx-auto mb-6">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-subheading text-slate-900 mb-3">AI Accuracy</h3>
              <p className="text-slate-600">Advanced AI with 99%+ accuracy rate</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40">
              <div className="icon-container mx-auto mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-subheading text-slate-900 mb-3">Secure & Private</h3>
              <p className="text-slate-600">Enterprise-grade security standards</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-12 text-sm text-slate-500">
            <Shield className="w-5 h-5" />
            <span>Enterprise security • GDPR compliant • SOC 2 certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
