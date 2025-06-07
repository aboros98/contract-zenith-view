import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Sparkles,
  ArrowUp,
  Activity,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFamilies, setOpenFamilies] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();

  const toggleFamily = (familyId: number) => {
    setOpenFamilies(prev => ({
      ...prev,
      [familyId]: !prev[familyId]
    }));
  };

  const stats = [
    { 
      title: "Total Contracts", 
      value: "247", 
      icon: FileText, 
      trend: "+12%", 
      trendUp: true,
      description: "This month"
    },
    { 
      title: "Compliance Rate", 
      value: "94%", 
      icon: Shield, 
      trend: "+3%", 
      trendUp: true,
      description: "Quality score"
    },
    { 
      title: "Active Reviews", 
      value: "18", 
      icon: Clock, 
      trend: "+5%", 
      trendUp: true,
      description: "In progress"
    },
    { 
      title: "Risk Score", 
      value: "Low", 
      icon: BarChart3, 
      trend: "Improved", 
      trendUp: true,
      description: "Overall rating"
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
        { version: "v3.0", status: "archived", compliance: 87, date: "2023-11-05", issues: 4 },
        { version: "v2.9", status: "archived", compliance: 85, date: "2023-10-20", issues: 5 }
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
        { version: "v4.0", status: "archived", compliance: 96, date: "2024-01-01", issues: 2 },
        { version: "v3.9", status: "archived", compliance: 94, date: "2023-12-15", issues: 3 }
      ]
    },
    {
      id: 3,
      name: "Vendor Agreement",
      totalVersions: 6,
      compliance: 87,
      lastUpdated: "2024-01-10",
      status: "review",
      riskLevel: "medium",
      versions: [
        { version: "v2.3", status: "current", compliance: 87, date: "2024-01-10", issues: 4 },
        { version: "v2.2", status: "archived", compliance: 84, date: "2023-12-01", issues: 5 },
        { version: "v2.1", status: "archived", compliance: 82, date: "2023-11-15", issues: 6 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-emerald-500";
      case "archived": return "bg-warm-gray-400";
      case "review": return "bg-amber-500";
      default: return "bg-warm-gray-400";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-emerald-600";
    if (compliance >= 85) return "text-amber-600";
    return "text-red-600";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "minimal": return "text-emerald-600 bg-emerald-50";
      case "low": return "text-emerald-600 bg-emerald-50";
      case "medium": return "text-amber-600 bg-amber-50";
      case "high": return "text-red-600 bg-red-50";
      default: return "text-warm-gray-600 bg-warm-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warm-gray-50 to-background">
      {/* Premium Header */}
      <header className="border-b border-warm-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold text-foreground tracking-tight">Dobi</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-warm-gray-200 focus:border-primary/50 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="border-warm-gray-200 hover:border-primary/20">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="shadow-premium bg-gradient-primary border-0">
                <FileText className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-warm-gray-200 shadow-premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
                  }`}>
                    <ArrowUp className={`w-3 h-3 ${stat.trendUp ? '' : 'rotate-180'}`} />
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-warm-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-xs text-warm-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contract Families */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2 tracking-tight">Contract Families</h2>
              <p className="text-warm-gray-600">Manage and analyze your contract templates</p>
            </div>
            <Button variant="outline" size="sm" className="border-warm-gray-200 hover:border-primary/20">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {contractFamilies.map((family) => (
            <Card key={family.id} className="overflow-hidden bg-gradient-card border-warm-gray-200 shadow-premium">
              <Collapsible open={openFamilies[family.id]} onOpenChange={() => toggleFamily(family.id)}>
                <CardHeader className="bg-gradient-to-r from-warm-gray-50 to-white border-b border-warm-gray-200">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            {openFamilies[family.id] ? (
                              <ChevronDown className="w-5 h-5 text-warm-gray-500" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-warm-gray-500" />
                            )}
                            <CardTitle className="text-xl font-serif font-semibold">{family.name}</CardTitle>
                          </div>
                          <Badge 
                            variant={family.status === "active" ? "default" : "secondary"}
                            className={`capitalize px-3 py-1 ${family.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}`}
                          >
                            {family.status}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={`capitalize px-3 py-1 border ${getRiskColor(family.riskLevel)}`}
                          >
                            {family.riskLevel} risk
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-warm-gray-600">
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            <span>{family.totalVersions} versions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Updated {family.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="text-right">
                            <p className="text-sm font-medium text-warm-gray-600">Compliance</p>
                            <p className={`text-2xl font-bold ${getComplianceColor(family.compliance)}`}>
                              {family.compliance}%
                            </p>
                          </div>
                          <div className="w-16">
                            <Progress 
                              value={family.compliance} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                </CardHeader>
                
                <CollapsibleContent>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {family.versions.map((version, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-6 hover:bg-warm-gray-50/50 cursor-pointer border-l-4 border-transparent hover:border-primary/20"
                          onClick={() => navigate("/analysis")}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(version.status)}`} />
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-foreground">{version.version}</span>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs px-2 py-0.5 capitalize border-warm-gray-300"
                                >
                                  {version.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-warm-gray-600">
                                <span>{version.date}</span>
                                <span>{version.issues} {version.issues === 1 ? 'issue' : 'issues'} found</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <div className={`text-lg font-bold ${getComplianceColor(version.compliance)}`}>
                                {version.compliance}%
                              </div>
                              <div className="text-sm text-warm-gray-500">
                                compliant
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
