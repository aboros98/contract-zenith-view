
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
    <div className="min-h-screen bg-background">
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Drop your contract here
            </h3>
            <p className="text-muted-foreground">
              Release to start analysis
            </p>
          </div>
        </div>
      )}

      {/* Analysis overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 glass flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-12 h-12 mx-auto mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary pulse-soft" />
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-primary/30 border-t-primary animate-spin"></div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Analyzing Contract
            </h3>
            <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="text-sm text-muted-foreground">AI is reading your document...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">Dobi</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div 
        className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-full max-w-3xl text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
              AI-Powered Contract
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Analysis</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              Upload your legal documents and get instant compliance insights with detailed AI analysis
            </p>
          </div>

          {/* Upload area */}
          <Card className="card-premium border-2 border-dashed border-border max-w-md mx-auto mb-8">
            <CardContent className="p-6">
              <div
                className="cursor-pointer rounded-lg p-6 text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Upload Contract
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF, Word, or text documents up to 10MB
                </p>
                <Button className="btn-premium">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 rounded-xl glass-card">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Lightning Fast</h3>
              <p className="text-xs text-muted-foreground">Get results in seconds</p>
            </div>
            
            <div className="text-center p-4 rounded-xl glass-card">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">AI Accuracy</h3>
              <p className="text-xs text-muted-foreground">99%+ accuracy rate</p>
            </div>
            
            <div className="text-center p-4 rounded-xl glass-card">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Secure & Private</h3>
              <p className="text-xs text-muted-foreground">Enterprise security</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>Enterprise security • GDPR compliant • SOC 2 certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
