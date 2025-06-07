
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Shield, BarChart3, CheckCircle, Clock, AlertTriangle } from "lucide-react";
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
    // Handle file upload logic here
    navigate("/dashboard");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-medium text-foreground">ContractIQ</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a>
              <Button variant="outline" size="sm">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-light text-foreground mb-6 leading-tight">
            Intelligent Contract
            <br />
            <span className="text-primary">Analysis</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed">
            Analyze legal documents with precision. Ensure compliance, identify risks, 
            and streamline your contract review process.
          </p>

          {/* Upload Zone */}
          <div 
            className={`relative max-w-xl mx-auto mb-20 p-12 border-2 border-dashed rounded-lg transition-all duration-200 ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/30"
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
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-foreground mb-2">Drop your contract here</p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
              <p className="text-xs text-muted-foreground mt-3">Supports PDF, DOC, DOCX</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="px-8 py-3 text-base"
            onClick={() => navigate("/dashboard")}
          >
            View Sample Analysis
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">Compliance Check</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatically verify contract clauses against legal requirements 
                and industry standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">Risk Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identify potential risks and liability issues with detailed 
                explanations and recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">Version Control</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track changes across contract versions and maintain complete 
                audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-light text-center text-foreground mb-16">
            Simple Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Upload", desc: "Upload your contract document" },
              { step: "2", title: "Analyze", desc: "AI processes and reviews content" },
              { step: "3", title: "Review", desc: "Examine findings and recommendations" },
              { step: "4", title: "Export", desc: "Generate reports and documentation" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-medium">
                  {item.step}
                </div>
                <h4 className="text-lg font-medium text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-border -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground">ContractIQ</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional contract analysis powered by AI
              </p>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-3">Product</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-3">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 ContractIQ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
