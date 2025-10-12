'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Search, Filter, TrendingUp, TrendingDown, DollarSign, Shield, Clock, Target, Users, BarChart3, Eye, FileText, AlertCircle, Zap, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Anomaly, getAnomalyStats } from '@/lib/anomalies';

type SeverityFilter = 'all' | 'high' | 'medium' | 'low';
type AnomalyTypeFilter = 'all' | 'Low Fund Release' | 'Low Expenditure' | 'Over Expenditure' | 'High Value Low Progress' | 'Vendor Concentration';

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [filteredAnomalies, setFilteredAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [typeFilter, setTypeFilter] = useState<AnomalyTypeFilter>('all');

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch anomalies');
        }
        const data = await response.json();
        setAnomalies(data.anomalies);
        setFilteredAnomalies(data.anomalies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnomalies();
  }, []);

  useEffect(() => {
    let filtered = anomalies;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(anomaly =>
        anomaly.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anomaly.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anomaly.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anomaly.anomaly_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter(anomaly => anomaly.severity === severityFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(anomaly => anomaly.anomaly_type === typeFilter);
    }

    setFilteredAnomalies(filtered);
  }, [anomalies, searchTerm, severityFilter, typeFilter]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case 'Low Fund Release':
        return <TrendingDown className="w-4 h-4 text-orange-600" />;
      case 'Low Expenditure':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'Over Expenditure':
        return <DollarSign className="w-4 h-4 text-red-600" />;
      case 'High Value Low Progress':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'Vendor Concentration':
        return <AlertTriangle className="w-4 h-4 text-purple-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const stats = getAnomalyStats(anomalies);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Anomalies</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Anomaly Detection</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              AI-powered detection of irregularities in government spending patterns, 
              project execution delays, and financial discrepancies
            </p>
          </div>
        </motion.div>

        {/* Anomaly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <Shield className="w-5 h-5 text-red-600" />
                <span>Anomaly Detection Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">AI-Powered Detection</h4>
                  <p className="text-sm text-gray-700">
                    Machine learning algorithms analyze spending patterns to identify irregularities
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Real-time Monitoring</h4>
                  <p className="text-sm text-gray-700">
                    Continuous monitoring of government spending with instant anomaly alerts
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Transparency Focus</h4>
                  <p className="text-sm text-gray-700">
                    Promoting government accountability through open anomaly reporting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Anomaly Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
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
                  <Badge className="bg-red-100 text-red-800">Total</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.total}</h3>
                <p className="text-sm text-gray-700">Anomalies Detected</p>
                <div className="mt-3 flex items-center text-sm text-red-600">
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
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                </div>
                  <Badge className="bg-orange-100 text-orange-800">High</Badge>
                </div>
                <h3 className="text-2xl font-bold text-red-600 mb-1">{stats.high}</h3>
                <p className="text-sm text-gray-700">High Severity</p>
                <div className="mt-3 flex items-center text-sm text-red-600">
                  <Target className="w-4 h-4 mr-1" />
                  <span>Requires immediate attention</span>
              </div>
            </CardContent>
          </Card>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                </div>
                <h3 className="text-2xl font-bold text-orange-600 mb-1">{stats.medium}</h3>
                <p className="text-sm text-gray-700">Medium Severity</p>
                <div className="mt-3 flex items-center text-sm text-orange-600">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span>Monitor closely</span>
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
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Amount</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{formatCurrency(stats.totalAmount)}</h3>
                <p className="text-sm text-gray-700">Amount Involved</p>
                <div className="mt-3 flex items-center text-sm text-purple-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Public funds at risk</span>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <Filter className="w-5 h-5 text-gray-700" />
                <span>Filters & Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      placeholder="Search anomalies, projects, departments, or states..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-gray-800 placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Severity</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as AnomalyTypeFilter)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Low Fund Release">Low Fund Release</option>
                    <option value="Low Expenditure">Low Expenditure</option>
                    <option value="Over Expenditure">Over Expenditure</option>
                    <option value="High Value Low Progress">High Value Low Progress</option>
                    <option value="Vendor Concentration">Vendor Concentration</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Anomalies Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">
                Flagged Anomalies ({filteredAnomalies.length} of {anomalies.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-800 font-semibold">Project</TableHead>
                      <TableHead className="text-gray-800 font-semibold">Anomaly Type</TableHead>
                      <TableHead className="text-gray-800 font-semibold">Severity</TableHead>
                      <TableHead className="text-gray-800 font-semibold">Department</TableHead>
                      <TableHead className="text-gray-800 font-semibold">State</TableHead>
                      <TableHead className="text-gray-800 font-semibold">Amount Involved</TableHead>
                      <TableHead className="text-gray-800 font-semibold">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAnomalies.map((anomaly, index) => (
                      <motion.tr
                        key={`${anomaly.project_id}-${anomaly.anomaly_type}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-red-50 border-b border-gray-200"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-start space-x-3">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 mb-1">{anomaly.title}</div>
                              <div className="text-sm text-gray-700 mb-2 font-medium">ID: {anomaly.project_id}</div>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1 text-gray-500" />
                                  <span>Detected: {new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                  <Target className="w-3 h-3 mr-1 text-gray-500" />
                                  <span>Confidence: 95%</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <Button size="sm" variant="outline" className="h-8 px-2">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-2">
                                <FileText className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getAnomalyIcon(anomaly.anomaly_type)}
                            <span className="text-sm text-gray-800 font-medium">{anomaly.anomaly_type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getSeverityBadge(anomaly.severity)}</TableCell>
                        <TableCell className="text-gray-800 font-medium">{anomaly.department}</TableCell>
                        <TableCell className="text-gray-800 font-medium">{anomaly.state}</TableCell>
                        <TableCell className="font-mono">
                          <span className="text-gray-800 font-semibold">{formatCurrency(anomaly.amount_involved)}</span>
                          {anomaly.percentage > 0 && (
                            <div className="text-xs text-gray-700">
                              {anomaly.percentage.toFixed(1)}%
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-800">{anomaly.description}</p>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
