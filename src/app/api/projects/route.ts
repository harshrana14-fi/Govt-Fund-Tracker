import { NextResponse } from 'next/server';
import projectsData from '@/data/projects.json';
import { detectAnomalies, type Project } from '@/lib/anomalies';

export async function GET() {
  try {
    const projects = projectsData as Project[];
    const anomalies = detectAnomalies(projects);
    
    return NextResponse.json({
      projects,
      anomalies,
      summary: {
        totalProjects: projects.length,
        totalSanctioned: projects.reduce((sum, p) => sum + p.sanction_amount, 0),
        totalReleased: projects.reduce((sum, p) => sum + p.released_amount, 0),
        totalSpent: projects.reduce((sum, p) => sum + p.spent_amount, 0),
        totalAnomalies: anomalies.length
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects data' },
      { status: 500 }
    );
  }
}
