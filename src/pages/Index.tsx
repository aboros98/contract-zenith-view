
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
    <div className="min-h-screen">
      {/* Full-screen drag overlay */}
      {dragActive && (
        <div 
          className="fixed inset-0 z-50 bg-primary/10 backdrop-blur-sm flex items-center justify-center"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Upload className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-3xl font-serif font-semibold text-navy-800 mb-4">
              Drop your contract here
            </h3>
            <p className="text-xl text-warm-600">
              Release to start intelligent analysis
            </p>
          </div>
        </div>
      )}

      {/* Analysis overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <Upload className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-navy-800 mb-4">
              Uploading Contract
            </h3>
            <div className="flex items-center justify-center space-x-2 text-warm-600">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="mt-4 text-warm-600">Preparing your document for analysis...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif font-bold text-gradient-gold tracking-tight">Dobi</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="py-32 px-8"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-display-lg font-serif font-bold text-navy-800 mb-8 tracking-tight leading-tight">
            Transform Legal Analysis with AI
          </h1>
          <p className="text-xl text-warm-700 mb-16 leading-relaxed max-w-3xl mx-auto">
            Revolutionary contract analysis powered by advanced AI. Get instant compliance insights, 
            comprehensive risk assessments, and detailed clause breakdowns in minutes, not hours.
          </p>

          {/* Upload Interface */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-dashed border-primary/30 bg-white shadow-premium-lg">
              <CardContent className="p-16">
                <div
                  className="cursor-pointer rounded-xl p-12 text-center border-2 border-dashed border-primary/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-navy-800 mb-4">
                    Upload Your Contract
                  </h3>
                  <p className="text-warm-600 mb-8 leading-relaxed">
                    Supports PDF, Word, and text documents up to 10MB
                  </p>
                  <Button size="lg" className="shadow-premium bg-primary text-white px-12">
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
          </div>

          <p className="text-sm text-warm-600 flex items-center justify-center gap-2 mt-8">
            <Shield className="w-4 h-4" />
            Enterprise-grade security • GDPR compliant • SOC 2 certified
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
