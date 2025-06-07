
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
      case "current": return "bg-emerald-500";
      case "archived": return "bg-gray-400";
      case "review": return "bg-amber-500";
      default: return "bg-gray-400";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-emerald-600";
    if (compliance >= 85) return "text-amber-600";
    return "text-red-600";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "minimal": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "low": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "high": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-semibold text-charcoal">Dobi</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-gray-200 focus:border-primary bg-white rounded-xl"
                />
              </div>
              <Button variant="outline" size="sm" className="border-gray-200 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground rounded-xl shadow-sm">
                <FileText className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Apple-Style Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    stat.trendUp ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${stat.trendUp ? '' : 'rotate-180'}`} />
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-charcoal mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Processing Section with Apple Glass Effect */}
        {processingFile && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Currently Processing</h2>
            <Card className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-charcoal">{processingFile.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Timer className="w-4 h-4 mr-2" />
                        Started {new Date(processingFile.uploadTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary mb-1">
                      {processingProgress}%
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 rounded-full">
                      {processingProgress === 100 ? 'Complete' : 'Processing'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Analysis Progress</span>
                    <span className="text-primary font-medium">
                      {processingProgress === 100 ? 'Complete' : `${Math.floor(processingProgress / 20) + 1}/5 steps`}
                    </span>
                  </div>
                  <Progress value={processingProgress} className="h-2 rounded-full" />
                  <p className="text-sm text-gray-600">
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
                      className="bg-primary text-primary-foreground rounded-xl"
                      onClick={() => navigate('/analysis')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Analysis
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Archive className="w-4 h-4 mr-2" />
                      Save to Library
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contract Families with Apple Design */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-charcoal mb-2">Contract Families</h2>
              <p className="text-gray-600">Manage and analyze your contract templates</p>
            </div>
            <Button variant="outline" size="sm" className="border-gray-200 rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {contractFamilies.map((family) => (
            <Card key={family.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <CardHeader 
                className="bg-gray-50/50 cursor-pointer transition-all duration-200 hover:bg-gray-100/50"
                onClick={() => toggleFamily(family.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <ChevronRight 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          expandedFamilies.has(family.id) ? 'rotate-90' : ''
                        }`}
                      />
                      <CardTitle className="text-lg font-semibold text-charcoal">{family.name}</CardTitle>
                      <Badge 
                        className={`capitalize rounded-full ${
                          family.status === "active" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : 
                          "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {family.status}
                      </Badge>
                      <Badge 
                        className={`capitalize rounded-full ${getRiskColor(family.riskLevel)}`}
                      >
                        {family.riskLevel} risk
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
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
                        <p className="text-sm font-medium text-gray-600">Compliance</p>
                        <p className={`text-xl font-bold ${getComplianceColor(family.compliance)}`}>
                          {family.compliance}%
                        </p>
                      </div>
                      <div className="w-20">
                        <Progress value={family.compliance} className="h-2 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
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
                        className="flex items-center justify-between p-4 hover:bg-gray-50/80 cursor-pointer border-l-4 border-transparent hover:border-gray-300 transition-all duration-200"
                        onClick={() => navigate("/analysis")}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(version.status)}`} />
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-charcoal">{version.version}</span>
                              <Badge 
                                className="text-xs px-2 py-0.5 capitalize border-gray-300 rounded-full bg-gray-100 text-gray-800"
                              >
                                {version.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
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
                            <div className="text-sm text-gray-500">
                              compliant
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
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
