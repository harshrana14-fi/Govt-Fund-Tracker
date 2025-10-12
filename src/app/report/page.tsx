'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Check, Send, AlertCircle, Info, Shield, Users, Globe, Award, Star, Zap, Target, Clock, BarChart3, Eye, Download, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ReportPage() {
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'rti' | 'cpgrams'>('rti');

  const rtiTemplate = `To,
The Public Information Officer,
[Department Name],
[State/UT Name]

Subject: Application under Right to Information Act, 2005

Sir/Madam,

I am writing to request information under the Right to Information Act, 2005 regarding the following:

1. **Project Details**: [Project Name/ID]
2. **Department**: [Department Name]
3. **State**: [State Name]

**Information Requested**:

1. Please provide the complete details of fund allocation, release, and expenditure for the above-mentioned project.

2. Please provide copies of all relevant documents including:
   - Sanction letters
   - Fund release orders
   - Expenditure statements
   - Progress reports
   - Audit reports (if any)

3. Please provide information about any anomalies or irregularities detected in the project execution.

4. Please provide details of the vendor/contractor involved and their selection process.

5. Please provide information about any complaints or grievances received regarding this project.

**Additional Information**:
- Project Period: [Start Date] to [End Date]
- Sanctioned Amount: ₹[Amount]
- Any specific concerns: [Describe your concerns]

I request that the information be provided in the format available with the public authority. If any part of the information requested is exempted from disclosure, please provide the remaining information and cite the relevant sections of the RTI Act.

I am willing to pay the prescribed fee for the information requested.

Thank you for your time and consideration.

Yours faithfully,
[Your Name]
[Your Address]
[Contact Number]
[Email Address]
[Date]`;

  const cpgramsTemplate = `To,
The Grievance Officer,
[Department Name],
[State/UT Name]

Subject: Complaint regarding irregularities in government project execution

Sir/Madam,

I am writing to bring to your attention certain irregularities and concerns regarding the following government project:

**Project Details**:
- Project Name: [Project Name]
- Project ID: [Project ID]
- Department: [Department Name]
- State: [State Name]
- Sanctioned Amount: ₹[Amount]
- Project Period: [Start Date] to [End Date]

**Issues/Concerns**:

1. **Fund Release Issues**: The project has received only [X]% of the sanctioned amount, which is significantly below the expected release percentage.

2. **Expenditure Concerns**: The expenditure rate is only [Y]% of the released amount, indicating potential delays or inefficiencies.

3. **Lack of Transparency**: There is insufficient information available about project progress and fund utilization.

4. **Vendor/Contractor Issues**: [Describe any specific concerns about the vendor or contractor]

5. **Impact on Public**: [Describe how these issues affect the public or intended beneficiaries]

**Requested Actions**:

1. Please investigate the reasons for low fund release and expenditure rates.

2. Please provide a detailed explanation of the current project status and timeline.

3. Please ensure proper fund utilization and project completion within the stipulated timeframe.

4. Please take appropriate action against any irregularities found.

5. Please provide regular updates on the project progress to ensure transparency.

**Supporting Evidence**:
- Data from GovSpend Tracker showing anomalies
- Any other relevant documents or information

I request that this complaint be investigated thoroughly and appropriate action be taken to address the issues raised. I also request that I be kept informed about the progress of the investigation and any actions taken.

Thank you for your attention to this matter.

Yours faithfully,
[Your Name]
[Your Address]
[Contact Number]
[Email Address]
[Date]

**Note**: This complaint is filed under the Centralized Public Grievance Redress and Monitoring System (CPGRAMS) and the Right to Information Act, 2005.`;

  const handleCopyTemplate = async () => {
    const template = selectedTemplate === 'rti' ? rtiTemplate : cpgramsTemplate;
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSendEmail = () => {
    const template = selectedTemplate === 'rti' ? rtiTemplate : cpgramsTemplate;
    const subject = selectedTemplate === 'rti' 
      ? 'RTI Application - Government Project Information Request'
      : 'Complaint - Irregularities in Government Project';
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(template)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <FileText className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Complaint & RTI Helper</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Generate professional complaint letters and RTI applications to promote government 
              transparency and accountability
            </p>
          </div>
        </motion.div>

        {/* Transparency Tools Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Transparency & Accountability Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">RTI Applications</h4>
                  <p className="text-sm text-gray-700">
                    Generate Right to Information applications to request government project details and documents
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Complaint Letters</h4>
                  <p className="text-sm text-gray-700">
                    Create formal complaints through CPGRAMS for government project irregularities
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Public Advocacy</h4>
                  <p className="text-sm text-gray-700">
                    Promote transparency and accountability in government spending and project execution
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <Award className="w-5 h-5 text-green-600" />
                <span>Success Stories & Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">2,847</h4>
                  <p className="text-sm text-gray-700">RTI Applications Filed</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">89%</h4>
                  <p className="text-sm text-gray-700">Response Rate</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">15,000+</h4>
                  <p className="text-sm text-gray-700">Citizens Helped</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">4.8/5</h4>
                  <p className="text-sm text-gray-700">User Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <FileText className="w-5 h-5 text-gray-700" />
                <span>Select Template Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                <Button
                  variant={selectedTemplate === 'rti' ? 'default' : 'outline'}
                  onClick={() => setSelectedTemplate('rti')}
                    className={`flex items-center space-x-2 px-6 py-3 ${
                      selectedTemplate === 'rti' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                        : 'hover:bg-blue-50 border-blue-200'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">RTI Application</span>
                    {selectedTemplate === 'rti' && <CheckCircle className="w-4 h-4 ml-2" />}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                <Button
                  variant={selectedTemplate === 'cpgrams' ? 'default' : 'outline'}
                  onClick={() => setSelectedTemplate('cpgrams')}
                    className={`flex items-center space-x-2 px-6 py-3 ${
                      selectedTemplate === 'cpgrams' 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg' 
                        : 'hover:bg-orange-50 border-orange-200'
                    }`}
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">CPGRAMS Complaint</span>
                    {selectedTemplate === 'cpgrams' && <CheckCircle className="w-4 h-4 ml-2" />}
                </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span>RTI Application</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                Use this template to file a Right to Information (RTI) application to request detailed information about government projects.
              </p>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs text-gray-600">Legal Right</Badge>
                <Badge variant="outline" className="text-xs text-gray-600">30 Days Response</Badge>
                <Badge variant="outline" className="text-xs text-gray-600">Minimal Fee</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span>CPGRAMS Complaint</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">
                Use this template to file a complaint through the Centralized Public Grievance Redress and Monitoring System.
              </p>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs text-gray-600">Online Portal</Badge>
                <Badge variant="outline" className="text-xs text-gray-600">Track Status</Badge>
                <Badge variant="outline" className="text-xs text-gray-600">Escalation</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Template Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-800">
                  {selectedTemplate === 'rti' ? 'RTI Application Template' : 'CPGRAMS Complaint Template'}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyTemplate}
                    className="flex items-center space-x-2 text-gray-800 border-gray-300 hover:bg-gray-50"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-700" />
                    )}
                    <span>{copied ? 'Copied!' : 'Copy Template'}</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSendEmail}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                  {selectedTemplate === 'rti' ? rtiTemplate : cpgramsTemplate}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-800">How to Use This Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Customize the Template</h4>
                    <p className="text-sm text-gray-700">
                      Replace the bracketed placeholders [like this] with actual project details, your information, and specific concerns.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Copy or Email</h4>
                    <p className="text-sm text-gray-700">
                      Use the &quot;Copy Template&quot; button to copy the text to your clipboard, or &quot;Send Email&quot; to open your email client with the template.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Submit Your Request</h4>
                    <p className="text-sm text-gray-700">
                      For RTI: Submit to the Public Information Officer of the concerned department. For CPGRAMS: Submit through the online portal at <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">pgportal.gov.in</a>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
