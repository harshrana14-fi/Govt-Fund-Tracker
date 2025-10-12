import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    
    // Simulate fetching project details from database
    // In a real application, this would query your database
    const projectDetails = {
      id: projectId,
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
        { 
          date: '2023-01-15', 
          type: 'Allocation', 
          amount: 500000000, 
          organization: 'Ministry', 
          purpose: 'Initial Project Allocation', 
          status: 'Completed' 
        },
        { 
          date: '2023-03-01', 
          type: 'Release', 
          amount: 100000000, 
          organization: 'TechCorp Solutions', 
          purpose: 'Phase 1 Infrastructure', 
          status: 'Completed' 
        },
        { 
          date: '2023-06-15', 
          type: 'Expenditure', 
          amount: 80000000, 
          organization: 'TechCorp Solutions', 
          purpose: 'Digital Infrastructure Setup', 
          status: 'Completed' 
        },
        { 
          date: '2023-09-01', 
          type: 'Release', 
          amount: 150000000, 
          organization: 'TechCorp Solutions', 
          purpose: 'Phase 2 Development', 
          status: 'Completed' 
        },
        { 
          date: '2023-12-15', 
          type: 'Expenditure', 
          amount: 120000000, 
          organization: 'TechCorp Solutions', 
          purpose: 'Smart Transportation System', 
          status: 'Completed' 
        }
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
        { 
          date: '2023-01-15', 
          event: 'Project Launch', 
          type: 'Milestone', 
          description: 'Smart City project officially launched' 
        },
        { 
          date: '2023-03-01', 
          event: 'Phase 1 Funding', 
          type: 'Payment', 
          description: '₹100 Cr released for initial infrastructure' 
        },
        { 
          date: '2023-06-15', 
          event: 'Digital Infrastructure Complete', 
          type: 'Milestone', 
          description: 'Basic digital connectivity established' 
        },
        { 
          date: '2023-09-01', 
          event: 'Phase 2 Funding', 
          type: 'Payment', 
          description: '₹150 Cr released for advanced features' 
        },
        { 
          date: '2023-10-15', 
          event: 'Anomaly Detected', 
          type: 'Issue', 
          description: 'AI detected unusual spending pattern' 
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: projectDetails
    });

  } catch (error) {
    console.error('Error fetching project details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch project details',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
