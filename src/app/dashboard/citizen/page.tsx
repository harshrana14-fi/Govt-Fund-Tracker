'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Users, 
  Search, 
  DollarSign,
  Target,
  Eye,
  Download,
  Zap,
  MapPin,
  Building,
  Percent
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface DashboardData {
  totalProjects: number;
  totalSanctioned: number;
  totalReleased: number;
  totalSpent: number;
  totalAnomalies: number;
  recentProjects: Array<{
    id: string;
    title: string;
    department: string;
    state: string;
    amount: number;
    status: string;
  }>;
  recentAnomalies: Array<{
    id: string;
    title: string;
    type: string;
    severity: string;
    amount: number;
  }>;
}

export default function CitizenDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    
    if (user && user.role !== 'citizen') {
      router.push(`/dashboard/${user.role}`);
      return;
    }

    // Simulate data fetching
    setTimeout(() => {
      setData({
        totalProjects: 1247,
        totalSanctioned: 12500000000,
        totalReleased: 8750000000,
        totalSpent: 6500000000,
        totalAnomalies: 23,
        recentProjects: [
          { id: 'P001', title: 'Smart City Infrastructure', department: 'Urban Development', state: 'Maharashtra', amount: 500000000, status: 'In Progress' },
          { id: 'P002', title: 'Digital India Initiative', department: 'IT & Communications', state: 'Karnataka', amount: 750000000, status: 'Completed' },
          { id: 'P003', title: 'Rural Healthcare Program', department: 'Health & Family Welfare', state: 'Bihar', amount: 300000000, status: 'In Progress' }
        ],
        recentAnomalies: [
          { id: 'A001', title: 'Delayed Fund Release', type: 'Low Fund Release', severity: 'high', amount: 150000000 },
          { id: 'A002', title: 'Over Expenditure Detected', type: 'Over Expenditure', severity: 'medium', amount: 75000000 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Citizen Dashboard</h1>
              <p className="text-gray-600">Track government spending and promote transparency</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">
                <Users className="w-4 h-4 mr-2" />
                Citizen Access
              </Badge>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                File RTI
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Total</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.totalProjects}</h3>
                <p className="text-sm text-gray-600">Active Projects</p>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12% this month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Sanctioned</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(data?.totalSanctioned || 0)}
                </h3>
                <p className="text-sm text-gray-600">Total Sanctioned</p>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+8% this quarter</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800">Released</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(data?.totalReleased || 0)}
                </h3>
                <p className="text-sm text-gray-600">Funds Released</p>
                <div className="mt-3 flex items-center text-sm text-indigo-600">
                  <Percent className="w-4 h-4 mr-1" />
                  <span>{((data?.totalReleased || 0) / (data?.totalSanctioned || 1) * 100).toFixed(1)}% of sanctioned</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-800">Anomalies</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.totalAnomalies}</h3>
                <p className="text-sm text-gray-600">Issues Detected</p>
                <div className="mt-3 flex items-center text-sm text-red-600">
                  <Target className="w-4 h-4 mr-1" />
                  <span>Requires attention</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Projects and Anomalies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>Recent Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.recentProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Link href={`/projects/${project.id}`} className="font-semibold text-blue-600 hover:text-blue-800 hover:underline mb-1 block">
                            {project.title}
                          </Link>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {project.department}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {project.state}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(project.amount)}
                            </span>
                            <Badge 
                              className={
                                project.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <Link href={`/projects/${project.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Anomalies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Recent Anomalies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.recentAnomalies.map((anomaly, index) => (
                    <motion.div
                      key={anomaly.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{anomaly.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="text-sm text-gray-600">{anomaly.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(anomaly.amount)}
                            </span>
                            <Badge 
                              className={
                                anomaly.severity === 'high' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-orange-100 text-orange-800'
                              }
                            >
                              {anomaly.severity}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white">
                  <FileText className="w-5 h-5 mr-2" />
                  File RTI Request
                </Button>
                <Button variant="outline" className="h-12">
                  <Search className="w-5 h-5 mr-2" />
                  Search Projects
                </Button>
                <Button variant="outline" className="h-12">
                  <Download className="w-5 h-5 mr-2" />
                  Download Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
