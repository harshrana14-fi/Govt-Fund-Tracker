'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Shield, 
  Users, 
  BarChart3, 
  Search, 
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  Eye,
  Download,
  Star,
  Award,
  Globe,
  Zap,
  MapPin,
  Building,
  Calendar,
  Percent,
  Filter,
  TrendingDown,
  BookOpen,
  PenTool,
  Share2,
  Settings,
  MessageSquare,
  CheckSquare,
  AlertCircle,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DashboardData {
  totalProjects: number;
  totalSanctioned: number;
  totalReleased: number;
  totalSpent: number;
  totalAnomalies: number;
  pendingResponses: number;
  rtiApplications: number;
  complaints: number;
  recentProjects: Array<{
    id: string;
    title: string;
    department: string;
    state: string;
    amount: number;
    status: string;
    priority: string;
    responseTime: string;
  }>;
  recentAnomalies: Array<{
    id: string;
    title: string;
    type: string;
    severity: string;
    amount: number;
    status: string;
    assignedTo: string;
  }>;
  pendingActions: Array<{
    id: string;
    title: string;
    type: string;
    priority: string;
    dueDate: string;
    assignedTo: string;
  }>;
  performanceMetrics: Array<{
    metric: string;
    value: string;
    trend: string;
    status: string;
  }>;
}

export default function GovernmentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setData({
        totalProjects: 1247,
        totalSanctioned: 12500000000,
        totalReleased: 8750000000,
        totalSpent: 6500000000,
        totalAnomalies: 23,
        pendingResponses: 15,
        rtiApplications: 8,
        complaints: 12,
        recentProjects: [
          { id: 'P001', title: 'Smart City Infrastructure', department: 'Urban Development', state: 'Maharashtra', amount: 500000000, status: 'In Progress', priority: 'high', responseTime: '2 days' },
          { id: 'P002', title: 'Digital India Initiative', department: 'IT & Communications', state: 'Karnataka', amount: 750000000, status: 'Completed', priority: 'medium', responseTime: '1 day' },
          { id: 'P003', title: 'Rural Healthcare Program', department: 'Health & Family Welfare', state: 'Bihar', amount: 300000000, status: 'In Progress', priority: 'high', responseTime: '3 days' }
        ],
        recentAnomalies: [
          { id: 'A001', title: 'Delayed Fund Release', type: 'Low Fund Release', severity: 'high', amount: 150000000, status: 'Under Review', assignedTo: 'Finance Team' },
          { id: 'A002', title: 'Over Expenditure Detected', type: 'Over Expenditure', severity: 'medium', amount: 75000000, status: 'Resolved', assignedTo: 'Audit Team' }
        ],
        pendingActions: [
          { id: 'PA001', title: 'Respond to RTI Application #12345', type: 'RTI Response', priority: 'high', dueDate: '2024-01-15', assignedTo: 'Legal Team' },
          { id: 'PA002', title: 'Address Complaint #67890', type: 'Complaint Response', priority: 'medium', dueDate: '2024-01-20', assignedTo: 'Public Relations' },
          { id: 'PA003', title: 'Review Project Status Report', type: 'Review', priority: 'low', dueDate: '2024-01-25', assignedTo: 'Project Management' }
        ],
        performanceMetrics: [
          { metric: 'Response Time', value: '2.3 days', trend: '+0.2 days', status: 'warning' },
          { metric: 'RTI Compliance', value: '94%', trend: '+2%', status: 'good' },
          { metric: 'Project Completion', value: '87%', trend: '+5%', status: 'good' },
          { metric: 'Public Satisfaction', value: '4.2/5', trend: '+0.3', status: 'good' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full"
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
              <h1 className="text-2xl font-bold text-gray-900">Government Dashboard</h1>
              <p className="text-gray-600">Internal project management and public response tools</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <Building className="w-4 h-4 mr-2" />
                Government Access
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
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
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Projects</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.totalProjects}</h3>
                <p className="text-sm text-gray-600">Active Projects</p>
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
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Responses</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.pendingResponses}</h3>
                <p className="text-sm text-gray-600">Pending Responses</p>
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>2.3 days avg</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">RTI</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.rtiApplications}</h3>
                <p className="text-sm text-gray-600">RTI Applications</p>
                <div className="mt-3 flex items-center text-sm text-orange-600">
                  <CheckSquare className="w-4 h-4 mr-1" />
                  <span>94% compliance</span>
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
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-red-100 text-red-800">Issues</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.complaints}</h3>
                <p className="text-sm text-gray-600">Active Complaints</p>
                <div className="mt-3 flex items-center text-sm text-red-600">
                  <Target className="w-4 h-4 mr-1" />
                  <span>Need attention</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                  <span>Pending Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.pendingActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{action.title}</h4>
                            <Badge 
                              className={
                                action.priority === 'high' 
                                  ? 'bg-red-100 text-red-800' 
                                  : action.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }
                            >
                              {action.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="text-sm text-gray-600">{action.type}</span>
                            <span className="text-sm text-gray-600">Due: {action.dueDate}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              Assigned to: {action.assignedTo}
                            </span>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Take Action
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.performanceMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.metric}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{metric.metric}</span>
                        <Badge 
                          className={
                            metric.status === 'good' 
                              ? 'bg-green-100 text-green-800' 
                              : metric.status === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                        <div className="flex items-center text-sm text-gray-600">
                          <TrendingUpIcon className="w-4 h-4 mr-1" />
                          {metric.trend}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Anomalies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Recent Anomalies & Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data?.recentAnomalies.map((anomaly, index) => (
                  <motion.div
                    key={anomaly.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                          <div className="flex items-center space-x-2">
                            <Badge 
                              className={
                                anomaly.status === 'Resolved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {anomaly.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{anomaly.assignedTo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span>Government Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="h-12 bg-green-600 hover:bg-green-700 text-white">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Respond to RTI
                </Button>
                <Button variant="outline" className="h-12">
                  <FileText className="w-5 h-5 mr-2" />
                  Update Project
                </Button>
                <Button variant="outline" className="h-12">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="h-12">
                  <Settings className="w-5 h-5 mr-2" />
                  Manage Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
