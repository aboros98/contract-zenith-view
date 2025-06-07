
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock,
  TrendingUp,
  Shield,
  BarChart3,
  ChevronRight,
  FileText,
  Loader2,
  Activity,
  Zap,
  CheckCircle,
  AlertTriangle,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFamilies, setExpandedFamilies] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const toggleFamily = (familyId: number) => {
    setExpandedFamilies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(familyId)) {
        newSet.delete(familyId);
      } else {
        newSet.add(familyId);
      }
      return newSet;
    });
  };

  const stats = [
    { title: "Total Contracts", value: "247", icon: FileText, trend: "+12%", color: "text-blue-600" },
    { title: "Compliance Rate", value: "94%", icon: Shield, trend: "+3%", color: "text-emerald-600" },
    { title: "Active Reviews", value: "18", icon: Clock, trend: "+5%", color: "text-amber-600" },
    { title: "Risk Score", value: "Low", icon: BarChart3, trend: "Improved", color: "text-purple-600" }
  ];

  const processingContracts = [
    {
      id: 1,
      name: "Service Agreement Template v3.3",
      uploadedAt: "2024-01-20 14:30",
      estimatedCompletion: "6 minutes",
      progress: 45,
      status: "analyzing"
    },
    {
      id: 2,
      name: "Employment Contract Amendment",
      uploadedAt: "2024-01-20 14:15",
      estimatedCompletion: "2 minutes", 
      progress: 85,
      status: "finalizing"
    }
  ];

  const contractFamilies = [
    {
      id: 1,
      name: "Service Agreement Template",
      totalVersions: 8,
      compliance: 92,
      lastUpdated: "2024-01-15",
      status: "active",
      riskLevel: "low",
      versions: [
        { version: "v3.2", status: "current", compliance: 92, date: "2024-01-15", issues: 2 },
        { version: "v3.1", status: "archived", compliance: 89, date: "2023-12-10", issues: 3 },
        { version: "v3.0", status: "archived", compliance: 87, date: "2023-11-05", issues: 4 }
      ]
    },
    {
      id: 2,
      name: "Employment Contract",
      totalVersions: 12,
      compliance: 98,
      lastUpdated: "2024-01-20",
      status: "active",
      riskLevel: "minimal",
      versions: [
        { version: "v4.1", status: "current", compliance: 98, date: "2024-01-20", issues: 1 },
        { version: "v4.0", status: "archived", compliance: 96, date: "2024-01-01", issues: 2 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">Dobi</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64 h-9 focus-premium"
                />
              </div>
              <Button variant="outline" size="sm" className="btn-glass h-9 px-3">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="btn-premium h-9 px-3">
                <Plus className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Processing Contracts */}
        {processingContracts.length > 0 && (
          <Card className="mb-8 glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                Processing Contracts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {processingContracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground text-sm">{contract.name}</h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize text-xs">
                        {contract.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground text-xs">
                      <span>Uploaded {contract.uploadedAt}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        ETA: {contract.estimatedCompletion}
                      </span>
                    </div>
                  </div>
                  <div className="text-right min-w-24">
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {contract.progress}%
                    </div>
                    <Progress value={contract.progress} className="w-20 h-1.5" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Contract Families */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Contract Families</h2>
              <p className="text-muted-foreground">Manage and analyze your contract templates</p>
            </div>
            <Button variant="outline" size="sm" className="btn-glass h-9 px-3">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {contractFamilies.map((family) => (
            <Card key={family.id} className="glass-card overflow-hidden">
              <CardHeader 
                className="bg-card/60 border-b border-border cursor-pointer p-4"
                onClick={() => toggleFamily(family.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <ChevronRight 
                          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                            expandedFamilies.has(family.id) ? 'rotate-90' : ''
                          }`}
                        />
                        <CardTitle className="text-lg text-foreground">{family.name}</CardTitle>
                      </div>
                      <Badge 
                        variant={family.status === "active" ? "default" : "secondary"}
                        className={`capitalize px-2 py-1 text-xs ${family.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}`}
                      >
                        {family.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>{family.totalVersions} versions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Updated {family.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-right">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Compliance</p>
                        <p className="text-xl font-bold text-foreground">
                          {family.compliance}%
                        </p>
                      </div>
                      <div className="w-12">
                        <Progress value={family.compliance} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {/* Versions Panel */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  expandedFamilies.has(family.id) 
                    ? 'max-h-64 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {family.versions.map((version, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 cursor-pointer border-l-4 border-transparent hover:border-primary/40 hover:bg-card/40"
                        onClick={() => navigate("/analysis")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground text-sm">{version.version}</span>
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5 capitalize border-border">
                                {version.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground text-xs">
                              <span>{version.date}</span>
                              <span className="flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {version.issues} {version.issues === 1 ? 'issue' : 'issues'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-foreground">
                              {version.compliance}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              compliant
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="btn-glass h-8 w-8 p-0">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
