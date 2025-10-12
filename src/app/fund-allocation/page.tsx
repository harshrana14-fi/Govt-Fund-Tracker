'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Target, 
  Building,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  TrendingDown,
  Eye,
  FileText,
  Calendar,
  MapPin,
  Users,
  Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import Link from 'next/link';

interface FundData {
  scheme: string;
  ministry: string;
  allocated2021: number;
  expenditure2021: number;
  allocated2022: number;
  expenditure2022: number;
  state?: string;
  utilization2021?: number;
  utilization2022?: number;
  isAnomaly?: boolean;
  anomalySeverity?: 'high' | 'medium';
}

interface FundDataResponse {
  success: boolean;
  data: FundData[];
  summary: {
    totalAllocation2021: number;
    totalAllocation2022: number;
    totalExpenditure2021: number;
    totalExpenditure2022: number;
    totalSchemes: number;
    lastUpdated: string;
  };
  filters: {
    ministries: string[];
    states: string[];
  };
  anomalies: FundData[];
  meta: {
    totalRecords: number;
    anomalyCount: number;
    dataSource: string;
  };
}

export default function FundAllocationDashboard() {
  const [fundData, setFundData] = useState<FundDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMinistry, setSelectedMinistry] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'allocation' | 'expenditure' | 'utilization'>('allocation');

  useEffect(() => {
    fetchFundData();
  }, []);

  const fetchFundData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/fund-data');
      const data = await response.json();
      
      if (data.success) {
        setFundData(data);
      } else {
        setError(data.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error fetching fund data:', err);
    } finally {
      setLoading(false);
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

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Filter data based on selected filters
  const filteredData = fundData?.data.filter(item => {
    const ministryMatch = selectedMinistry === 'all' || item.ministry === selectedMinistry;
    const stateMatch = selectedState === 'all' || item.state === selectedState;
    return ministryMatch && stateMatch;
  }) || [];

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'allocation':
        return b.allocated2022 - a.allocated2022;
      case 'expenditure':
        return b.expenditure2022 - a.expenditure2022;
      case 'utilization':
        const utilA = a.allocated2022 > 0 ? (a.expenditure2022 / a.allocated2022) * 100 : 0;
        const utilB = b.allocated2022 > 0 ? (b.expenditure2022 / b.allocated2022) * 100 : 0;
        return utilB - utilA;
      default:
        return 0;
    }
  });

  // Get top 10 schemes for chart
  const topSchemes = sortedData.slice(0, 10);

  // Prepare chart data
  const chartData = topSchemes.map(scheme => ({
    name: scheme.scheme.length > 20 ? scheme.scheme.substring(0, 20) + '...' : scheme.scheme,
    fullName: scheme.scheme,
    allocation2021: scheme.allocated2021,
    allocation2022: scheme.allocated2022,
    expenditure2021: scheme.expenditure2021,
    expenditure2022: scheme.expenditure2022,
    utilization: scheme.allocated2022 > 0 ? (scheme.expenditure2022 / scheme.allocated2022) * 100 : 0
  }));

  // Ministry distribution data
  const ministryData = fundData?.data.reduce((acc, item) => {
    const ministry = item.ministry || 'Unknown';
    if (!acc[ministry]) {
      acc[ministry] = { ministry, totalAllocation: 0, totalExpenditure: 0, schemes: 0 };
    }
    acc[ministry].totalAllocation += item.allocated2022;
    acc[ministry].totalExpenditure += item.expenditure2022;
    acc[ministry].schemes += 1;
    return acc;
  }, {} as Record<string, { ministry: string; totalAllocation: number; totalExpenditure: number; schemes: number }>) || {};

  const ministryChartData = Object.values(ministryData)
    .sort((a, b) => b.totalAllocation - a.totalAllocation)
    .slice(0, 8)
    .map(item => ({
      name: item.ministry.length > 15 ? item.ministry.substring(0, 15) + '...' : item.ministry,
      fullName: item.ministry,
      allocation: item.totalAllocation,
      expenditure: item.totalExpenditure,
      utilization: item.totalAllocation > 0 ? (item.totalExpenditure / item.totalAllocation) * 100 : 0
    }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  if (loading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchFundData} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!fundData) return null;

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
              <h1 className="text-2xl font-bold text-gray-900">Fund Allocation Dashboard</h1>
              <p className="text-gray-600">Scheme-wise fund allocations and expenditure analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </Link>
              <Button onClick={fetchFundData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
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
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">2021-22</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(fundData.summary.totalAllocation2021)}
                </h3>
                <p className="text-sm text-gray-600">Total Allocation</p>
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>Fund Allocation</span>
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
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">2022-23</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(fundData.summary.totalAllocation2022)}
                </h3>
                <p className="text-sm text-gray-600">Total Allocation</p>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <Target className="w-4 h-4 mr-1" />
                  <span>Current Year</span>
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
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Schemes</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatNumber(fundData.summary.totalSchemes)}
                </h3>
                <p className="text-sm text-gray-600">Total Schemes</p>
                <div className="mt-3 flex items-center text-sm text-purple-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Active Programs</span>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {fundData.meta.anomalyCount}
                </h3>
                <p className="text-sm text-gray-600">Low Utilization</p>
                <div className="mt-3 flex items-center text-sm text-red-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span>Need Attention</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900">
                <Filter className="w-5 h-5 text-blue-600" />
                <span>Filters & Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ministry</label>
                  <select
                    value={selectedMinistry}
                    onChange={(e) => setSelectedMinistry(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Ministries</option>
                    {fundData.filters.ministries.map(ministry => (
                      <option key={ministry} value={ministry}>{ministry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All States</option>
                    {fundData.filters.states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'allocation' | 'expenditure' | 'utilization')}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="allocation">Allocation Amount</option>
                    <option value="expenditure">Expenditure Amount</option>
                    <option value="utilization">Utilization Rate</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Schemes Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Top 10 Schemes by Allocation (2022-23)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={12}
                      />
                      <YAxis 
                        tickFormatter={(value) => formatCurrency(value)}
                        fontSize={12}
                      />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(label, payload) => {
                          const data = payload?.[0]?.payload;
                          return data?.fullName || label;
                        }}
                      />
                      <Bar dataKey="allocation2022" fill="#3B82F6" name="2022-23 Allocation" />
                      <Bar dataKey="allocation2021" fill="#10B981" name="2021-22 Allocation" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ministry Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <PieChart className="w-5 h-5 text-green-600" />
                  <span>Ministry-wise Allocation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={ministryChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="allocation"
                      >
                        {ministryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Anomalies Section */}
        {fundData.anomalies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Potential Anomalies - Low Fund Utilization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fundData.anomalies.slice(0, 5).map((anomaly, index) => (
                    <motion.div
                      key={anomaly.scheme}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{anomaly.scheme}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {anomaly.ministry}
                            </span>
                            {anomaly.state && (
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {anomaly.state}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-4 text-sm">
                              <span className="text-gray-600">
                                Allocation: {formatCurrency(anomaly.allocated2022)}
                              </span>
                              <span className="text-gray-600">
                                Expenditure: {formatCurrency(anomaly.expenditure2022)}
                              </span>
                              <span className="text-red-600 font-medium">
                                Utilization: {anomaly.utilization2022?.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Badge 
                                className={
                                  anomaly.anomalySeverity === 'high' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {anomaly.anomalySeverity === 'high' ? 'High Risk' : 'Medium Risk'}
                              </Badge>
                              <Link href="/report">
                                <Button size="sm" variant="outline">
                                  <FileText className="w-4 h-4 mr-1" />
                                  Report
                                </Button>
                              </Link>
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
        )}

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Scheme Details</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Scheme</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Ministry</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">2022-23 Allocation</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">2022-23 Expenditure</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Utilization %</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.slice(0, 20).map((scheme, index) => {
                      const utilization = scheme.allocated2022 > 0 ? (scheme.expenditure2022 / scheme.allocated2022) * 100 : 0;
                      return (
                        <motion.tr
                          key={scheme.scheme}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{scheme.scheme}</div>
                            {scheme.state && (
                              <div className="text-sm text-gray-500">{scheme.state}</div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-600">{scheme.ministry}</td>
                          <td className="py-3 px-4 text-right font-medium text-gray-900">
                            {formatCurrency(scheme.allocated2022)}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-gray-900">
                            {formatCurrency(scheme.expenditure2022)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className={`font-medium ${
                              utilization < 50 ? 'text-red-600' : 
                              utilization < 80 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {utilization.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Link href="/report">
                                <Button size="sm" variant="outline">
                                  <FileText className="w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
