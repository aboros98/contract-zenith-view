
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
  Activity
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
    { title: "Total Contracts", value: "247", icon: FileText, trend: "+12%" },
    { title: "Compliance Rate", value: "94%", icon: Shield, trend: "+3%" },
    { title: "Active Reviews", value: "18", icon: Clock, trend: "+5%" },
    { title: "Risk Score", value: "Low", icon: BarChart3, trend: "Improved" }
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
      <header className="border-b border-soft bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium text-charcoal tracking-tight">Dobi</span>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-soft focus-ring bg-white"
                />
              </div>
              <Button variant="outline" size="sm" className="border-soft btn-ghost">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="btn-primary">
                <FileText className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate mb-1">{stat.title}</p>
                  <p className="text-2xl font-medium text-charcoal">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Processing Contracts */}
        {processingContracts.length > 0 && (
          <Card className="mb-12 card-premium">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center text-charcoal">
                <Loader2 className="w-5 h-5 mr-3 text-primary animate-spin" />
                Processing Contracts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {processingContracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between p-6 bg-soft rounded-lg border border-softer">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="font-medium text-charcoal">{contract.name}</h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize">
                        {contract.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate">
                      <span>Uploaded {contract.uploadedAt}</span>
                      <span>ETA: {contract.estimatedCompletion}</span>
                    </div>
                  </div>
                  <div className="text-right min-w-32">
                    <div className="text-sm font-medium text-charcoal mb-2">
                      {contract.progress}% complete
                    </div>
                    <Progress value={contract.progress} className="w-24" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Contract Families */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-medium text-charcoal mb-2 tracking-tight">Contract Families</h2>
              <p className="text-slate">Manage and analyze your contract templates</p>
            </div>
            <Button variant="outline" size="sm" className="border-soft btn-ghost">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {contractFamilies.map((family) => (
            <Card key={family.id} className="card-premium overflow-hidden">
              <CardHeader 
                className="bg-soft border-b border-softer cursor-pointer"
                onClick={() => toggleFamily(family.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <ChevronRight 
                          className={`w-4 h-4 text-slate transition-all duration-300 ${
                            expandedFamilies.has(family.id) ? 'rotate-90' : ''
                          }`}
                        />
                        <CardTitle className="text-xl font-medium text-charcoal">{family.name}</CardTitle>
                      </div>
                      <Badge 
                        variant={family.status === "active" ? "default" : "secondary"}
                        className={`capitalize px-3 py-1 ${family.status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : ""}`}
                      >
                        {family.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-8 text-sm text-slate">
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
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-right">
                        <p className="text-sm text-slate">Compliance</p>
                        <p className="text-2xl font-medium text-charcoal">
                          {family.compliance}%
                        </p>
                      </div>
                      <div className="w-16">
                        <Progress value={family.compliance} className="h-2" />
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
                        className="flex items-center justify-between p-6 transition-colors duration-200 hover:bg-soft cursor-pointer border-l-4 border-transparent hover:border-primary/20 group"
                        onClick={() => navigate("/analysis")}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-charcoal group-hover:text-primary transition-colors duration-200">{version.version}</span>
                              <Badge variant="outline" className="text-xs px-2 py-0.5 capitalize border-soft">
                                {version.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-slate">
                              <span>{version.date}</span>
                              <span>{version.issues} {version.issues === 1 ? 'issue' : 'issues'} found</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="text-lg font-medium text-charcoal">
                              {version.compliance}%
                            </div>
                            <div className="text-sm text-slate">
                              compliant
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-60 group-hover:opacity-100 btn-ghost">
                            <Eye className="w-4 h-4" />
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
