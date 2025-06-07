
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Shield,
  BarChart3,
  Activity,
  ChevronRight,
  Zap,
  Timer,
  Archive
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFamilies, setExpandedFamilies] = useState<Set<number>>(new Set());
  const [processingFile, setProcessingFile] = useState<any>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for processing file from upload
    const storedFile = localStorage.getItem('processingFile');
    if (storedFile) {
      const fileData = JSON.parse(storedFile);
      setProcessingFile(fileData);
      
      // Simulate processing progress
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Mark as complete and add to contract families
            setTimeout(() => {
              setProcessingFile(null);
              localStorage.removeItem('processingFile');
            }, 2000);
            return 100;
          }
          return prev + 10;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, []);

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
    { 
      title: "Total Contracts", 
      value: "247", 
      icon: FileText, 
      trend: "+12%", 
      trendUp: true,
      description: "This month",
      color: "text-electric-blue",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Compliance Rate", 
      value: "94%", 
      icon: Shield, 
      trend: "+3%", 
      trendUp: true,
      description: "Quality score",
      color: "text-electric-green",
      bgColor: "bg-green-50"
    },
    { 
      title: "Active Reviews", 
      value: "18", 
      icon: Clock, 
      trend: "+5%", 
      trendUp: true,
      description: "In progress",
      color: "text-electric-amber",
      bgColor: "bg-amber-50"
    },
    { 
      title: "Risk Score", 
      value: "Low", 
      icon: BarChart3, 
      trend: "Improved", 
      trendUp: true,
      description: "Overall rating",
      color: "text-electric-green",
      bgColor: "bg-green-50"
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
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-electric-green";
      case "archived": return "bg-warm-gray-400";
      case "review": return "bg-electric-amber";
      default: return "bg-warm-gray-400";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-electric-green";
    if (compliance >= 85) return "text-electric-amber";
    return "text-electric-red";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "minimal": return "status-success";
      case "low": return "status-success";
      case "medium": return "status-warning";
      case "high": return "status-danger";
      default: return "text-warm-gray-600 bg-warm-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warm-gray-50 to-background">
      {/* Enhanced Header */}
      <header className="border-b border-warm-gray-200 glass-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-premium-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-foreground tracking-tight">Dobi</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-warm-gray-200 focus:border-primary/50 bg-white/90 backdrop-blur-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="border-warm-gray-200 hover:border-primary/30">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-gradient-primary hover:shadow-premium-md">
                <FileText className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    stat.trendUp ? 'status-success' : 'status-danger'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${stat.trendUp ? '' : 'rotate-180'}`} />
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-warm-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-warm-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Processing Section */}
        {processingFile && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Currently Processing</h2>
            <Card className="card-premium bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-electric-blue/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-electric-blue animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{processingFile.name}</h3>
                      <p className="text-sm text-warm-gray-600 flex items-center">
                        <Timer className="w-4 h-4 mr-2" />
                        Started {new Date(processingFile.uploadTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-electric-blue mb-1">
                      {processingProgress}%
                    </div>
                    <Badge className="status-processing">
                      {processingProgress === 100 ? 'Complete' : 'Processing'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-gray-600">Analysis Progress</span>
                    <span className="text-electric-blue font-medium">
                      {processingProgress === 100 ? 'Complete' : `${Math.floor(processingProgress / 20) + 1}/5 steps`}
                    </span>
                  </div>
                  <Progress value={processingProgress} className="h-3 progress-glow" />
                  <p className="text-sm text-warm-gray-600">
                    {processingProgress < 20 ? 'Analyzing document structure...' :
                     processingProgress < 40 ? 'Extracting clauses and terms...' :
                     processingProgress < 60 ? 'Checking compliance requirements...' :
                     processingProgress < 80 ? 'Assessing legal risks...' :
                     processingProgress < 100 ? 'Finalizing analysis report...' :
                     'Analysis complete! Ready for review.'}
                  </p>
                </div>
                {processingProgress === 100 && (
                  <div className="mt-4 flex space-x-3">
                    <Button 
                      size="sm" 
                      className="bg-gradient-primary"
                      onClick={() => navigate('/analysis')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Analysis
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4 mr-2" />
                      Save to Library
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contract Families */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2 tracking-tight">Contract Families</h2>
              <p className="text-warm-gray-600">Manage and analyze your contract templates</p>
            </div>
            <Button variant="outline" size="sm" className="border-warm-gray-200 hover:border-primary/30">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {contractFamilies.map((family) => (
            <Card key={family.id} className="card-premium overflow-hidden">
              <CardHeader 
                className="bg-gradient-muted cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-warm-gray-100/80 hover:to-warm-gray-50/90"
                onClick={() => toggleFamily(family.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <ChevronRight 
                        className={`w-5 h-5 text-warm-gray-500 transition-all duration-300 ${
                          expandedFamilies.has(family.id) ? 'rotate-90' : ''
                        }`}
                      />
                      <CardTitle className="text-xl font-serif font-semibold">{family.name}</CardTitle>
                      <Badge 
                        variant={family.status === "active" ? "default" : "secondary"}
                        className={`capitalize ${family.status === "active" ? "status-success" : ""}`}
                      >
                        {family.status}
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`capitalize ${getRiskColor(family.riskLevel)}`}
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
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-warm-gray-600">Compliance</p>
                        <p className={`text-2xl font-bold ${getComplianceColor(family.compliance)}`}>
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
              
              {/* Animated Versions Panel */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-out ${
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
                        className="flex items-center justify-between p-6 hover:bg-warm-gray-50/50 cursor-pointer border-l-4 border-transparent hover:border-primary/20 transition-all duration-300 group"
                        onClick={() => navigate("/analysis")}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(version.status)} shadow-premium-sm`} />
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{version.version}</span>
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
                          <Button variant="ghost" size="sm" className="opacity-60 group-hover:opacity-100 transition-opacity">
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
