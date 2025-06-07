
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
  ChevronDown,
  ChevronRight,
  GitCompare,
  ExternalLink,
  Building,
  Calendar,
  DollarSign,
  Users,
  Scale,
  Eye,
  Search,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1, 2, 3]));
  const [highlightedClause, setHighlightedClause] = useState<number | null>(null);
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
      startChar: 180,
      endChar: 420,
      clauses: [
        {
          id: 1,
          text: "In this Agreement, unless the context otherwise requires, the following terms shall have the meanings set forth below:",
          status: "compliant",
          compliance: 100,
          startChar: 180,
          endChar: 290
        },
        {
          id: 2,
          text: "\"Services\" means the professional consulting services to be provided by the Contractor as described in Schedule A.",
          status: "compliant",
          compliance: 100,
          startChar: 295,
          endChar: 420
        }
      ]
    },
    {
      id: 2,
      title: "2. Scope of Services",
      startChar: 440,
      endChar: 700,
      clauses: [
        {
          id: 3,
          text: "The Contractor shall provide the Services in accordance with the specifications set forth in Schedule A and any applicable industry standards.",
          status: "partial",
          compliance: 75,
          startChar: 440,
          endChar: 580
        },
        {
          id: 4,
          text: "All Services shall be performed in a professional and workmanlike manner consistent with industry best practices.",
          status: "compliant",
          compliance: 95,
          startChar: 585,
          endChar: 700
        }
      ]
    },
    {
      id: 3,
      title: "3. Payment Terms",
      startChar: 720,
      endChar: 820,
      clauses: [
        {
          id: 5,
          text: "Payment shall be due within 30 days of receipt of invoice, with late fees of 1.5% per month on overdue amounts.",
          status: "non-compliant",
          compliance: 40,
          startChar: 720,
          endChar: 820
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="w-4 h-4 text-electric-green" />;
      case "partial": return <AlertTriangle className="w-4 h-4 text-electric-amber" />;
      case "non-compliant": return <AlertTriangle className="w-4 h-4 text-electric-red" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getClauseHighlightColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-100 border-l-4 border-electric-green";
      case "partial": return "bg-amber-100 border-l-4 border-electric-amber";
      case "non-compliant": return "bg-red-100 border-l-4 border-electric-red";
      default: return "bg-gray-100";
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

  const renderHighlightedText = (text: string) => {
    let highlightedText = text;
    
    // Highlight clauses based on their status
    sections.forEach(section => {
      section.clauses.forEach(clause => {
        const clauseText = clause.text;
        const isSelected = selectedClause === clause.id;
        const isHighlighted = highlightedClause === clause.id;
        
        if (text.includes(clauseText)) {
          const highlightClass = isSelected 
            ? "bg-primary/20 border-2 border-primary rounded p-1 cursor-pointer" 
            : isHighlighted
            ? `${getClauseHighlightColor(clause.status)} rounded p-1 cursor-pointer hover:opacity-80`
            : `${getClauseHighlightColor(clause.status)} rounded p-1 cursor-pointer hover:opacity-80`;
          
          highlightedText = highlightedText.replace(
            clauseText,
            `<span class="${highlightClass}" data-clause-id="${clause.id}">${clauseText}</span>`
          );
        }
      });
    });

    return highlightedText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warm-gray-50 to-background">
      {/* Enhanced Header */}
      <header className="border-b border-border glass-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
                className="hover:bg-warm-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="text-sm text-muted-foreground">
                Service Agreement Template &gt; v3.2 &gt; Analysis
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="hover:shadow-premium">
                <GitCompare className="w-4 h-4 mr-2" />
                Compare Versions
              </Button>
              <Button variant="outline" size="sm" className="hover:shadow-premium">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:shadow-premium-md">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Compact Contract Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card className="lg:col-span-3 card-premium">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">{contractData.title}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>{contractData.totalClauses} clauses analyzed</span>
                    <span>Last analyzed {contractData.lastAnalyzed}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-electric-green mb-1">
                    {contractData.compliance}%
                  </div>
                  <Progress value={contractData.compliance} className="w-32 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {contractData.issues} issues found
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Compact Metadata Panel */}
          <Card className="card-premium">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center">
                <Building className="w-4 h-4 mr-2 text-primary" />
                Contract Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray-600">Value</span>
                  <span className="font-medium">{contractData.metadata.contractValue} {contractData.metadata.currency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray-600">Date</span>
                  <span className="font-medium">{contractData.metadata.contractDate}</span>
                </div>
                <div className="pt-2 border-t border-warm-gray-200">
                  <p className="text-xs text-warm-gray-500 mb-1">Parties</p>
                  <p className="text-xs text-foreground leading-tight">{contractData.metadata.parties.provider}</p>
                  <p className="text-xs text-foreground leading-tight">{contractData.metadata.parties.beneficiary}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Split Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contract Text Panel */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
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
              <div className="max-h-96 overflow-y-auto p-6 bg-warm-gray-50/50">
                <div 
                  className="prose prose-sm max-w-none font-mono text-sm leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: renderHighlightedText(fullContractText) }}
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

          {/* Analysis Panel */}
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium flex items-center">
                <Scale className="w-5 h-5 mr-2 text-primary" />
                Clause Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {selectedClause && clauseMetadata[selectedClause] ? (
                <div className="p-6 space-y-6">
                  {/* Selected Clause Analysis */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Selected Clause</h4>
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
                      <span className="text-sm font-medium capitalize status-success">
                        Compliant
                      </span>
                    </div>
                    <Progress value={100} className="w-full" />
                  </div>

                  {/* Legal Articles Analysis */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Legal Analysis</h4>
                    <div className="space-y-4">
                      {clauseMetadata[selectedClause].articles.map((article, index) => (
                        <div key={index} className="border border-warm-gray-200 rounded-lg p-4 bg-gradient-card">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Article {article.articleNumber}
                              </Badge>
                              <Badge className="status-success">
                                Compliant
                              </Badge>
                            </div>
                            <ExternalLink className="w-4 h-4 text-blue-500 cursor-pointer" />
                          </div>
                          
                          <div className="space-y-3">
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
                        This clause meets all compliance requirements. The price specification is properly documented and legally sound.
                      </p>
                      <Button variant="outline" size="sm" className="w-full hover:shadow-premium">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Get Detailed Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select a Clause
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any highlighted clause in the contract to view detailed analysis and compliance information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
