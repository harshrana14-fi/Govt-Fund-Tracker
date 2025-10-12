import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import axios from 'axios';

interface FundData {
  scheme: string;
  ministry: string;
  allocated2021: number;
  expenditure2021: number;
  allocated2022: number;
  expenditure2022: number;
  state?: string;
}

interface RawCSVData {
  [key: string]: string;
}

export async function GET() {
  try {
    const apiUrl = 'https://api.data.gov.in/resource/9f51269f-d829-4bc0-a24f-012215a81502?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=csv';
    
    // Fetch CSV data
    const response = await axios.get(apiUrl, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Accept': 'text/csv',
        'User-Agent': 'GovSpend-Tracker/1.0'
      }
    });

    if (!response.data) {
      throw new Error('No data received from API');
    }

    // Parse CSV data
    const parseResult = Papa.parse<RawCSVData>(response.data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim()
    });

    if (parseResult.errors.length > 0) {
      console.warn('CSV parsing errors:', parseResult.errors);
    }

    // Normalize the data
    const normalizedData: FundData[] = parseResult.data
      .filter(row => row && Object.keys(row).length > 0)
      .map(row => {
        // Helper function to parse numbers and handle various formats
        const parseNumber = (value: string): number => {
          if (!value || value === '' || value === 'NA' || value === '-') return 0;
          
          // Remove commas and convert to number
          const cleaned = value.replace(/,/g, '').replace(/₹/g, '').replace(/Rs\./g, '').trim();
          const parsed = parseFloat(cleaned);
          return isNaN(parsed) ? 0 : parsed;
        };

        // Helper function to clean text fields
        const cleanText = (value: string): string => {
          if (!value || value === 'NA' || value === '-') return '';
          return value.trim();
        };

        return {
          scheme: cleanText(row['Programme/Schemes'] || row['Scheme Name'] || row['scheme_name'] || row['Scheme'] || ''),
          ministry: cleanText(row['Ministry/Department'] || row['ministry'] || row['Ministry'] || ''),
          allocated2021: parseNumber(row['2021-22 - Allocated Fund'] || row['Allocation 2021-22'] || row['allocation_2021'] || row['2021-22 Allocation'] || '0'),
          expenditure2021: parseNumber(row['2021-22 - Expenditure'] || row['Expenditure 2021-22'] || row['expenditure_2021'] || row['2021-22 Expenditure'] || '0'),
          allocated2022: parseNumber(row['2022-23 - Allocated Fund'] || row['Allocation 2022-23'] || row['allocation_2022'] || row['2022-23 Allocation'] || '0'),
          expenditure2022: parseNumber(row['2022-23 - Expenditure'] || row['Expenditure 2022-23'] || row['expenditure_2022'] || row['2022-23 Expenditure'] || '0'),
          state: cleanText(row['State'] || row['state'] || row['State/UT'] || '')
        };
      })
      .filter(item => item.scheme && item.scheme !== ''); // Filter out empty schemes

    // Calculate summary statistics
    const summary = {
      totalAllocation2021: normalizedData.reduce((sum, item) => sum + item.allocated2021, 0),
      totalAllocation2022: normalizedData.reduce((sum, item) => sum + item.allocated2022, 0),
      totalExpenditure2021: normalizedData.reduce((sum, item) => sum + item.expenditure2021, 0),
      totalExpenditure2022: normalizedData.reduce((sum, item) => sum + item.expenditure2022, 0),
      totalSchemes: normalizedData.length,
      lastUpdated: new Date().toISOString()
    };

    // Get unique ministries and states for filtering
    const ministries = [...new Set(normalizedData.map(item => item.ministry).filter(Boolean))].sort();
    const states = [...new Set(normalizedData.map(item => item.state).filter(Boolean))].sort();

    // Identify potential anomalies (low expenditure vs allocation)
    const anomalies = normalizedData
      .map(item => {
        const utilization2021 = item.allocated2021 > 0 ? (item.expenditure2021 / item.allocated2021) * 100 : 0;
        const utilization2022 = item.allocated2022 > 0 ? (item.expenditure2022 / item.allocated2022) * 100 : 0;
        
        return {
          ...item,
          utilization2021,
          utilization2022,
          isAnomaly: utilization2021 < 50 || utilization2022 < 50, // Less than 50% utilization
          anomalySeverity: utilization2021 < 25 || utilization2022 < 25 ? 'high' : 'medium'
        };
      })
      .filter(item => item.isAnomaly);

    return NextResponse.json({
      success: true,
      data: normalizedData,
      summary,
      filters: {
        ministries,
        states
      },
      anomalies,
      meta: {
        totalRecords: normalizedData.length,
        anomalyCount: anomalies.length,
        dataSource: 'data.gov.in',
        apiUrl
      }
    });

  } catch (error) {
    console.error('Error fetching fund data:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch fund allocation data',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
