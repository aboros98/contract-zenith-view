import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  ChevronDown,
  ChevronRight,
  GitCompare,
  ExternalLink,
  Calendar,
  CreditCard,
  Users,
  FileText,
  Zap,
  Shield,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import VersionCompare from "@/components/VersionCompare";

const Analysis = () => {
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1, 2, 3]));
  const [showVersionCompare, setShowVersionCompare] = useState(false);
  const navigate = useNavigate();

  const contractData = {
    title: "Service Agreement Template v3.2",
    compliance: 92,
    totalClauses: 24,
    issues: 2,
    lastAnalyzed: "2024-01-15",
    contractValue: "1850",
    currency: "EUR",
    parties: {
      provider: "NEWPORT SOLUTIONS S.R.L.",
      beneficiary: "AROBS TRANSILVANIA SOFTWARE S.A."
    },
    metadata: {
      contractDate: "21.01.2025",
      duration: "Duration of training programs",
      contractObject: "Provision of training program - Python Course"
    }
  };

  const clauseMetadata = {
    1: {
      clause: "4.1 The total price of this contract is 1850 EUR (excluding VAT)",
      articles: [
        {
          articleNumber: 1660,
          articleText: "Art. 1.660. – (1) The price consists of a sum of money. (2) It must be serious and determined or at least determinable.",
          justifications: "The clause specifies 'The total price of this contract is 1850 EUR'. The article provides that 'The price consists of a sum of money' and 'must be serious and determined or at least determinable'. There is evident conceptual overlap.",
          rule: {
            ruleNaturalLanguage: "The price must be a sum of money, serious and determined or at least determinable.",
            logicalRule: "price_is_money == true AND price_is_determined == true AND price_is_serious == true",
            isViolated: false,
            justification: "The clause complies with Art. 1660 Civil Code. According to para. (1), 'the price consists of a sum of money', and the clause specifies 1850 EUR. According to para. (2), 'it must be serious and determined or at least determinable', and the price of 1850 EUR is a determined sum and appears to be serious for a Python course."
          }
        }
      ]
    }
  };

  const sections = [
    {
      id: 1,
      title: "1. Definitions and Interpretation",
      clauses: [
        {
          id: 1,
          text: "In this Agreement, unless the context otherwise requires, the following terms shall have the meanings set forth below:",
          status: "compliant",
          compliance: 100,
          articles: [],
          issues: []
        },
        {
          id: 2,
          text: "\"Services\" means the professional consulting services to be provided by the Contractor as described in Schedule A.",
          status: "compliant",
          compliance: 100,
          articles: ["Civil Code Article 1159"],
          issues: []
        }
      ]
    },
    {
      id: 2,
      title: "2. Scope of Services",
      clauses: [
        {
          id: 3,
          text: "The Contractor shall provide the Services in accordance with the specifications set forth in Schedule A and any applicable industry standards.",
          status: "partial",
          compliance: 75,
          articles: ["Civil Code Article 1134", "Civil Code Article 1135"],
          issues: ["Missing specific performance timelines", "Vague quality standards definition"]
        }
      ]
    },
    {
      id: 3,
      title: "3. Payment Terms",
      clauses: [
        {
          id: 5,
          text: "Payment shall be due within 30 days of receipt of invoice, with late fees of 1.5% per month on overdue amounts.",
          status: "non-compliant",
          compliance: 40,
          articles: ["Civil Code Article 1153", "Civil Code Article 1154"],
          issues: ["Late fee rate exceeds legal maximum of 1% per month", "Missing grace period provision"]
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "partial": return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "non-compliant": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-l-emerald-500 bg-emerald-50/30";
      case "partial": return "border-l-amber-500 bg-amber-50/30";
      case "non-compliant": return "border-l-red-500 bg-red-50/30";
      default: return "border-l-slate-200 bg-slate-50/30";
    }
  };

  const toggleSection = (sectionId: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (showVersionCompare) {
    return <VersionCompare onClose={() => setShowVersionCompare(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="btn-glass h-12 px-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center text-sm text-slate-600 bg-white/40 px-4 py-2 rounded-lg">
                <FileText className="w-4 h-4 mr-2" />
                Service Agreement Template &gt; v3.2 &gt; Analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="btn-glass h-12 px-6"
                onClick={() => setShowVersionCompare(true)}
              >
                <GitCompare className="w-5 h-5 mr-2" />
                Compare Versions
              </Button>
              <Button variant="outline" size="sm" className="btn-glass h-12 px-6">
                <Download className="w-5 h-5 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Contract Overview */}
        <Card className="mb-16 card-premium">
          <CardHeader className="pb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-8">
                  <div className="icon-container">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-heading mb-4 text-slate-900">{contractData.title}</CardTitle>
                    <div className="flex items-center space-x-8 text-slate-600">
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {contractData.totalClauses} clauses analyzed
                      </span>
                      <span>Last analyzed {contractData.lastAnalyzed}</span>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>{contractData.issues} issues found</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-5xl font-bold text-slate-900 mb-3">
                          {contractData.compliance}%
                        </div>
                        <Progress value={contractData.compliance} className="w-40 h-4 mb-4" />
                        <div className="text-lg font-medium text-slate-600">
                          Overall Compliance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                  <div className="flex items-center space-x-4 p-6 bg-white/40 rounded-xl">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-slate-900">Date</p>
                      <p className="text-slate-600">{contractData.metadata.contractDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-6 bg-white/40 rounded-xl">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-slate-900">Value</p>
                      <p className="text-slate-600">{contractData.contractValue} {contractData.currency}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-6 bg-white/40 rounded-xl">
                    <Clock className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-slate-900">Duration</p>
                      <p className="text-slate-600">{contractData.metadata.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-6 bg-white/40 rounded-xl">
                    <Users className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-slate-900">Parties</p>
                      <p className="text-slate-600">2 entities</p>
                    </div>
                  </div>
                </div>

                {/* Parties Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20">
                    <p className="text-sm font-semibold text-primary mb-3">Provider</p>
                    <p className="font-semibold text-slate-900">{contractData.parties.provider}</p>
                  </div>
                  <div className="p-8 bg-primary/5 rounded-2xl border border-primary/20">
                    <p className="text-sm font-semibold text-primary mb-3">Beneficiary</p>
                    <p className="font-semibold text-slate-900">{contractData.parties.beneficiary}</p>
                  </div>
                </div>

                {/* Contract Object */}
                <div className="p-8 bg-white/40 rounded-2xl border border-slate-200/60">
                  <p className="text-sm font-semibold text-slate-600 mb-3">Contract Object</p>
                  <p className="text-slate-900">{contractData.metadata.contractObject}</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Document Panel */}
          <div className="lg:col-span-2">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="text-heading text-slate-900">Document Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <div key={section.id}>
                      {/* Section Header */}
                      <div 
                        className="flex items-center justify-between p-8 bg-white/40 backdrop-blur-sm border-b border-slate-200/60 cursor-pointer transition-colors duration-200 hover:bg-white/60"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <ChevronRight 
                            className={`w-5 h-5 text-slate-400 transition-all duration-300 ${
                              expandedSections.has(section.id) ? 'rotate-90' : ''
                            }`}
                          />
                          <span className="font-semibold text-slate-900 text-lg">{section.title}</span>
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 px-3 py-1">
                          {section.clauses.length} clauses
                        </Badge>
                      </div>

                      {/* Section Clauses */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedSections.has(section.id) 
                            ? 'max-h-96 opacity-100' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="space-y-1">
                          {section.clauses.map((clause) => (
                            <div
                              key={clause.id}
                              className={`p-8 border-l-4 cursor-pointer transition-colors duration-200 hover:bg-white/40 group ${
                                getStatusColor(clause.status)
                              } ${
                                selectedClause === clause.id ? "bg-white/60" : ""
                              }`}
                              onClick={() => setSelectedClause(clause.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 pr-4">
                                  <div className="flex items-center space-x-4 mb-4">
                                    {getStatusIcon(clause.status)}
                                    <span className="font-semibold text-slate-900">
                                      Clause {clause.id}
                                    </span>
                                    <span className="text-slate-600">
                                      {clause.compliance}% compliant
                                    </span>
                                  </div>
                                  <p className="text-slate-700 leading-relaxed group-hover:text-slate-900">
                                    {clause.text}
                                  </p>
                                  {clause.issues.length > 0 && (
                                    <div className="mt-4">
                                      <span className="text-sm text-red-600 font-medium">
                                        {clause.issues.length} issue(s) found
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Panel */}
          <div>
            {selectedClause ? (
              <Card className="card-premium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-heading flex items-center text-slate-900">
                      <div className="icon-container-sm mr-3">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      Clause {selectedClause} Analysis
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedClause(null)} className="btn-glass">
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Clause Text */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Clause Text</h4>
                    <div className="p-6 bg-white/40 rounded-xl">
                      <p className="text-slate-700 italic">
                        "{clauseMetadata[selectedClause].clause}"
                      </p>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Compliance Status</h4>
                    <div className="flex items-center space-x-4 mb-4">
                      {getStatusIcon(sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.status || "")}
                      <span className="font-medium capitalize text-slate-900">
                        {sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.status?.replace("-", " ")}
                      </span>
                    </div>
                    <Progress 
                      value={sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.compliance || 0} 
                      className="w-full h-3"
                    />
                  </div>

                  {/* Legal Articles Analysis */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-6">Legal Articles Analysis</h4>
                    <div className="space-y-6">
                      {clauseMetadata[selectedClause].articles.map((article, index) => (
                        <div key={index} className="glass-card p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                                Article {article.articleNumber}
                              </Badge>
                              <Badge 
                                variant={article.rule.isViolated ? "destructive" : "default"}
                                className={article.rule.isViolated ? "" : "bg-green-100 text-green-700 border-green-200"}
                              >
                                {article.rule.isViolated ? "Violation" : "Compliant"}
                              </Badge>
                            </div>
                            <ExternalLink className="w-5 h-5 text-primary cursor-pointer" />
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <p className="text-sm font-semibold text-slate-600 mb-3">Article Text</p>
                              <p className="text-slate-900">{article.articleText}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm font-semibold text-slate-600 mb-3">Rule</p>
                              <p className="text-slate-900">{article.rule.ruleNaturalLanguage}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm font-semibold text-slate-600 mb-3">Analysis</p>
                              <p className="text-slate-900">{article.rule.justification}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="card-premium">
                <CardContent className="p-16 text-center">
                  <div className="icon-container w-16 h-16 mx-auto mb-8">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-heading text-slate-900 mb-4">
                    Select a Clause
                  </h3>
                  <p className="text-slate-600">
                    Click on any clause in the document to view detailed analysis, legal compliance, and recommendations.
                  </p>
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
