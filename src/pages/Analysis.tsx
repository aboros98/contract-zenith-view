import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Scale, 
  ArrowLeft, 
  Download, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  ChevronDown,
  ChevronRight,
  GitCompare,
  ExternalLink,
  Building2,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Activity
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
        },
        {
          articleNumber: 1768,
          articleText: "Art. 1.768. – (1) The price owed by the beneficiary is that provided in the contract or in law.",
          justifications: "The clause specifies 'The total price of this contract is 1850 EUR'. The article provides that 'The price owed by the beneficiary is that provided in the contract'. There is direct terminological overlap with the term 'price'.",
          rule: {
            ruleNaturalLanguage: "The price owed by the beneficiary is that provided in the contract or in law.",
            logicalRule: "contract_value == 1850",
            isViolated: false,
            justification: "According to Art. 1.768 Civil Code, 'the price owed by the beneficiary is that provided in the contract'. Clause 4.1 specifies a total price of 1850 EUR, which is in accordance with the contract value mentioned in metadata."
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
        },
        {
          id: 4,
          text: "All Services shall be performed in a professional and workmanlike manner consistent with industry best practices.",
          status: "compliant",
          compliance: 95,
          articles: ["Civil Code Article 1137"],
          issues: []
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
      default: return <Clock className="w-4 h-4 text-warm-beige-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-l-emerald-500 bg-emerald-50/50";
      case "partial": return "border-l-amber-500 bg-amber-50/50";
      case "non-compliant": return "border-l-red-500 bg-red-50/50";
      default: return "border-l-warm-beige-300 bg-warm-beige-50/50";
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
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-beige-200 glass-beige sticky top-0 z-50 shadow-premium-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="hover:bg-beige-100 transition-premium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="text-sm text-muted-foreground">
                Service Agreement Template &gt; v3.2 &gt; Analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:shadow-premium transition-premium border-beige-300"
                onClick={() => setShowVersionCompare(true)}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Versions
              </Button>
              <Button variant="outline" size="sm" className="hover:shadow-premium transition-premium border-beige-300">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:shadow-premium-md transition-premium">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Enhanced Contract Overview - Merged Card */}
        <Card className="mb-6 shadow-premium-xl bg-gradient-card border-beige-200">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium-md">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-serif font-semibold mb-2">{contractData.title}</CardTitle>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>{contractData.totalClauses} clauses analyzed</span>
                      <span>Last analyzed {contractData.lastAnalyzed}</span>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>{contractData.issues} issues found</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-4xl font-bold text-foreground mb-1">
                          {contractData.compliance}%
                        </div>
                        <Progress value={contractData.compliance} className="w-32 mb-2" />
                        <div className="text-sm text-muted-foreground">
                          Overall Compliance
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-100 rounded-xl">
                        <TrendingUp className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gold-600" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Date</p>
                      <p className="text-sm text-beige-600">{contractData.metadata.contractDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gold-600" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Value</p>
                      <p className="text-sm text-beige-600">{contractData.contractValue} {contractData.currency}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gold-600" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Duration</p>
                      <p className="text-sm text-beige-600">{contractData.metadata.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gold-600" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Parties</p>
                      <p className="text-sm text-beige-600">2 entities</p>
                    </div>
                  </div>
                </div>

                {/* Parties Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gold-50 rounded-lg border border-gold-200">
                    <p className="text-xs font-medium text-gold-600 mb-1">Provider</p>
                    <p className="text-sm font-semibold text-foreground">{contractData.parties.provider}</p>
                  </div>
                  <div className="p-4 bg-gold-50 rounded-lg border border-gold-200">
                    <p className="text-xs font-medium text-gold-600 mb-1">Beneficiary</p>
                    <p className="text-sm font-semibold text-foreground">{contractData.parties.beneficiary}</p>
                  </div>
                </div>

                {/* Contract Object */}
                <div className="p-4 bg-beige-50 rounded-lg border border-beige-200">
                  <p className="text-xs font-medium text-beige-600 mb-1">Contract Object</p>
                  <p className="text-sm text-foreground">{contractData.metadata.contractObject}</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-premium-lg bg-gradient-card border-beige-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Document Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <div key={section.id}>
                      {/* Section Header */}
                      <div 
                        className="flex items-center justify-between p-4 bg-warm-beige-50 border-b border-warm-beige-200 cursor-pointer hover:bg-warm-beige-100 transition-premium"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <ChevronRight 
                            className={`w-4 h-4 text-muted-foreground transition-all duration-300 ease-out ${
                              expandedSections.has(section.id) ? 'rotate-90' : ''
                            }`}
                          />
                          <span className="font-medium text-foreground">{section.title}</span>
                        </div>
                        <Badge variant="secondary" className="bg-warm-beige-200 text-warm-beige-700">
                          {section.clauses.length} clauses
                        </Badge>
                      </div>

                      {/* Section Clauses */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-out ${
                          expandedSections.has(section.id) 
                            ? 'max-h-96 opacity-100' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="space-y-1">
                          {section.clauses.map((clause) => (
                            <div
                              key={clause.id}
                              className={`p-4 border-l-4 cursor-pointer transition-premium hover:bg-warm-beige-50 group ${
                                getStatusColor(clause.status)
                              } ${
                                selectedClause === clause.id ? "bg-warm-beige-100 shadow-premium-sm" : ""
                              }`}
                              onClick={() => setSelectedClause(clause.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 pr-4">
                                  <div className="flex items-center space-x-2 mb-2">
                                    {getStatusIcon(clause.status)}
                                    <span className="text-sm font-medium text-foreground">
                                      Clause {clause.id}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {clause.compliance}% compliant
                                    </span>
                                  </div>
                                  <p className="text-sm text-foreground leading-relaxed group-hover:text-foreground transition-premium">
                                    {clause.text}
                                  </p>
                                  {clause.issues.length > 0 && (
                                    <div className="mt-2">
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

          {/* Enhanced Analysis Panel */}
          <div>
            {selectedClause ? (
              <Card className="shadow-premium-lg bg-gradient-card border-beige-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Scale className="w-5 h-5 mr-2 text-primary" />
                      Clause {selectedClause} Analysis
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedClause(null)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Clause Text */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Clause Text</h4>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm text-foreground italic">
                        "{clauseMetadata[selectedClause].clause}"
                      </p>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Compliance Status</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.status || "")}
                      <span className="text-sm font-medium capitalize">
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
                    <h4 className="font-medium text-foreground mb-3">Legal Articles Analysis</h4>
                    <div className="space-y-4">
                      {clauseMetadata[selectedClause].articles.map((article, index) => (
                        <div key={index} className="border border-warm-gray-200 rounded-lg p-4 bg-gradient-card">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Article {article.articleNumber}
                              </Badge>
                              <Badge 
                                variant={article.rule.isViolated ? "destructive" : "default"}
                                className={article.rule.isViolated ? "" : "bg-green-100 text-green-700 border-green-200"}
                              >
                                {article.rule.isViolated ? "Violation" : "Compliant"}
                              </Badge>
                            </div>
                            <ExternalLink className="w-4 h-4 text-blue-500 cursor-pointer" />
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-warm-gray-500 mb-1">Article Text</p>
                              <p className="text-sm text-foreground">{article.articleText}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs font-medium text-warm-gray-500 mb-1">Rule</p>
                              <p className="text-sm text-foreground">{article.rule.ruleNaturalLanguage}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs font-medium text-warm-gray-500 mb-1">Analysis</p>
                              <p className="text-sm text-foreground">{article.rule.justification}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">AI Recommendations</h4>
                    <div className="p-4 bg-gradient-muted rounded-lg border border-warm-gray-200">
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on the legal analysis, this clause appears to be in compliance with applicable regulations. 
                        The price specification meets the requirements for being serious, determined, and properly documented.
                      </p>
                      <Button variant="outline" size="sm" className="w-full hover:shadow-premium transition-premium">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Get Detailed Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-premium-lg bg-gradient-card border-beige-200">
                <CardContent className="p-12 text-center">
                  <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select a Clause
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any clause in the document to view detailed analysis, legal compliance, and AI recommendations.
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
