
import { useState } from "react";
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
  Users,
  Shield,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const stats = [
    { title: "Total Contracts", value: "247", icon: FileText, trend: "+12%" },
    { title: "Compliance Rate", value: "94%", icon: Shield, trend: "+3%" },
    { title: "Active Reviews", value: "18", icon: Clock, trend: "+5%" },
    { title: "Risk Score", value: "Low", icon: BarChart3, trend: "Improved" }
  ];

  const contractFamilies = [
    {
      id: 1,
      name: "Service Agreement Template",
      totalVersions: 8,
      compliance: 92,
      lastUpdated: "2024-01-15",
      status: "active",
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
      versions: [
        { version: "v2.3", status: "current", compliance: 87, date: "2024-01-10", issues: 4 },
        { version: "v2.2", status: "archived", compliance: 84, date: "2023-12-01", issues: 5 },
        { version: "v2.1", status: "archived", compliance: 82, date: "2023-11-15", issues: 6 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-green-500";
      case "archived": return "bg-gray-400";
      case "review": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return "text-green-600";
    if (compliance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-medium text-foreground">ContractIQ</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <FileText className="w-4 h-4 mr-2" />
                New Contract
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contract Families */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-foreground">Contract Families</h2>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {contractFamilies.map((family) => (
            <Card key={family.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium">{family.name}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span>{family.totalVersions} versions</span>
                      <span>Updated {family.lastUpdated}</span>
                      <Badge 
                        variant={family.status === "active" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {family.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-muted-foreground">Compliance</span>
                      <span className={`text-lg font-semibold ${getComplianceColor(family.compliance)}`}>
                        {family.compliance}%
                      </span>
                    </div>
                    <Progress value={family.compliance} className="w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {family.versions.map((version, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => navigate("/analysis")}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(version.status)}`} />
                        <div>
                          <span className="font-medium text-foreground">{version.version}</span>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span>{version.date}</span>
                            <span className="capitalize">{version.status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getComplianceColor(version.compliance)}`}>
                            {version.compliance}% compliant
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {version.issues} issues found
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
