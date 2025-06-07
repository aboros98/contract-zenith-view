
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
  const [isPanelOpen, setIsPanelOpen] = useState(false);
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
      case "compliant": return "bg-emerald-500";
      case "partial": return "bg-amber-500";
      case "non-compliant": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-emerald-700";
    if (compliance >= 75) return "text-amber-700";
    return "text-red-700";
  };

  const handleClauseClick = (clauseId: number) => {
    setSelectedClause(clauseId);
    setIsPanelOpen(true);
  };

  const renderContractWithIndicators = () => {
    let result = fullContractText;
    let offset = 0;

    // Sort clauses by start position to avoid conflicts
    const sortedClauses = [...clauses].sort((a, b) => a.startPos - b.startPos);

    sortedClauses.forEach(clause => {
      const beforeText = result.substring(0, clause.startPos + offset);
      const clauseText = clause.text;
      const afterText = result.substring(clause.startPos + offset + clauseText.length);

      const indicator = `<span class="clause-indicator ${getStatusColor(clause.status)}" data-clause-id="${clause.id}"></span>`;
      const wrappedClause = `<span class="clause-text ${selectedClause === clause.id ? 'selected' : ''}" data-clause-id="${clause.id}">${clauseText}</span>`;

      result = beforeText + indicator + wrappedClause + afterText;
      offset += indicator.length + wrappedClause.length - clauseText.length;
    });

    return result;
  };

  const selectedClauseData = clauses.find(c => c.id === selectedClause);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="text-sm text-gray-500">
                Service Agreement Template › v3.2 › Analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Versions
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Contract View */}
        <div className="flex-1 flex flex-col">
          {/* Document Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-charcoal mb-2">{contractData.title}</h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    {contractData.metadata.contractValue} {contractData.metadata.currency}
                  </span>
                  <span>{contractData.totalClauses} clauses analyzed</span>
                  <span>Last analyzed {contractData.lastAnalyzed}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-700 mb-2">
                  {contractData.compliance}%
                </div>
                <Progress value={contractData.compliance} className="w-32 mb-2" />
                <div className="text-sm text-gray-600">
                  {contractData.issues} issues found
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-600">Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-600">Partial Compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Non-compliant</span>
              </div>
            </div>
          </div>

          {/* Contract Document */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto bg-white">
              <div className="max-w-4xl mx-auto px-12 py-8">
                <div 
                  className="font-mono text-sm leading-relaxed text-charcoal whitespace-pre-wrap relative"
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
        {isPanelOpen && selectedClauseData && (
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col animate-slide-in-right">
            {/* Panel Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedClauseData.number}
                    </Badge>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedClauseData.status)}`}></div>
                    <span className={`text-sm font-semibold ${getComplianceColor(selectedClauseData.compliance)}`}>
                      {selectedClauseData.compliance}%
                    </span>
                  </div>
                  <h3 className="font-semibold text-charcoal">{selectedClauseData.title}</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsPanelOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Clause Text */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Clause Text</p>
                <p className="text-sm text-charcoal italic bg-gray-50 p-3 rounded-lg">
                  "{selectedClauseData.text}"
                </p>
              </div>

              {/* Status Overview */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-3">Status Overview</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Compliance Score</span>
                    <span className={`text-sm font-semibold ${getComplianceColor(selectedClauseData.compliance)}`}>
                      {selectedClauseData.compliance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Risk Level</span>
                    <span className="text-sm font-medium capitalize text-charcoal">
                      {selectedClauseData.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Issues Found</span>
                    <span className="text-sm font-medium text-charcoal">
                      {selectedClauseData.issues}
                    </span>
                  </div>
                </div>
              </div>

              {/* Legal Analysis */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-3">Legal Analysis</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Compliance Assessment</p>
                    <p className="text-sm text-charcoal">
                      This clause meets Romanian Civil Code requirements for price determination under Art. 1660. 
                      The pricing structure is clearly defined and legally enforceable.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Risk Factors</p>
                    <p className="text-sm text-charcoal">
                      Low risk profile. No significant legal vulnerabilities identified. 
                      Standard commercial terms apply.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Recommendations</p>
                    <p className="text-sm text-charcoal">
                      No immediate changes required. Consider adding inflation adjustment clause 
                      for contracts exceeding 12 months duration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full mb-3">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Legal References
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Scale className="w-4 h-4 mr-2" />
                  Compare with Standards
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .clause-indicator {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 8px;
          margin-left: -14px;
          position: relative;
          top: -2px;
        }
        
        .clause-text {
          cursor: pointer;
          transition: background-color 0.2s ease;
          padding: 2px 4px;
          border-radius: 4px;
        }
        
        .clause-text:hover {
          background-color: rgba(59, 130, 246, 0.1);
        }
        
        .clause-text.selected {
          background-color: rgba(59, 130, 246, 0.15);
          border-left: 3px solid rgb(59, 130, 246);
          padding-left: 8px;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
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
