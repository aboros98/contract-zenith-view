
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ArrowRight, 
  GitCompare, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  FileText
} from "lucide-react";

interface VersionCompareProps {
  onClose: () => void;
}

const VersionCompare = ({ onClose }: VersionCompareProps) => {
  const [selectedVersions, setSelectedVersions] = useState({
    left: "v3.2",
    right: "v3.1"
  });

  const versions = [
    { version: "v3.2", date: "2024-01-15", compliance: 92, issues: 2, status: "current" },
    { version: "v3.1", date: "2023-12-10", compliance: 89, issues: 3, status: "archived" },
    { version: "v3.0", date: "2023-11-05", compliance: 87, issues: 4, status: "archived" },
    { version: "v2.9", date: "2023-10-20", compliance: 85, issues: 5, status: "archived" }
  ];

  const leftVersion = versions.find(v => v.version === selectedVersions.left);
  const rightVersion = versions.find(v => v.version === selectedVersions.right);

  const complianceDiff = leftVersion && rightVersion ? leftVersion.compliance - rightVersion.compliance : 0;
  const issuesDiff = leftVersion && rightVersion ? leftVersion.issues - rightVersion.issues : 0;

  const changes = [
    {
      type: "modified",
      clause: "4.1 Payment Terms",
      leftText: "Payment shall be due within 30 days of receipt of invoice, with late fees of 1.5% per month on overdue amounts.",
      rightText: "Payment shall be due within 45 days of receipt of invoice, with late fees of 1% per month on overdue amounts.",
      impact: "Improved compliance - reduced late fee rate"
    },
    {
      type: "added",
      clause: "5.3 Data Protection",
      leftText: "Both parties shall comply with applicable data protection laws including GDPR and ensure proper handling of personal data.",
      rightText: "",
      impact: "Enhanced compliance - added GDPR compliance clause"
    },
    {
      type: "removed",
      clause: "6.2 Termination Notice",
      leftText: "",
      rightText: "Either party may terminate this agreement with 15 days notice.",
      impact: "Risk reduction - removed insufficient notice period"
    },
    {
      type: "modified",
      clause: "3.1 Service Level Agreement",
      leftText: "Services shall be available 99.9% of the time during business hours.",
      rightText: "Services shall be available 99% of the time during business hours.",
      impact: "Improved SLA commitment"
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "added": return <Plus className="w-4 h-4 text-emerald-600" />;
      case "removed": return <Minus className="w-4 h-4 text-red-600" />;
      case "modified": return <GitCompare className="w-4 h-4 text-amber-600" />;
      default: return null;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "added": return "border-l-emerald-500 bg-emerald-50/50";
      case "removed": return "border-l-red-500 bg-red-50/50";
      case "modified": return "border-l-amber-500 bg-amber-50/50";
      default: return "border-l-warm-beige-300 bg-warm-beige-50/50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="border-b border-warm-beige-200 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="hover:bg-warm-beige-100 transition-premium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Analysis
              </Button>
              <div className="text-sm text-muted-foreground">
                Service Agreement Template &gt; Version Comparison
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="hover:shadow-premium transition-premium">
                <FileText className="w-4 h-4 mr-2" />
                Export Comparison
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Version Selector */}
        <Card className="mb-8 bg-gradient-card border-warm-beige-200 shadow-premium-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <GitCompare className="w-6 h-6 text-primary" />
              Version Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Version Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Compare from</label>
                <div className="space-y-2">
                  {versions.map((version) => (
                    <div
                      key={version.version}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-premium ${
                        selectedVersions.left === version.version
                          ? "border-primary bg-primary/5"
                          : "border-warm-beige-200 bg-gradient-card hover:border-primary/30"
                      }`}
                      onClick={() => setSelectedVersions(prev => ({ ...prev, left: version.version }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{version.version}</span>
                            <Badge variant={version.status === "current" ? "default" : "secondary"}>
                              {version.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-warm-beige-600">{version.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">{version.compliance}%</p>
                          <p className="text-xs text-warm-beige-500">{version.issues} issues</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Version Selector */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Compare to</label>
                <div className="space-y-2">
                  {versions.map((version) => (
                    <div
                      key={version.version}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-premium ${
                        selectedVersions.right === version.version
                          ? "border-primary bg-primary/5"
                          : "border-warm-beige-200 bg-gradient-card hover:border-primary/30"
                      }`}
                      onClick={() => setSelectedVersions(prev => ({ ...prev, right: version.version }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{version.version}</span>
                            <Badge variant={version.status === "current" ? "default" : "secondary"}>
                              {version.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-warm-beige-600">{version.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">{version.compliance}%</p>
                          <p className="text-xs text-warm-beige-500">{version.issues} issues</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-warm-beige-200 shadow-premium-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warm-beige-600 mb-1">Compliance Change</p>
                  <p className="text-2xl font-bold text-foreground">
                    {complianceDiff > 0 ? '+' : ''}{complianceDiff}%
                  </p>
                </div>
                <div className={`p-3 rounded-full ${complianceDiff > 0 ? 'bg-emerald-100' : complianceDiff < 0 ? 'bg-red-100' : 'bg-warm-beige-100'}`}>
                  {complianceDiff > 0 ? (
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  ) : complianceDiff < 0 ? (
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  ) : (
                    <Minus className="w-6 h-6 text-warm-beige-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-warm-beige-200 shadow-premium-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warm-beige-600 mb-1">Issues Change</p>
                  <p className="text-2xl font-bold text-foreground">
                    {issuesDiff > 0 ? '+' : ''}{issuesDiff}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${issuesDiff < 0 ? 'bg-emerald-100' : issuesDiff > 0 ? 'bg-red-100' : 'bg-warm-beige-100'}`}>
                  {issuesDiff < 0 ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  ) : issuesDiff > 0 ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <Minus className="w-6 h-6 text-warm-beige-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-warm-beige-200 shadow-premium-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warm-beige-600 mb-1">Total Changes</p>
                  <p className="text-2xl font-bold text-foreground">{changes.length}</p>
                </div>
                <div className="p-3 rounded-full bg-bronze-100">
                  <GitCompare className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Changes Detail */}
        <Card className="bg-gradient-card border-warm-beige-200 shadow-premium-lg">
          <CardHeader>
            <CardTitle>Detailed Changes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {changes.map((change, index) => (
                <div key={index} className={`p-6 border-l-4 ${getChangeColor(change.type)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getChangeIcon(change.type)}
                      <div>
                        <h4 className="font-semibold text-foreground">{change.clause}</h4>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {change.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Left Version */}
                    <div>
                      <p className="text-sm font-medium text-warm-beige-600 mb-2">
                        {selectedVersions.left} {change.type === 'removed' ? '(Removed)' : ''}
                      </p>
                      {change.leftText ? (
                        <div className="p-3 bg-background rounded-lg border border-warm-beige-200">
                          <p className="text-sm text-foreground">{change.leftText}</p>
                        </div>
                      ) : (
                        <div className="p-3 bg-warm-beige-100 rounded-lg border border-warm-beige-200">
                          <p className="text-sm text-warm-beige-500 italic">No content</p>
                        </div>
                      )}
                    </div>

                    {/* Right Version */}
                    <div>
                      <p className="text-sm font-medium text-warm-beige-600 mb-2">
                        {selectedVersions.right} {change.type === 'added' ? '(Added)' : ''}
                      </p>
                      {change.rightText ? (
                        <div className="p-3 bg-background rounded-lg border border-warm-beige-200">
                          <p className="text-sm text-foreground">{change.rightText}</p>
                        </div>
                      ) : (
                        <div className="p-3 bg-warm-beige-100 rounded-lg border border-warm-beige-200">
                          <p className="text-sm text-warm-beige-500 italic">No content</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-bronze-50 rounded-lg">
                    <p className="text-sm font-medium text-bronze-700">Impact: {change.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VersionCompare;
