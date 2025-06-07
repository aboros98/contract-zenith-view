
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Shield } from "lucide-react";
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
          className="fixed inset-0 z-50 bg-primary/5 backdrop-blur-sm flex items-center justify-center"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-medium text-charcoal mb-3">
              Drop your contract here
            </h3>
            <p className="text-lg text-slate">
              Release to start analysis
            </p>
          </div>
        </div>
      )}

      {/* Analysis overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-medium text-charcoal mb-4">
              Uploading Contract
            </h3>
            <div className="flex items-center justify-center space-x-1 text-slate mb-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="text-slate">Preparing your document...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-soft bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-medium text-charcoal tracking-tight">Dobi</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div 
        className="flex items-center justify-center min-h-[calc(100vh-88px)] px-8"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-5xl font-medium text-charcoal mb-6 tracking-tight">
            AI Contract Analysis
          </h1>
          <p className="text-xl text-slate mb-16 leading-relaxed max-w-xl mx-auto">
            Upload your contract and get instant compliance insights with detailed legal analysis.
          </p>

          {/* Upload area */}
          <Card className="card-premium border-2 border-dashed border-soft bg-softer">
            <CardContent className="p-16">
              <div
                className="cursor-pointer rounded-lg p-12 text-center transition-colors duration-200 hover:bg-soft"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-3">
                  Upload Contract
                </h3>
                <p className="text-slate mb-8">
                  PDF, Word, or text documents up to 10MB
                </p>
                <Button className="btn-primary px-8 py-3">
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

          <p className="text-sm text-light-slate flex items-center justify-center gap-2 mt-8">
            <Shield className="w-4 h-4" />
            Enterprise security • GDPR compliant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
