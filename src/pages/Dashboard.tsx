
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="icon-container-sm">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Dobi</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 w-80 h-12 border-slate-200 focus-premium bg-white/80 backdrop-blur-sm rounded-xl"
                />
              </div>
              <Button variant="outline" size="sm" className="btn-glass h-12 px-6">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="btn-premium h-12 px-6">
                <Plus className="w-5 h-5 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="card-premium">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`icon-container ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Processing Contracts */}
        {processingContracts.length > 0 && (
          <Card className="mb-16 card-premium">
            <CardHeader className="pb-6">
              <CardTitle className="text-heading flex items-center text-slate-900">
                <div className="icon-container-sm mr-4">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                </div>
                Processing Contracts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {processingContracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h4 className="font-semibold text-slate-900 text-lg">{contract.name}</h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize px-3 py-1">
                        {contract.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-8 text-slate-600">
                      <span>Uploaded {contract.uploadedAt}</span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        ETA: {contract.estimatedCompletion}
                      </span>
                    </div>
                  </div>
                  <div className="text-right min-w-40">
                    <div className="text-lg font-semibold text-slate-900 mb-3">
                      {contract.progress}% complete
                    </div>
                    <Progress value={contract.progress} className="w-32 h-3" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Contract Families */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-display text-slate-900 mb-4 tracking-tight">Contract Families</h2>
              <p className="text-xl text-slate-600">Manage and analyze your contract templates</p>
            </div>
            <Button variant="outline" size="sm" className="btn-glass h-12 px-6">
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </Button>
          </div>

          {contractFamilies.map((family) => (
            <Card key={family.id} className="card-premium overflow-hidden">
              <CardHeader 
                className="bg-white/40 backdrop-blur-sm border-b border-slate-200/60 cursor-pointer p-8"
                onClick={() => toggleFamily(family.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-4">
                        <ChevronRight 
                          className={`w-5 h-5 text-slate-400 transition-all duration-300 ${
                            expandedFamilies.has(family.id) ? 'rotate-90' : ''
                          }`}
                        />
                        <CardTitle className="text-heading text-slate-900">{family.name}</CardTitle>
                      </div>
                      <Badge 
                        variant={family.status === "active" ? "default" : "secondary"}
                        className={`capitalize px-4 py-2 font-medium ${family.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}`}
                      >
                        {family.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-10 text-slate-600">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5" />
                        <span className="font-medium">{family.totalVersions} versions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5" />
                        <span>Updated {family.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-600 mb-1">Compliance</p>
                        <p className="text-3xl font-bold text-slate-900">
                          {family.compliance}%
                        </p>
                      </div>
                      <div className="w-20">
                        <Progress value={family.compliance} className="h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {/* Versions Panel */}
              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  expandedFamilies.has(family.id) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {family.versions.map((version, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-8 transition-colors duration-200 hover:bg-white/60 cursor-pointer border-l-4 border-transparent hover:border-primary/40 group"
                        onClick={() => navigate("/analysis")}
                      >
                        <div className="flex items-center space-x-6">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <div>
                            <div className="flex items-center gap-4 mb-2">
                              <span className="font-semibold text-slate-900 group-hover:text-primary transition-colors duration-200 text-lg">{version.version}</span>
                              <Badge variant="outline" className="text-sm px-3 py-1 capitalize border-slate-200">
                                {version.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-6 text-slate-600">
                              <span>{version.date}</span>
                              <span className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                {version.issues} {version.issues === 1 ? 'issue' : 'issues'} found
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">
                              {version.compliance}%
                            </div>
                            <div className="text-sm text-slate-600">
                              compliant
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-60 group-hover:opacity-100 btn-glass">
                            <Eye className="w-5 h-5" />
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
