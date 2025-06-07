
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Drag overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 glass flex items-center justify-center"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="icon-container w-20 h-20 mx-auto mb-6">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">
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
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="icon-container w-16 h-16">
                <Upload className="w-8 h-8 text-primary pulse-soft" />
              </div>
              <div className="absolute inset-0 rounded-full border-3 border-primary/20 border-t-primary animate-spin"></div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Analyzing Contract
            </h3>
            <div className="flex items-center justify-center space-x-2 text-slate-600 mb-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="text-slate-600">AI is reading your document...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="icon-container-sm">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-semibold text-slate-900">Dobi</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div 
        className="flex items-center justify-center min-h-[calc(100vh-100px)] px-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-full max-w-4xl text-center">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              AI-Powered Contract
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Analysis</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Upload your legal documents and get instant compliance insights with detailed AI analysis
            </p>
          </div>

          {/* Upload area */}
          <Card className="card-premium border-2 border-dashed border-slate-300 bg-white/80 max-w-xl mx-auto">
            <CardContent className="p-8">
              <div
                className="cursor-pointer rounded-xl p-8 text-center transition-colors duration-200 hover:bg-white/90"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="icon-container w-16 h-16 mx-auto mb-6">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Upload Contract
                </h3>
                <p className="text-slate-600 mb-6">
                  PDF, Word, or text documents up to 10MB
                </p>
                <Button className="btn-premium px-8 py-3">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/60 border border-slate-200/60">
              <div className="icon-container mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600">Get results in seconds, not hours</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white/60 border border-slate-200/60">
              <div className="icon-container mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Accuracy</h3>
              <p className="text-slate-600">Advanced AI with 99%+ accuracy rate</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white/60 border border-slate-200/60">
              <div className="icon-container mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure & Private</h3>
              <p className="text-slate-600">Enterprise-grade security standards</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8 text-sm text-slate-500">
            <Shield className="w-4 h-4" />
            <span>Enterprise security • GDPR compliant • SOC 2 certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
