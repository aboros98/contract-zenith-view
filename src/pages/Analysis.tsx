
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  GitCompare,
  ExternalLink,
  Building,
  Scale,
  X,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const navigate = useNavigate();

  const contractData = {
    title: "Service Agreement Template v3.2",
    compliance: 92,
    totalClauses: 24,
    issues: 2,
    lastAnalyzed: "2024-01-15",
    metadata: {
      contractDate: "21.01.2025",
      parties: {
        provider: "NEWPORT SOLUTIONS S.R.L.",
        beneficiary: "AROBS TRANSILVANIA SOFTWARE S.A."
      },
      contractValue: "1850",
      currency: "EUR",
      duration: "Duration of training programs",
      contractObject: "Provision of training program - Python Course"
    }
  };

  const clauses = [
    {
      id: 1,
      number: "4.1",
      title: "Contract Value",
      text: "The total price of this contract is 1850 EUR (excluding VAT).",
      status: "compliant",
      compliance: 100,
      section: "4. CONTRACT VALUE",
      issues: 0,
      riskLevel: "low",
      startPosition: 580,
      endPosition: 650
    },
    {
      id: 2,
      number: "3.1",
      title: "Payment Terms",
      text: "Payment shall be due within 30 days of receipt of invoice, with late fees of 1.5% per month on overdue amounts.",
      status: "partial",
      compliance: 75,
      section: "3. PAYMENT TERMS",
      issues: 1,
      riskLevel: "medium",
      startPosition: 450,
      endPosition: 575
    },
    {
      id: 3,
      number: "5.1",
      title: "Termination",
      text: "Either party may terminate this Agreement with 30 days written notice.",
      status: "non-compliant",
      compliance: 40,
      section: "5. TERMINATION",
      issues: 2,
      riskLevel: "high",
      startPosition: 680,
      endPosition: 750
    },
    {
      id: 4,
      number: "2.1",
      title: "Service Specifications",
      text: "The Contractor shall provide the Services in accordance with the specifications set forth in Schedule A and any applicable industry standards.",
      status: "compliant",
      compliance: 95,
      section: "2. SCOPE OF SERVICES",
      issues: 0,
      riskLevel: "low",
      startPosition: 280,
      endPosition: 440
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-emerald-500/30 bg-emerald-50/80 backdrop-blur-sm";
      case "partial": return "border-amber-500/30 bg-amber-50/80 backdrop-blur-sm";
      case "non-compliant": return "border-red-500/30 bg-red-50/80 backdrop-blur-sm";
      default: return "border-gray-300/30 bg-gray-50/80 backdrop-blur-sm";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-emerald-100/90 text-emerald-800 border-emerald-200/50";
      case "partial": return "bg-amber-100/90 text-amber-800 border-amber-200/50";
      case "non-compliant": return "bg-red-100/90 text-red-800 border-red-200/50";
      default: return "bg-gray-100/90 text-gray-800 border-gray-200/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return CheckCircle;
      case "partial": return AlertTriangle;
      case "non-compliant": return X;
      default: return Clock;
    }
  };

  const getClauseHighlight = (status: string) => {
    switch (status) {
      case "compliant": return "bg-emerald-100/40 border-l-4 border-emerald-500";
      case "partial": return "bg-amber-100/40 border-l-4 border-amber-500";
      case "non-compliant": return "bg-red-100/40 border-l-4 border-red-500";
      default: return "bg-gray-100/40 border-l-4 border-gray-500";
    }
  };

  const handleClauseClick = (clauseId: number) => {
    setSelectedClause(selectedClause === clauseId ? null : clauseId);
  };

  const selectedClauseData = clauses.find(c => c.id === selectedClause);

  const renderDocumentWithClauses = () => {
    const fullText = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on January 21, 2025, between NEWPORT SOLUTIONS S.R.L. ("Provider") and AROBS TRANSILVANIA SOFTWARE S.A. ("Beneficiary").

1. DEFINITIONS AND INTERPRETATION

1.1 In this Agreement, unless the context otherwise requires, the following terms shall have the meanings set forth below:

1.2 "Services" means the professional consulting services to be provided by the Contractor as described in Schedule A.

2. SCOPE OF SERVICES

2.1 The Contractor shall provide the Services in accordance with the specifications set forth in Schedule A and any applicable industry standards.

2.2 All Services shall be performed in a professional and workmanlike manner consistent with industry best practices.

3. PAYMENT TERMS

3.1 Payment shall be due within 30 days of receipt of invoice, with late fees of 1.5% per month on overdue amounts.

4. CONTRACT VALUE

4.1 The total price of this contract is 1850 EUR (excluding VAT).

5. TERMINATION

5.1 Either party may terminate this Agreement with 30 days written notice.

6. GOVERNING LAW

6.1 This Agreement shall be governed by Romanian law.`;

    return (
      <div className="relative">
        {/* Document Text */}
        <div className="font-mono text-sm leading-8 text-foreground whitespace-pre-wrap tracking-wide">
          {fullText.split('\n').map((line, lineIndex) => {
            // Check if this line contains a clause
            const clauseInLine = clauses.find(clause => 
              line.includes(clause.text) || line.includes(clause.number)
            );
            
            if (clauseInLine) {
              return (
                <div key={lineIndex} className="relative group">
                  <div 
                    className={`p-4 my-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${getClauseHighlight(clauseInLine.status)}`}
                    onClick={() => handleClauseClick(clauseInLine.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs font-mono bg-white/80 backdrop-blur-sm">
                        {clauseInLine.number}
                      </Badge>
                      <div className={`text-sm font-bold ${
                        clauseInLine.compliance >= 95 ? 'text-emerald-600' :
                        clauseInLine.compliance >= 75 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {clauseInLine.compliance}%
                      </div>
                    </div>
                    <div className="text-foreground">{line}</div>
                    
                    {/* Floating Clause Card */}
                    <Card className={`absolute right-0 top-0 w-80 shadow-lg border-l-4 ${getStatusColor(clauseInLine.status)} opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-xs font-mono border-border">
                              {clauseInLine.number}
                            </Badge>
                            <div className={`w-3 h-3 rounded-full ${
                              clauseInLine.status === 'compliant' ? 'bg-emerald-500' :
                              clauseInLine.status === 'partial' ? 'bg-amber-500' : 'bg-red-500'
                            }`}></div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              clauseInLine.compliance >= 95 ? 'text-emerald-600' :
                              clauseInLine.compliance >= 75 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {clauseInLine.compliance}%
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-foreground mb-2">{clauseInLine.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{clauseInLine.text}</p>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                          <Badge className={`text-xs border ${getStatusBadgeColor(clauseInLine.status)}`}>
                            {clauseInLine.status.replace('-', ' ')}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            }
            
            return <div key={lineIndex} className="leading-8">{line}</div>;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <header className="bg-card/95 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-full px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="text-muted-foreground hover:text-foreground transition-colors rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="text-sm text-muted-foreground font-mono">
                contracts › agreements › analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-border rounded-xl backdrop-blur-sm">
                <GitCompare className="w-4 h-4 mr-2" />
                Compare
              </Button>
              <Button variant="outline" size="sm" className="border-border rounded-xl backdrop-blur-sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Main Document View */}
        <div className="flex-1 flex flex-col">
          {/* Document Metadata */}
          <div className="bg-card/80 border-b border-border/50 px-12 py-8 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-light text-foreground mb-3 tracking-tight">
                  {contractData.title}
                </h1>
                <div className="flex items-center space-x-8 text-sm text-muted-foreground font-mono">
                  <span className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    {contractData.metadata.contractValue} {contractData.metadata.currency}
                  </span>
                  <span>{contractData.totalClauses} sections</span>
                  <span>analyzed {contractData.lastAnalyzed}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-light text-foreground mb-3">
                  {contractData.compliance}%
                </div>
                <Progress value={contractData.compliance} className="w-32 mb-2" />
                <div className="text-sm text-muted-foreground font-mono">
                  compliance score
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Contract Document */}
          <div className="flex-1 overflow-y-auto bg-card/30 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-12 py-12">
              {renderDocumentWithClauses()}
            </div>
          </div>
        </div>

        {/* Premium Analysis Panel */}
        {selectedClauseData && (
          <div className="w-96 bg-card/95 backdrop-blur-xl border-l border-border/50 flex flex-col shadow-2xl animate-slide-in-right">
            {/* Premium Panel Header */}
            <div className="px-8 py-6 border-b border-border/30 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="text-xs font-mono border-border/50 bg-white/80 backdrop-blur-sm">
                      {selectedClauseData.number}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full shadow-sm ${
                      selectedClauseData.status === 'compliant' ? 'bg-emerald-500' :
                      selectedClauseData.status === 'partial' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg tracking-tight">
                    {selectedClauseData.title}
                  </h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedClause(null)}
                  className="text-muted-foreground hover:text-foreground rounded-xl"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-3xl font-light text-foreground">
                {selectedClauseData.compliance}%
              </div>
            </div>

            {/* Premium Panel Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-card/60 to-card/80 backdrop-blur-xl">
              {/* Clause Text */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Clause Text
                </p>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-border/30 shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed">
                    "{selectedClauseData.text}"
                  </p>
                </div>
              </div>

              {/* Analysis Summary */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  Analysis
                </p>
                <div className="space-y-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-border/30">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Compliance</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedClauseData.compliance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {selectedClauseData.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground">Issues</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedClauseData.issues}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  Legal Assessment
                </p>
                <div className="space-y-6">
                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-border/30">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      Compliance
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      This clause meets Romanian Civil Code requirements for price determination under Art. 1660. 
                      The pricing structure is clearly defined and legally enforceable.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-border/30">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      Risk Assessment
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Low risk profile. No significant legal vulnerabilities identified. 
                      Standard commercial terms apply.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-border/30">
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      Recommendations
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      No immediate changes required. Consider adding inflation adjustment clause 
                      for contracts exceeding 12 months duration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium Actions */}
              <div className="pt-6 border-t border-border/30 space-y-3">
                <Button variant="outline" size="sm" className="w-full border-border/50 justify-start rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Legal References
                </Button>
                <Button variant="outline" size="sm" className="w-full border-border/50 justify-start rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80">
                  <Scale className="w-4 h-4 mr-2" />
                  Compare Standards
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .animate-slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Analysis;
