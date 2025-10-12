'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, Filter, Target, TrendingUp, DollarSign, Clock, MapPin, Building, Users, AlertCircle, CheckCircle, BarChart3, Eye, Download, FileText, Calendar, Percent } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Project } from '@/lib/anomalies';
import Link from 'next/link';

type SortField = 'title' | 'department' | 'state' | 'sanction_amount' | 'released_amount' | 'spent_amount' | 'status';
type SortDirection = 'asc' | 'desc';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects);
        setFilteredProjects(data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.vendor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, sortField, sortDirection, statusFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  };

  const getProgressPercentage = (project: Project) => {
    return project.sanction_amount > 0 ? (project.released_amount / project.sanction_amount) * 100 : 0;
  };

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
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Projects</h1>
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
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Target className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Government Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive database of government projects with detailed financial tracking, 
              progress monitoring, and transparency metrics
            </p>
          </div>
        </motion.div>

        {/* Project Overview Statistics */}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{projects.length}</h3>
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
                  ₹{projects.reduce((sum, p) => sum + p.sanction_amount, 0) / 10000000}Cr
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
                  ₹{projects.reduce((sum, p) => sum + p.released_amount, 0) / 10000000}Cr
                </h3>
                <p className="text-sm text-gray-600">Funds Released</p>
                <div className="mt-3 flex items-center text-sm text-indigo-600">
                  <Percent className="w-4 h-4 mr-1" />
                  <span>{((projects.reduce((sum, p) => sum + p.released_amount, 0) / projects.reduce((sum, p) => sum + p.sanction_amount, 0)) * 100).toFixed(1)}% of sanctioned</span>
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
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Spent</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  ₹{projects.reduce((sum, p) => sum + p.spent_amount, 0) / 10000000}Cr
                </h3>
                <p className="text-sm text-gray-600">Total Expenditure</p>
                <div className="mt-3 flex items-center text-sm text-purple-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Real-time tracking</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Project Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Project Insights & Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Department Distribution</h4>
                  <p className="text-sm text-gray-600">
                    Projects span across {new Set(projects.map(p => p.department)).size} different departments
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Geographic Coverage</h4>
                  <p className="text-sm text-gray-600">
                    Projects active in {new Set(projects.map(p => p.state)).size} states and union territories
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vendor Network</h4>
                  <p className="text-sm text-gray-600">
                    {new Set(projects.map(p => p.vendor)).size} unique vendors and contractors involved
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900">
                <Filter className="w-5 h-5" />
                <span>Filters & Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      placeholder="Search projects, departments, states, or vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Projects Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">
                Projects ({filteredProjects.length} of {projects.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
                        onClick={() => handleSort('title')}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-900">Project Title</span>
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
                        onClick={() => handleSort('department')}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-900">Department</span>
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
                        onClick={() => handleSort('state')}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-900">State</span>
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
                        onClick={() => handleSort('sanction_amount')}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-900">Sanctioned</span>
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
                        onClick={() => handleSort('released_amount')}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-900">Released</span>
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
                        onClick={() => handleSort('spent_amount')}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-900">Spent</span>
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center space-x-1">
                          <span className="text-gray-900">Status</span>
                          <ArrowUpDown className="w-4 h-4 text-gray-600" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project, index) => (
                      <motion.tr
                        key={project.project_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-blue-50 border-b border-gray-200"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-start space-x-3">
                            <div className="flex-1">
                              <Link href={`/projects/${project.project_id}`} className="font-semibold text-blue-600 hover:text-blue-800 hover:underline mb-1 block">
                                {project.title}
                              </Link>
                              <div className="text-sm text-gray-500 mb-2">ID: {project.project_id}</div>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  <span>Started: {new Date().toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>Duration: 24 months</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                              <Link href={`/projects/${project.project_id}`}>
                                <Button size="sm" variant="outline" className="h-8 px-2">
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </Link>
                              <Button size="sm" variant="outline" className="h-8 px-2">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-900">{project.department}</TableCell>
                        <TableCell className="text-gray-900">{project.state}</TableCell>
                        <TableCell className="font-mono text-gray-900 font-semibold">{formatCurrency(project.sanction_amount)}</TableCell>
                        <TableCell className="font-mono">
                          <div>
                            <span className="text-gray-900 font-semibold">{formatCurrency(project.released_amount)}</span>
                            <div className="text-xs text-gray-600">
                              {getProgressPercentage(project).toFixed(1)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">
                          <div>
                            <span className="text-gray-900 font-semibold">{formatCurrency(project.spent_amount)}</span>
                            <div className="text-xs text-gray-600">
                              {project.released_amount > 0 ? 
                                ((project.spent_amount / project.released_amount) * 100).toFixed(1) + '%' : 
                                '0%'
                              }
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(project.status)}</TableCell>
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
