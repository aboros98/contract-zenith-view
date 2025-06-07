
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
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1, 2, 3]));
  const navigate = useNavigate();

  const contractData = {
    title: "Service Agreement Template v3.2",
    compliance: 92,
    totalClauses: 24,
    issues: 2,
    lastAnalyzed: "2024-01-15"
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
      case "compliant": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "partial": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "non-compliant": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "border-l-green-500 bg-green-50/50";
      case "partial": return "border-l-yellow-500 bg-yellow-50/50";
      case "non-compliant": return "border-l-red-500 bg-red-50/50";
      default: return "border-l-gray-300 bg-gray-50/50";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="text-sm text-muted-foreground">
                Service Agreement Template &gt; v3.2 &gt; Analysis
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
              <Button size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Contract Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-medium">{contractData.title}</CardTitle>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span>{contractData.totalClauses} clauses analyzed</span>
                  <span>Last analyzed {contractData.lastAnalyzed}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold text-foreground mb-1">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Document Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <div key={section.id}>
                      {/* Section Header */}
                      <div 
                        className="flex items-center justify-between p-4 bg-muted/30 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center space-x-3">
                          {expandedSections.has(section.id) ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="font-medium text-foreground">{section.title}</span>
                        </div>
                        <Badge variant="secondary">
                          {section.clauses.length} clauses
                        </Badge>
                      </div>

                      {/* Section Clauses */}
                      {expandedSections.has(section.id) && (
                        <div className="space-y-1">
                          {section.clauses.map((clause) => (
                            <div
                              key={clause.id}
                              className={`p-4 border-l-4 cursor-pointer transition-all hover:bg-muted/20 ${
                                getStatusColor(clause.status)
                              } ${
                                selectedClause === clause.id ? "bg-muted/40" : ""
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
                                  <p className="text-sm text-foreground leading-relaxed">
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
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Panel */}
          <div>
            {selectedClause ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      Clause {selectedClause} Analysis
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedClause(null)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  {/* Issues */}
                  {sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.issues.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Issues Found</h4>
                      <div className="space-y-2">
                        {sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.issues.map((issue, index) => (
                          <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-red-700">{issue}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Relevant Articles */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Relevant Legal Articles</h4>
                    <div className="space-y-2">
                      {sections.find(s => s.clauses.some(c => c.id === selectedClause))?.clauses.find(c => c.id === selectedClause)?.articles.map((article, index) => (
                        <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-700">{article}</span>
                            <ExternalLink className="w-3 h-3 text-blue-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">AI Recommendations</h4>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        Consider revising this clause to ensure full compliance with applicable regulations. 
                        Click "Ask AI" for detailed recommendations.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Get Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select a Clause
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any clause in the document to view detailed analysis and recommendations.
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
