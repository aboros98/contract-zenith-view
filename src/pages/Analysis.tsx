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
  Search,
  Filter,
  X,
  ChevronRight
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
      riskLevel: "low",
      startPos: 845,
      endPos: 895
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
      startPos: 680,
      endPos: 780
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
      startPos: 920,
      endPos: 990
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
      startPos: 480,
      endPos: 620
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-emerald-500";
      case "partial": return "text-amber-500";
      case "non-compliant": return "text-red-500";
      default: return "text-muted-foreground";
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

  const renderContractWithIndicators = () => {
    let result = fullContractText;
    let offset = 0;

    const sortedClauses = [...clauses].sort((a, b) => a.startPos - b.startPos);

    sortedClauses.forEach(clause => {
      const beforeText = result.substring(0, clause.startPos + offset);
      const clauseText = clause.text;
      const afterText = result.substring(clause.startPos + offset + clauseText.length);

      const StatusIcon = getStatusIcon(clause.status);
      const wrappedClause = `<span class="clause-container" data-clause-id="${clause.id}">
        <span class="clause-indicator ${getStatusColor(clause.status)}" data-clause-id="${clause.id}">
          <svg class="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </span>
        <span class="clause-text ${selectedClause === clause.id ? 'selected' : ''}" data-clause-id="${clause.id}">${clauseText}</span>
      </span>`;

      result = beforeText + wrappedClause + afterText;
      offset += wrappedClause.length - clauseText.length;
    });

    return result;
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

            {/* Status Legend */}
            <div className="flex items-center space-x-8 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-muted-foreground">compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-muted-foreground">partial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-muted-foreground">non-compliant</span>
              </div>
            </div>
          </div>

          {/* Contract Document */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto bg-card">
              <div className="max-w-4xl mx-auto px-16 py-12">
                <div 
                  className="font-mono text-sm leading-7 text-foreground whitespace-pre-wrap tracking-wide"
                  dangerouslySetInnerHTML={{ __html: renderContractWithIndicators() }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const clauseId = target.getAttribute('data-clause-id');
                    if (clauseId) {
                      handleClauseClick(Number(clauseId));
                    }
                  }}
                />
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
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedClauseData.status).replace('text-', 'bg-')}`}></div>
                  </div>
                  <h3 className="font-medium text-foreground text-lg tracking-tight">
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
        .clause-container {
          position: relative;
          display: inline;
        }
        
        .clause-indicator {
          position: absolute;
          left: -20px;
          top: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }
        
        .clause-text {
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 1px 2px;
          border-radius: 3px;
          position: relative;
        }
        
        .clause-text:hover {
          background-color: rgba(59, 130, 246, 0.08);
        }
        
        .clause-text:hover + .clause-indicator,
        .clause-container:hover .clause-indicator {
          opacity: 1;
        }
        
        .clause-text.selected {
          background-color: rgba(59, 130, 246, 0.12);
          border-left: 2px solid rgb(59, 130, 246);
          padding-left: 6px;
          margin-left: 2px;
        }
        
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
      `}</style>
    </div>
  );
};

export default Analysis;
