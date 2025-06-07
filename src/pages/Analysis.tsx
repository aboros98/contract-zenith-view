
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
  Calendar,
  Users
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

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-l-emerald-500";
      case "partial": return "border-l-amber-500";
      case "non-compliant": return "border-l-red-500";
      default: return "border-l-gray-300";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "partial": return "bg-amber-50 text-amber-700 border-amber-200";
      case "non-compliant": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getComplianceTextColor = (compliance: number) => {
    if (compliance >= 95) return 'text-emerald-600';
    if (compliance >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  const handleClauseClick = (clauseId: number) => {
    setSelectedClause(selectedClause === clauseId ? null : clauseId);
  };

  const selectedClauseData = clauses.find(c => c.id === selectedClause);

  const renderDocumentWithClauses = () => {
    return (
      <div className="space-y-10">
        {/* Contract Header */}
        <div className="text-center pb-10 border-b border-gray-100">
          <h2 className="text-4xl font-light text-foreground mb-6 tracking-tight">
            SERVICE AGREEMENT
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            This Service Agreement ("Agreement") is entered into on January 21, 2025, between{" "}
            <span className="font-medium text-foreground">NEWPORT SOLUTIONS S.R.L.</span> ("Provider") and{" "}
            <span className="font-medium text-foreground">AROBS TRANSILVANIA SOFTWARE S.A.</span> ("Beneficiary").
          </p>
        </div>

        {/* Contract Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-foreground border-b border-gray-100 pb-3">
              1. DEFINITIONS AND INTERPRETATION
            </h3>
            <div className="space-y-5 text-foreground leading-8 text-lg">
              <p>1.1 In this Agreement, unless the context otherwise requires, the following terms shall have the meanings set forth below:</p>
              <p>1.2 "Services" means the professional consulting services to be provided by the Contractor as described in Schedule A.</p>
            </div>
          </div>

          {/* Section 2 with Clause Card */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-foreground border-b border-gray-100 pb-3">
              2. SCOPE OF SERVICES
            </h3>
            <div className="space-y-6">
              <Card 
                className={`border-l-4 ${getStatusBorderColor('compliant')} bg-white shadow-sm transition-all duration-200 cursor-pointer border border-gray-200`}
                onClick={() => handleClauseClick(4)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs font-mono bg-white border-gray-300">
                        2.1
                      </Badge>
                      <Badge className={`text-xs border ${getStatusBadgeColor('compliant')}`}>
                        Compliant
                      </Badge>
                    </div>
                    <div className={`text-lg font-semibold ${getComplianceTextColor(95)}`}>
                      95%
                    </div>
                  </div>
                  <p className="text-foreground leading-8 text-lg">
                    The Contractor shall provide the Services in accordance with the specifications set forth in Schedule A and any applicable industry standards.
                  </p>
                </CardContent>
              </Card>
              <p className="text-foreground leading-8 text-lg">2.2 All Services shall be performed in a professional and workmanlike manner consistent with industry best practices.</p>
            </div>
          </div>

          {/* Section 3 with Clause Card */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-foreground border-b border-gray-100 pb-3">
              3. PAYMENT TERMS
            </h3>
            <Card 
              className={`border-l-4 ${getStatusBorderColor('partial')} bg-white shadow-sm transition-all duration-200 cursor-pointer border border-gray-200`}
              onClick={() => handleClauseClick(2)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs font-mono bg-white border-gray-300">
                      3.1
                    </Badge>
                    <Badge className={`text-xs border ${getStatusBadgeColor('partial')}`}>
                      Partial Compliance
                    </Badge>
                  </div>
                  <div className={`text-lg font-semibold ${getComplianceTextColor(75)}`}>
                    75%
                  </div>
                </div>
                <p className="text-foreground leading-8 text-lg">
                  Payment shall be due within 30 days of receipt of invoice, with late fees of 1.5% per month on overdue amounts.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section 4 with Clause Card */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-foreground border-b border-gray-100 pb-3">
              4. CONTRACT VALUE
            </h3>
            <Card 
              className={`border-l-4 ${getStatusBorderColor('compliant')} bg-white shadow-sm transition-all duration-200 cursor-pointer border border-gray-200`}
              onClick={() => handleClauseClick(1)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs font-mono bg-white border-gray-300">
                      4.1
                    </Badge>
                    <Badge className={`text-xs border ${getStatusBadgeColor('compliant')}`}>
                      Compliant
                    </Badge>
                  </div>
                  <div className={`text-lg font-semibold ${getComplianceTextColor(100)}`}>
                    100%
                  </div>
                </div>
                <p className="text-foreground leading-8 text-lg">
                  The total price of this contract is 1850 EUR (excluding VAT).
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section 5 with Clause Card */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-foreground border-b border-gray-100 pb-3">
              5. TERMINATION
            </h3>
            <Card 
              className={`border-l-4 ${getStatusBorderColor('non-compliant')} bg-white shadow-sm transition-all duration-200 cursor-pointer border border-gray-200`}
              onClick={() => handleClauseClick(3)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs font-mono bg-white border-gray-300">
                      5.1
                    </Badge>
                    <Badge className={`text-xs border ${getStatusBadgeColor('non-compliant')}`}>
                      Non-compliant
                    </Badge>
                  </div>
                  <div className={`text-lg font-semibold ${getComplianceTextColor(40)}`}>
                    40%
                  </div>
                </div>
                <p className="text-foreground leading-8 text-lg">
                  Either party may terminate this Agreement with 30 days written notice.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section 6 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-foreground border-b border-gray-100 pb-3">
              6. GOVERNING LAW
            </h3>
            <p className="text-foreground leading-8 text-lg">6.1 This Agreement shall be governed by Romanian law.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
              <Button variant="outline" size="sm" className="border-gray-300">
                <GitCompare className="w-4 h-4 mr-2" />
                Compare
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
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
          <div className="bg-white border-b border-gray-200 px-12 py-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-light text-foreground mb-4 tracking-tight">
                  {contractData.title}
                </h1>
                <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    <span>{contractData.metadata.contractValue} {contractData.metadata.currency}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>analyzed {contractData.lastAnalyzed}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>{contractData.totalClauses} sections</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>2 parties</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-light text-foreground mb-4">
                  {contractData.compliance}%
                </div>
                <Progress value={contractData.compliance} className="w-40 mb-3" />
                <div className="text-sm text-muted-foreground">
                  compliance score
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contract Document */}
          <div className="flex-1 overflow-y-auto bg-gray-50/30">
            <div className="max-w-5xl mx-auto px-12 py-12">
              {renderDocumentWithClauses()}
            </div>
          </div>
        </div>

        {/* Premium Analysis Panel */}
        {selectedClauseData && (
          <div className="w-96 bg-white/95 backdrop-blur-xl border-l border-gray-200 flex flex-col">
            {/* Premium Panel Header */}
            <div className="px-8 py-8 border-b border-gray-200 bg-gradient-to-br from-gray-50/80 to-white backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Badge variant="outline" className="text-xs font-mono border-gray-300 bg-white">
                      {selectedClauseData.number}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full ${
                      selectedClauseData.status === 'compliant' ? 'bg-emerald-500' :
                      selectedClauseData.status === 'partial' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <h3 className="font-semibold text-foreground text-xl tracking-tight leading-tight">
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
              <div className="text-5xl font-light text-foreground mb-3">
                {selectedClauseData.compliance}%
              </div>
              <Progress value={selectedClauseData.compliance} className="w-full" />
            </div>

            {/* Premium Panel Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-gray-50/20 to-white">
              {/* Clause Text */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Clause Text
                </h4>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed">
                    "{selectedClauseData.text}"
                  </p>
                </div>
              </div>

              {/* Quick Analysis */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Quick Analysis
                </h4>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-muted-foreground">Compliance Score</span>
                    <span className={`text-sm font-bold ${getComplianceTextColor(selectedClauseData.compliance)}`}>
                      {selectedClauseData.compliance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
                    <span className="text-sm font-semibold text-foreground capitalize">
                      {selectedClauseData.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-muted-foreground">Issues Found</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedClauseData.issues}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Legal Assessment
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                      Compliance Details
                    </h5>
                    <p className="text-sm text-foreground leading-relaxed">
                      This clause meets Romanian Civil Code requirements for price determination under Art. 1660. 
                      The pricing structure is clearly defined and legally enforceable.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                      Risk Analysis
                    </h5>
                    <p className="text-sm text-foreground leading-relaxed">
                      {selectedClauseData.riskLevel === 'low' ? 'Low risk profile. No significant legal vulnerabilities identified. Standard commercial terms apply.' :
                       selectedClauseData.riskLevel === 'medium' ? 'Medium risk. Some clauses may require review for optimal protection. Consider additional safeguards.' :
                       'High risk identified. This clause may expose parties to significant liability. Immediate review recommended.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                      Recommendations
                    </h5>
                    <p className="text-sm text-foreground leading-relaxed">
                      {selectedClauseData.issues === 0 ? 'No immediate changes required. This clause meets standard compliance requirements.' :
                       'Review recommended to address identified issues and improve compliance rating.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Resources */}
              <div className="pt-6 border-t border-gray-200 space-y-3">
                <Button variant="outline" size="sm" className="w-full border-gray-300 justify-start bg-white/50">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Legal References
                </Button>
                <Button variant="outline" size="sm" className="w-full border-gray-300 justify-start bg-white/50">
                  <Scale className="w-4 h-4 mr-2" />
                  Compliance Standards
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;
