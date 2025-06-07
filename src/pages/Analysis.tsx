
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
  FileText
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
      case "compliant": return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "partial": return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "non-compliant": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-slate" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-l-emerald-500 bg-emerald-50/50";
      case "partial": return "border-l-amber-500 bg-amber-50/50";
      case "non-compliant": return "border-l-red-500 bg-red-50/50";
      default: return "border-l-soft bg-soft/50";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-soft bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="btn-ghost"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="text-sm text-slate">
                Service Agreement Template &gt; v3.2 &gt; Analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-soft btn-ghost"
                onClick={() => setShowVersionCompare(true)}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Versions
              </Button>
              <Button variant="outline" size="sm" className="border-soft btn-ghost">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Contract Overview */}
        <Card className="mb-12 card-premium">
          <CardHeader className="pb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-medium mb-3 text-charcoal">{contractData.title}</CardTitle>
                    <div className="flex items-center space-x-8 text-sm text-slate">
                      <span>{contractData.totalClauses} clauses analyzed</span>
                      <span>Last analyzed {contractData.lastAnalyzed}</span>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>{contractData.issues} issues found</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-4xl font-medium text-charcoal mb-2">
                          {contractData.compliance}%
                        </div>
                        <Progress value={contractData.compliance} className="w-32 mb-3" />
                        <div className="text-sm text-slate">
                          Overall Compliance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Date</p>
                      <p className="text-sm text-slate">{contractData.metadata.contractDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Value</p>
                      <p className="text-sm text-slate">{contractData.contractValue} {contractData.currency}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Duration</p>
                      <p className="text-sm text-slate">{contractData.metadata.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Parties</p>
                      <p className="text-sm text-slate">2 entities</p>
                    </div>
                  </div>
                </div>

                {/* Parties Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs font-medium text-primary mb-2">Provider</p>
                    <p className="text-sm font-medium text-charcoal">{contractData.parties.provider}</p>
                  </div>
                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs font-medium text-primary mb-2">Beneficiary</p>
                    <p className="text-sm font-medium text-charcoal">{contractData.parties.beneficiary}</p>
                  </div>
                </div>

                {/* Contract Object */}
                <div className="p-6 bg-soft rounded-lg border border-softer">
                  <p className="text-xs font-medium text-slate mb-2">Contract Object</p>
                  <p className="text-sm text-charcoal">{contractData.metadata.contractObject}</p>
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
                <CardTitle className="text-lg font-medium text-charcoal">Document Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <div key={section.id}>
                      {/* Section Header */}
                      <div 
                        className="flex items-center justify-between p-6 bg-soft border-b border-softer cursor-pointer transition-colors duration-200 hover:bg-softer"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <ChevronRight 
                            className={`w-4 h-4 text-slate transition-all duration-300 ${
                              expandedSections.has(section.id) ? 'rotate-90' : ''
                            }`}
                          />
                          <span className="font-medium text-charcoal">{section.title}</span>
                        </div>
                        <Badge variant="secondary" className="bg-softer text-slate">
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
                              className={`p-6 border-l-4 cursor-pointer transition-colors duration-200 hover:bg-soft group ${
                                getStatusColor(clause.status)
                              } ${
                                selectedClause === clause.id ? "bg-softer" : ""
                              }`}
                              onClick={() => setSelectedClause(clause.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 pr-4">
                                  <div className="flex items-center space-x-3 mb-3">
                                    {getStatusIcon(clause.status)}
                                    <span className="text-sm font-medium text-charcoal">
                                      Clause {clause.id}
                                    </span>
                                    <span className="text-sm text-slate">
                                      {clause.compliance}% compliant
                                    </span>
                                  </div>
                                  <p className="text-sm text-charcoal leading-relaxed group-hover:text-charcoal">
                                    {clause.text}
                                  </p>
                                  {clause.issues.length > 0 && (
                                    <div className="mt-3">
                                      <span className="text-xs text-red-600 font-medium">
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
                    <CardTitle className="text-lg font-medium flex items-center text-charcoal">
                      <FileText className="w-5 h-5 mr-2 text-primary" />
                      Clause {selectedClause} Analysis
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedClause(null)} className="btn-ghost">
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Clause Text */}
                  <div>
                    <h4 className="font-medium text-charcoal mb-3">Clause Text</h4>
                    <div className="p-4 bg-soft rounded-md">
                      <p className="text-sm text-charcoal italic">
                        "{clauseMetadata[selectedClause].clause}"
                      </p>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div>
                    <h4 className="font-medium text-charcoal mb-3">Compliance Status</h4>
                    <div className="flex items-center space-x-3 mb-3">
                      {getStatusIcon(sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.status || "")}
                      <span className="text-sm font-medium capitalize text-charcoal">
                        {sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.status?.replace("-", " ")}
                      </span>
                    </div>
                    <Progress 
                      value={sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.compliance || 0} 
                      className="w-full"
                    />
                  </div>

                  {/* Legal Articles Analysis */}
                  <div>
                    <h4 className="font-medium text-charcoal mb-4">Legal Articles Analysis</h4>
                    <div className="space-y-6">
                      {clauseMetadata[selectedClause].articles.map((article, index) => (
                        <div key={index} className="border border-soft rounded-lg p-6 bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                Article {article.articleNumber}
                              </Badge>
                              <Badge 
                                variant={article.rule.isViolated ? "destructive" : "default"}
                                className={article.rule.isViolated ? "" : "bg-green-100 text-green-700 border-green-200"}
                              >
                                {article.rule.isViolated ? "Violation" : "Compliant"}
                              </Badge>
                            </div>
                            <ExternalLink className="w-4 h-4 text-primary cursor-pointer" />
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-medium text-slate mb-2">Article Text</p>
                              <p className="text-sm text-charcoal">{article.articleText}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs font-medium text-slate mb-2">Rule</p>
                              <p className="text-sm text-charcoal">{article.rule.ruleNaturalLanguage}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs font-medium text-slate mb-2">Analysis</p>
                              <p className="text-sm text-charcoal">{article.rule.justification}</p>
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
                  <FileText className="w-12 h-12 text-slate mx-auto mb-6" />
                  <h3 className="text-lg font-medium text-charcoal mb-3">
                    Select a Clause
                  </h3>
                  <p className="text-sm text-slate">
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
