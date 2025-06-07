
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
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const [selectedClause, setSelectedClause] = useState<number | null>(1);
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
      case "compliant": return "text-green-700 bg-green-50 border-green-200";
      case "partial": return "text-amber-700 bg-amber-50 border-amber-200";
      case "non-compliant": return "text-red-700 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-green-700";
    if (compliance >= 75) return "text-amber-700";
    return "text-red-700";
  };

  const highlightContractText = (text: string) => {
    let highlightedText = text;
    
    clauses.forEach(clause => {
      if (text.includes(clause.text)) {
        const isSelected = selectedClause === clause.id;
        const className = isSelected 
          ? "bg-blue-100 border-l-4 border-blue-500 pl-2 cursor-pointer rounded"
          : `bg-gray-50 border-l-4 border-gray-300 pl-2 cursor-pointer rounded hover:bg-gray-100`;
        
        highlightedText = highlightedText.replace(
          clause.text,
          `<span class="${className}" data-clause-id="${clause.id}">${clause.text}</span>`
        );
      }
    });

    return highlightedText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
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

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Compact Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card className="lg:col-span-3 card-professional">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-charcoal">{contractData.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>{contractData.totalClauses} clauses analyzed</span>
                    <span>Last analyzed {contractData.lastAnalyzed}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {contractData.compliance}%
                  </div>
                  <Progress value={contractData.compliance} className="w-32 mb-2" />
                  <div className="text-sm text-gray-600">
                    {contractData.issues} issues found
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="card-professional">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center text-charcoal">
                <Building className="w-4 h-4 mr-2 text-primary" />
                Contract Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Value</span>
                  <span className="font-medium text-charcoal">{contractData.metadata.contractValue} {contractData.metadata.currency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-charcoal">{contractData.metadata.contractDate}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Parties</p>
                  <p className="text-xs text-charcoal leading-tight">{contractData.metadata.parties.provider}</p>
                  <p className="text-xs text-charcoal leading-tight">{contractData.metadata.parties.beneficiary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contract Document - Hero Element */}
          <div className="lg:col-span-2">
            <Card className="card-professional">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-charcoal flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Contract Document
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Search className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="legal-document max-h-96 overflow-y-auto p-6">
                  <div 
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: highlightContractText(fullContractText) }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const clauseId = target.getAttribute('data-clause-id');
                      if (clauseId) {
                        setSelectedClause(Number(clauseId));
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clause Analysis Sidebar */}
          <div className="space-y-4">
            <Card className="card-professional">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-charcoal flex items-center">
                  <Scale className="w-5 h-5 mr-2 text-primary" />
                  Clause Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                <div className="space-y-3 p-6">
                  {clauses.map((clause) => (
                    <div 
                      key={clause.id}
                      className={`clause-card cursor-pointer ${selectedClause === clause.id ? 'clause-highlight border-blue-300' : ''}`}
                      onClick={() => setSelectedClause(clause.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {clause.number}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(clause.status)}`}>
                            {clause.status === "compliant" ? "Compliant" : 
                             clause.status === "partial" ? "Partial" : "Non-compliant"}
                          </Badge>
                        </div>
                        <div className={`text-sm font-semibold ${getComplianceColor(clause.compliance)}`}>
                          {clause.compliance}%
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-charcoal mb-2">{clause.title}</h4>
                      <p className="text-sm text-gray-600 italic mb-3">"{clause.text}"</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{clause.issues} {clause.issues === 1 ? 'issue' : 'issues'}</span>
                        <span className="capitalize">{clause.riskLevel} risk</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Clause Details */}
            {selectedClause && (
              <Card className="card-professional">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium text-charcoal">
                    Detailed Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Legal Compliance</p>
                      <p className="text-sm text-charcoal">This clause meets Romanian Civil Code requirements for price determination under Art. 1660.</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Risk Assessment</p>
                      <p className="text-sm text-charcoal">Low risk. Price is clearly defined and complies with legal standards.</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Recommendations</p>
                      <p className="text-sm text-charcoal">No changes required. Clause is properly structured and legally sound.</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Legal References
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
