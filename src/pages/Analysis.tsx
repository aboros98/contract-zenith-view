
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  MessageSquare, 
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

  const fullContractText = `SERVICE AGREEMENT

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
      riskLevel: "low"
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
      riskLevel: "medium"
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
      riskLevel: "high"
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
      riskLevel: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-emerald-500 bg-emerald-50";
      case "partial": return "border-amber-500 bg-amber-50";
      case "non-compliant": return "border-red-500 bg-red-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-emerald-100 text-emerald-800";
      case "partial": return "bg-amber-100 text-amber-800";
      case "non-compliant": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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

  const handleClauseClick = (clauseId: number) => {
    setSelectedClause(selectedClause === clauseId ? null : clauseId);
  };

  const selectedClauseData = clauses.find(c => c.id === selectedClause);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="max-w-full px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <div className="text-sm text-muted-foreground font-mono">
                contracts › agreements › analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-border">
                <GitCompare className="w-4 h-4 mr-2" />
                Compare
              </Button>
              <Button variant="outline" size="sm" className="border-border">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Main Document View */}
        <div className="flex-1 flex flex-col">
          {/* Document Metadata */}
          <div className="bg-card border-b border-border px-12 py-8">
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

          {/* Two-column Layout: Contract + Clause Cards */}
          <div className="flex-1 flex overflow-hidden">
            {/* Contract Document */}
            <div className="flex-[2] overflow-y-auto bg-card border-r border-border">
              <div className="max-w-3xl mx-auto px-12 py-12">
                <div className="font-mono text-sm leading-7 text-foreground whitespace-pre-wrap tracking-wide">
                  {fullContractText}
                </div>
              </div>
            </div>

            {/* Floating Clause Cards */}
            <div className="flex-1 bg-gray-50/50 p-6 overflow-y-auto">
              <div className="sticky top-0 bg-gray-50/50 pb-4 mb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-foreground mb-2">Key Clauses</h3>
                <p className="text-sm text-muted-foreground">Click to analyze</p>
              </div>
              
              <div className="space-y-4">
                {clauses.map((clause) => {
                  const StatusIcon = getStatusIcon(clause.status);
                  return (
                    <Card 
                      key={clause.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 ${getStatusColor(clause.status)}`}
                      onClick={() => handleClauseClick(clause.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="text-xs font-mono">
                              {clause.number}
                            </Badge>
                            <StatusIcon className={`w-4 h-4 ${
                              clause.status === 'compliant' ? 'text-emerald-500' :
                              clause.status === 'partial' ? 'text-amber-500' : 'text-red-500'
                            }`} />
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${
                              clause.compliance >= 95 ? 'text-emerald-600' :
                              clause.compliance >= 75 ? 'text-amber-600' : 'text-red-600'
                            }`}>
                              {clause.compliance}%
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="font-semibold text-foreground mb-2">{clause.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{clause.text}</p>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                          <Badge className={`text-xs ${getStatusBadgeColor(clause.status)}`}>
                            {clause.status.replace('-', ' ')}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        {selectedClauseData && (
          <div className="w-96 bg-card border-l border-border flex flex-col animate-slide-in-right">
            {/* Panel Header */}
            <div className="px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="text-xs font-mono border-border">
                      {selectedClauseData.number}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full ${
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
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-2xl font-light text-foreground">
                {selectedClauseData.compliance}%
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Clause Text */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Clause Text
                </p>
                <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg border border-border">
                  "{selectedClauseData.text}"
                </p>
              </div>

              {/* Analysis Summary */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  Analysis
                </p>
                <div className="space-y-4">
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
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      Compliance
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      This clause meets Romanian Civil Code requirements for price determination under Art. 1660. 
                      The pricing structure is clearly defined and legally enforceable.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      Risk Assessment
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Low risk profile. No significant legal vulnerabilities identified. 
                      Standard commercial terms apply.
                    </p>
                  </div>
                  
                  <div>
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

              {/* Actions */}
              <div className="pt-6 border-t border-border space-y-3">
                <Button variant="outline" size="sm" className="w-full border-border justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Legal References
                </Button>
                <Button variant="outline" size="sm" className="w-full border-border justify-start">
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
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
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
