
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
      case "compliant": return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "partial": return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "non-compliant": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-l-emerald-500 bg-emerald-50/30";
      case "partial": return "border-l-amber-500 bg-amber-50/30";
      case "non-compliant": return "border-l-red-500 bg-red-50/30";
      default: return "border-l-border bg-muted/30";
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
      <header className="glass sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="btn-glass h-9 px-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                <FileText className="w-3 h-3 mr-1" />
                Service Agreement Template &gt; v3.2 &gt; Analysis
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="btn-glass h-9 px-3"
                onClick={() => setShowVersionCompare(true)}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Versions
              </Button>
              <Button variant="outline" size="sm" className="btn-glass h-9 px-3">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Contract Overview */}
        <Card className="mb-6 glass-card">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 text-foreground">{contractData.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {contractData.totalClauses} clauses analyzed
                      </span>
                      <span>Last analyzed {contractData.lastAnalyzed}</span>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>{contractData.issues} issues found</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {contractData.compliance}%
                    </div>
                    <Progress value={contractData.compliance} className="w-24 h-2 mb-2" />
                    <div className="text-sm font-medium text-muted-foreground">
                      Overall Compliance
                    </div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground text-xs">Date</p>
                      <p className="text-muted-foreground text-xs">{contractData.metadata.contractDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground text-xs">Value</p>
                      <p className="text-muted-foreground text-xs">{contractData.contractValue} {contractData.currency}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground text-xs">Duration</p>
                      <p className="text-muted-foreground text-xs">Training programs</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground text-xs">Parties</p>
                      <p className="text-muted-foreground text-xs">2 entities</p>
                    </div>
                  </div>
                </div>

                {/* Parties Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-1">Provider</p>
                    <p className="font-semibold text-foreground text-xs">{contractData.parties.provider}</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-1">Beneficiary</p>
                    <p className="font-semibold text-foreground text-xs">{contractData.parties.beneficiary}</p>
                  </div>
                </div>

                {/* Contract Object */}
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Contract Object</p>
                  <p className="text-foreground text-xs">{contractData.metadata.contractObject}</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Panel */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Document Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <div key={section.id}>
                      {/* Section Header */}
                      <div 
                        className="flex items-center justify-between p-4 bg-muted/30 border-b border-border cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <ChevronRight 
                            className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${
                              expandedSections.has(section.id) ? 'rotate-90' : ''
                            }`}
                          />
                          <span className="font-semibold text-foreground text-sm">{section.title}</span>
                        </div>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground px-2 py-0.5 text-xs">
                          {section.clauses.length} clauses
                        </Badge>
                      </div>

                      {/* Section Clauses */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedSections.has(section.id) 
                            ? 'max-h-64 opacity-100' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="space-y-1">
                          {section.clauses.map((clause) => (
                            <div
                              key={clause.id}
                              className={`p-4 border-l-4 cursor-pointer hover:bg-muted/30 ${
                                getStatusColor(clause.status)
                              } ${
                                selectedClause === clause.id ? "bg-muted/50" : ""
                              }`}
                              onClick={() => setSelectedClause(clause.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 pr-3">
                                  <div className="flex items-center space-x-2 mb-2">
                                    {getStatusIcon(clause.status)}
                                    <span className="font-semibold text-foreground text-sm">
                                      Clause {clause.id}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                      {clause.compliance}% compliant
                                    </span>
                                  </div>
                                  <p className="text-foreground text-xs leading-relaxed">
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

          {/* Analysis Panel */}
          <div>
            {selectedClause ? (
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center text-foreground">
                      <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center mr-2">
                        <FileText className="w-3 h-3 text-primary" />
                      </div>
                      Clause {selectedClause} Analysis
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedClause(null)} className="btn-glass h-7 w-7 p-0">
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Clause Text */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-xs">Clause Text</h4>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-foreground italic text-xs">
                        "{clauseMetadata[selectedClause]?.clause}"
                      </p>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-xs">Compliance Status</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.status || "")}
                      <span className="font-medium capitalize text-foreground text-xs">
                        {sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.status?.replace("-", " ")}
                      </span>
                    </div>
                    <Progress 
                      value={sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.compliance || 0} 
                      className="w-full h-1.5"
                    />
                  </div>

                  {/* Legal Articles Analysis */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-xs">Legal Articles Analysis</h4>
                    <div className="space-y-3">
                      {clauseMetadata[selectedClause]?.articles?.map((article, index) => (
                        <div key={index} className="glass-card p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-1.5 py-0.5 text-xs">
                                Article {article.articleNumber}
                              </Badge>
                              <Badge 
                                variant={article.rule.isViolated ? "destructive" : "default"}
                                className={article.rule.isViolated ? "text-xs" : "bg-green-100 text-green-700 border-green-200 text-xs"}
                              >
                                {article.rule.isViolated ? "Violation" : "Compliant"}
                              </Badge>
                            </div>
                            <ExternalLink className="w-3 h-3 text-primary cursor-pointer" />
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Article Text</p>
                              <p className="text-foreground text-xs">{article.articleText}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Rule</p>
                              <p className="text-foreground text-xs">{article.rule.ruleNaturalLanguage}</p>
                            </div>
                            
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Analysis</p>
                              <p className="text-foreground text-xs">{article.rule.justification}</p>
                            </div>
                          </div>
                        </div>
                      )) || []}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    Select a Clause
                  </h3>
                  <p className="text-muted-foreground text-xs">
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
