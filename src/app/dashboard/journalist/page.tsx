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
  Share2
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
  storiesPublished: number;
  dataExports: number;
  investigations: number;
  recentProjects: Array<{
    id: string;
    title: string;
    department: string;
    state: string;
    amount: number;
    status: string;
    priority: string;
  }>;
  recentAnomalies: Array<{
    id: string;
    title: string;
    type: string;
    severity: string;
    amount: number;
    storyPotential: string;
  }>;
  trendingStories: Array<{
    id: string;
    title: string;
    views: number;
    published: string;
    status: string;
  }>;
}

export default function JournalistDashboard() {
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
        storiesPublished: 47,
        dataExports: 23,
        investigations: 8,
        recentProjects: [
          { id: 'P001', title: 'Smart City Infrastructure', department: 'Urban Development', state: 'Maharashtra', amount: 500000000, status: 'In Progress', priority: 'high' },
          { id: 'P002', title: 'Digital India Initiative', department: 'IT & Communications', state: 'Karnataka', amount: 750000000, status: 'Completed', priority: 'medium' },
          { id: 'P003', title: 'Rural Healthcare Program', department: 'Health & Family Welfare', state: 'Bihar', amount: 300000000, status: 'In Progress', priority: 'high' }
        ],
        recentAnomalies: [
          { id: 'A001', title: 'Delayed Fund Release', type: 'Low Fund Release', severity: 'high', amount: 150000000, storyPotential: 'high' },
          { id: 'A002', title: 'Over Expenditure Detected', type: 'Over Expenditure', severity: 'medium', amount: 75000000, storyPotential: 'medium' }
        ],
        trendingStories: [
          { id: 'S001', title: 'Government Spending Anomalies in Maharashtra', views: 12500, published: '2 days ago', status: 'published' },
          { id: 'S002', title: 'RTI Reveals Delayed Fund Releases', views: 8900, published: '1 week ago', status: 'published' },
          { id: 'S003', title: 'Investigation: Smart City Project Delays', views: 0, published: 'Draft', status: 'draft' }
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
          className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full"
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
              <h1 className="text-2xl font-bold text-gray-900">Journalist Dashboard</h1>
              <p className="text-gray-600">Advanced analytics and investigation tools for transparency reporting</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-orange-100 text-orange-800">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Journalist Access
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
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
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Stories</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.storiesPublished}</h3>
                <p className="text-sm text-gray-600">Stories Published</p>
                <div className="mt-3 flex items-center text-sm text-orange-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+15% this month</span>
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
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Exports</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.dataExports}</h3>
                <p className="text-sm text-gray-600">Data Exports</p>
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span>Analytics ready</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Investigations</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data?.investigations}</h3>
                <p className="text-sm text-gray-600">Active Investigations</p>
                <div className="mt-3 flex items-center text-sm text-purple-600">
                  <PenTool className="w-4 h-4 mr-1" />
                  <span>In progress</span>
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
                <p className="text-sm text-gray-600">Story Opportunities</p>
                <div className="mt-3 flex items-center text-sm text-red-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>High potential</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* High Priority Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>High Priority Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.recentProjects.filter(p => p.priority === 'high').map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{project.title}</h4>
                            <Badge className="bg-red-100 text-red-800 text-xs">High Priority</Badge>
                          </div>
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
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
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

          {/* Story Opportunities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PenTool className="w-5 h-5 text-purple-600" />
                  <span>Story Opportunities</span>
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
                      className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
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
                                anomaly.storyPotential === 'high' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {anomaly.storyPotential} potential
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trending Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Your Stories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data?.trendingStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-gray-200 hover:border-green-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{story.title}</h4>
                      <Badge 
                        className={
                          story.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {story.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{story.views.toLocaleString()} views</span>
                      <span>{story.published}</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
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
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span>Journalist Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="h-12 bg-orange-600 hover:bg-orange-700 text-white">
                  <Download className="w-5 h-5 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="h-12">
                  <Search className="w-5 h-5 mr-2" />
                  Advanced Search
                </Button>
                <Button variant="outline" className="h-12">
                  <PenTool className="w-5 h-5 mr-2" />
                  Start Investigation
                </Button>
                <Button variant="outline" className="h-12">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Write Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
