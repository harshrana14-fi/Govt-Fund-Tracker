'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  Building, 
  MapPin, 
  Calendar, 
  Users, 
  Target, 
  BarChart3, 
  PieChart, 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  Percent,
  Shield,
  Brain,
  Zap,
  AlertCircle,
  CheckSquare,
  XCircle
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

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  department: string;
  state: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAllocated: number;
  totalReleased: number;
  totalSpent: number;
  organizations: Organization[];
  fundFlow: FundFlow[];
  aiAnalysis: AIAnalysis;
  timeline: TimelineEvent[];
}

interface Organization {
  id: string;
  name: string;
  type: 'Contractor' | 'Vendor' | 'NGO' | 'Government Agency';
  allocatedAmount: number;
  receivedAmount: number;
  utilizedAmount: number;
  utilizationRate: number;
  status: 'Active' | 'Completed' | 'Under Review' | 'Suspended';
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  performance: {
    rating: number;
    onTimeDelivery: boolean;
    qualityScore: number;
  };
}

interface FundFlow {
  date: string;
  type: 'Allocation' | 'Release' | 'Expenditure';
  amount: number;
  organization: string;
  purpose: string;
  status: 'Completed' | 'Pending' | 'Under Review';
}

interface AIAnalysis {
  leakageRisk: 'Low' | 'Medium' | 'High';
  riskScore: number;
  anomalies: Anomaly[];
  recommendations: string[];
  overallHealth: 'Good' | 'Fair' | 'Poor';
}

interface Anomaly {
  id: string;
  type: 'Unusual Spending Pattern' | 'Delayed Payments' | 'Over Expenditure' | 'Under Utilization';
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  amount: number;
  detectedDate: string;
  status: 'Open' | 'Under Investigation' | 'Resolved';
}

interface TimelineEvent {
  date: string;
  event: string;
  type: 'Milestone' | 'Payment' | 'Issue' | 'Update';
  description: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'organizations' | 'funds' | 'analysis'>('overview');

  useEffect(() => {
    // Simulate fetching project details
    const fetchProjectDetails = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProject({
          id: params.id as string,
          title: 'Smart City Infrastructure Development',
          description: 'Comprehensive development of smart city infrastructure including digital connectivity, smart transportation, and citizen services.',
          department: 'Ministry of Urban Development',
          state: 'Maharashtra',
          startDate: '2023-01-15',
          endDate: '2025-12-31',
          status: 'In Progress',
          totalAllocated: 500000000,
          totalReleased: 350000000,
          totalSpent: 280000000,
          organizations: [
            {
              id: 'org1',
              name: 'TechCorp Solutions Pvt Ltd',
              type: 'Contractor',
              allocatedAmount: 200000000,
              receivedAmount: 150000000,
              utilizedAmount: 120000000,
              utilizationRate: 80,
              status: 'Active',
              contactInfo: {
                email: 'contact@techcorp.com',
                phone: '+91-9876543210',
                address: 'Mumbai, Maharashtra'
              },
              performance: {
                rating: 4.2,
                onTimeDelivery: true,
                qualityScore: 85
              }
            },
            {
              id: 'org2',
              name: 'Urban Development NGO',
              type: 'NGO',
              allocatedAmount: 100000000,
              receivedAmount: 80000000,
              utilizedAmount: 60000000,
              utilizationRate: 75,
              status: 'Active',
              contactInfo: {
                email: 'info@urbandev.org',
                phone: '+91-9876543211',
                address: 'Pune, Maharashtra'
              },
              performance: {
                rating: 3.8,
                onTimeDelivery: false,
                qualityScore: 78
              }
            }
          ],
          fundFlow: [
            { date: '2023-01-15', type: 'Allocation', amount: 500000000, organization: 'Ministry', purpose: 'Initial Project Allocation', status: 'Completed' },
            { date: '2023-03-01', type: 'Release', amount: 100000000, organization: 'TechCorp Solutions', purpose: 'Phase 1 Infrastructure', status: 'Completed' },
            { date: '2023-06-15', type: 'Expenditure', amount: 80000000, organization: 'TechCorp Solutions', purpose: 'Digital Infrastructure Setup', status: 'Completed' },
            { date: '2023-09-01', type: 'Release', amount: 150000000, organization: 'TechCorp Solutions', purpose: 'Phase 2 Development', status: 'Completed' },
            { date: '2023-12-15', type: 'Expenditure', amount: 120000000, organization: 'TechCorp Solutions', purpose: 'Smart Transportation System', status: 'Completed' }
          ],
          aiAnalysis: {
            leakageRisk: 'Medium',
            riskScore: 65,
            anomalies: [
              {
                id: 'anom1',
                type: 'Unusual Spending Pattern',
                severity: 'Medium',
                description: 'Higher than expected expenditure in Q3 2023',
                amount: 15000000,
                detectedDate: '2023-10-15',
                status: 'Under Investigation'
              },
              {
                id: 'anom2',
                type: 'Delayed Payments',
                severity: 'Low',
                description: 'Payment delays to Urban Development NGO',
                amount: 5000000,
                detectedDate: '2023-11-01',
                status: 'Open'
              }
            ],
            recommendations: [
              'Implement stricter monitoring for TechCorp Solutions',
              'Review payment schedules for better cash flow',
              'Conduct third-party audit for Q3 expenditures',
              'Establish weekly progress reviews'
            ],
            overallHealth: 'Fair'
          },
          timeline: [
            { date: '2023-01-15', event: 'Project Launch', type: 'Milestone', description: 'Smart City project officially launched' },
            { date: '2023-03-01', event: 'Phase 1 Funding', type: 'Payment', description: '₹100 Cr released for initial infrastructure' },
            { date: '2023-06-15', event: 'Digital Infrastructure Complete', type: 'Milestone', description: 'Basic digital connectivity established' },
            { date: '2023-09-01', event: 'Phase 2 Funding', type: 'Payment', description: '₹150 Cr released for advanced features' },
            { date: '2023-10-15', event: 'Anomaly Detected', type: 'Issue', description: 'AI detected unusual spending pattern' }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchProjectDetails();
  }, [params.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The requested project could not be found.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const fundFlowData = [
    { month: 'Jan', allocated: 500, released: 0, spent: 0 },
    { month: 'Mar', allocated: 500, released: 100, spent: 0 },
    { month: 'Jun', allocated: 500, released: 100, spent: 80 },
    { month: 'Sep', allocated: 500, released: 250, spent: 200 },
    { month: 'Dec', allocated: 500, released: 350, spent: 280 }
  ];

  const organizationData = project.organizations.map(org => ({
    name: org.name,
    allocated: org.allocatedAmount / 10000000,
    utilized: org.utilizedAmount / 10000000,
    utilization: org.utilizationRate
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                <p className="text-gray-600">Project ID: {project.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                {project.status}
              </Badge>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'organizations', label: 'Organizations', icon: Building },
              { id: 'funds', label: 'Fund Flow', icon: DollarSign },
              { id: 'analysis', label: 'AI Analysis', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Summary */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Project Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700">{project.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Department</label>
                          <p className="text-gray-900">{project.department}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">State</label>
                          <p className="text-gray-900">{project.state}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Start Date</label>
                          <p className="text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">End Date</label>
                          <p className="text-gray-900">{new Date(project.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Fund Flow Chart */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Fund Flow Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={fundFlowData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value} Cr`, '']} />
                        <Line type="monotone" dataKey="allocated" stroke="#3B82F6" strokeWidth={2} name="Allocated" />
                        <Line type="monotone" dataKey="released" stroke="#10B981" strokeWidth={2} name="Released" />
                        <Line type="monotone" dataKey="spent" stroke="#F59E0B" strokeWidth={2} name="Spent" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Financial Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Allocated</span>
                        <span className="font-semibold text-green-600">{formatCurrency(project.totalAllocated)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Released</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(project.totalReleased)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Spent</span>
                        <span className="font-semibold text-orange-600">{formatCurrency(project.totalSpent)}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Utilization Rate</span>
                          <span className="font-semibold text-gray-900">
                            {((project.totalSpent / project.totalReleased) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">AI Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Leakage Risk</span>
                        <Badge className={getRiskColor(project.aiAnalysis.leakageRisk)}>
                          {project.aiAnalysis.leakageRisk}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Risk Score</span>
                        <span className="font-semibold text-gray-900">{project.aiAnalysis.riskScore}/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Overall Health</span>
                        <Badge className={project.aiAnalysis.overallHealth === 'Good' ? 'bg-green-100 text-green-800' : 
                                         project.aiAnalysis.overallHealth === 'Fair' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                          {project.aiAnalysis.overallHealth}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'organizations' && (
            <div className="space-y-6">
              {project.organizations.map((org, index) => (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center space-x-2 text-gray-900">
                            <Building className="w-5 h-5" />
                            <span>{org.name}</span>
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{org.type}</p>
                        </div>
                        <Badge className={org.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {org.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Financial Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Allocated</span>
                              <span className="text-sm font-medium text-gray-900">{formatCurrency(org.allocatedAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Received</span>
                              <span className="text-sm font-medium text-gray-900">{formatCurrency(org.receivedAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Utilized</span>
                              <span className="text-sm font-medium text-gray-900">{formatCurrency(org.utilizedAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Utilization Rate</span>
                              <span className="text-sm font-medium text-gray-900">{org.utilizationRate}%</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Rating</span>
                              <span className="text-sm font-medium text-gray-900">{org.performance.rating}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">On-time Delivery</span>
                              <span className="text-sm font-medium">
                                {org.performance.onTimeDelivery ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-500" />
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Quality Score</span>
                              <span className="text-sm font-medium text-gray-900">{org.performance.qualityScore}%</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="text-gray-600">Email:</span>
                              <p className="font-medium text-gray-900">{org.contactInfo.email}</p>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Phone:</span>
                              <p className="font-medium text-gray-900">{org.contactInfo.phone}</p>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Address:</span>
                              <p className="font-medium text-gray-900">{org.contactInfo.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'funds' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Fund Flow Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.fundFlow.map((flow, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            flow.type === 'Allocation' ? 'bg-green-500' :
                            flow.type === 'Release' ? 'bg-blue-500' : 'bg-orange-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-900">{flow.type}</p>
                            <p className="text-sm text-gray-600">{flow.purpose}</p>
                            <p className="text-xs text-gray-500">{flow.organization}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(flow.amount)}</p>
                          <p className="text-sm text-gray-600">{new Date(flow.date).toLocaleDateString()}</p>
                          <Badge className={flow.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {flow.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* AI Analysis Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <Brain className="w-5 h-5" />
                    <span>AI-Powered Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">{project.aiAnalysis.riskScore}</div>
                      <p className="text-sm text-gray-600">Risk Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">{project.aiAnalysis.anomalies.length}</div>
                      <p className="text-sm text-gray-600">Anomalies Detected</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">{project.aiAnalysis.recommendations.length}</div>
                      <p className="text-sm text-gray-600">Recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detected Anomalies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Detected Anomalies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.aiAnalysis.anomalies.map((anomaly, index) => (
                      <motion.div
                        key={anomaly.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{anomaly.type}</h4>
                            <p className="text-sm text-gray-600">{anomaly.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getSeverityColor(anomaly.severity)}>
                              {anomaly.severity}
                            </Badge>
                            <Badge className={anomaly.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {anomaly.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>Amount: {formatCurrency(anomaly.amount)}</span>
                          <span>Detected: {new Date(anomaly.detectedDate).toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <Zap className="w-5 h-5" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.aiAnalysis.recommendations.map((recommendation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
                      >
                        <CheckSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                        <p className="text-sm text-gray-700">{recommendation}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
