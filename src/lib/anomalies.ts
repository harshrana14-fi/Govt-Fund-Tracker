export interface Project {
  project_id: string;
  title: string;
  department: string;
  state: string;
  sanction_amount: number;
  released_amount: number;
  spent_amount: number;
  vendor: string;
  status: string;
  start_date: string;
  expected_completion: string;
}

export interface Anomaly {
  project_id: string;
  title: string;
  department: string;
  state: string;
  anomaly_type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  amount_involved: number;
  percentage: number;
}

export function detectAnomalies(projects: Project[]): Anomaly[] {
  const anomalies: Anomaly[] = [];

  projects.forEach(project => {
    // Rule 1: Released amount is less than 80% of sanctioned amount
    const releasePercentage = (project.released_amount / project.sanction_amount) * 100;
    if (releasePercentage < 80) {
      anomalies.push({
        project_id: project.project_id,
        title: project.title,
        department: project.department,
        state: project.state,
        anomaly_type: 'Low Fund Release',
        description: `Only ${releasePercentage.toFixed(1)}% of sanctioned amount has been released`,
        severity: releasePercentage < 50 ? 'high' : releasePercentage < 70 ? 'medium' : 'low',
        amount_involved: project.sanction_amount - project.released_amount,
        percentage: releasePercentage
      });
    }

    // Rule 2: Spent amount is significantly less than released amount (less than 70%)
    const spendPercentage = (project.spent_amount / project.released_amount) * 100;
    if (spendPercentage < 70 && project.released_amount > 0) {
      anomalies.push({
        project_id: project.project_id,
        title: project.title,
        department: project.department,
        state: project.state,
        anomaly_type: 'Low Expenditure',
        description: `Only ${spendPercentage.toFixed(1)}% of released amount has been spent`,
        severity: spendPercentage < 30 ? 'high' : spendPercentage < 50 ? 'medium' : 'low',
        amount_involved: project.released_amount - project.spent_amount,
        percentage: spendPercentage
      });
    }

    // Rule 3: Over-expenditure (spent more than released)
    if (project.spent_amount > project.released_amount) {
      anomalies.push({
        project_id: project.project_id,
        title: project.title,
        department: project.department,
        state: project.state,
        anomaly_type: 'Over Expenditure',
        description: `Spent ₹${(project.spent_amount - project.released_amount).toLocaleString()} more than released amount`,
        severity: 'high',
        amount_involved: project.spent_amount - project.released_amount,
        percentage: ((project.spent_amount - project.released_amount) / project.released_amount) * 100
      });
    }

    // Rule 4: Projects with very high sanctioned amounts but low progress
    if (project.sanction_amount > 20000000 && releasePercentage < 30) {
      anomalies.push({
        project_id: project.project_id,
        title: project.title,
        department: project.department,
        state: project.state,
        anomaly_type: 'High Value Low Progress',
        description: `High value project (₹${(project.sanction_amount / 10000000).toFixed(1)}Cr) with only ${releasePercentage.toFixed(1)}% fund release`,
        severity: 'medium',
        amount_involved: project.sanction_amount,
        percentage: releasePercentage
      });
    }

    // Rule 5: Projects with same vendor getting multiple contracts (potential conflict of interest)
    const sameVendorProjects = projects.filter(p => p.vendor === project.vendor && p.project_id !== project.project_id);
    if (sameVendorProjects.length >= 2) {
      const totalAmount = sameVendorProjects.reduce((sum, p) => sum + p.sanction_amount, 0) + project.sanction_amount;
      anomalies.push({
        project_id: project.project_id,
        title: project.title,
        department: project.department,
        state: project.state,
        anomaly_type: 'Vendor Concentration',
        description: `Vendor "${project.vendor}" has ${sameVendorProjects.length + 1} contracts worth ₹${(totalAmount / 10000000).toFixed(1)}Cr`,
        severity: totalAmount > 50000000 ? 'high' : 'medium',
        amount_involved: totalAmount,
        percentage: 0
      });
    }
  });

  // Remove duplicate vendor concentration anomalies
  const vendorAnomalies = anomalies.filter(a => a.anomaly_type === 'Vendor Concentration');
  const uniqueVendorAnomalies = vendorAnomalies.filter((anomaly, index, self) => 
    index === self.findIndex(a => a.project_id === anomaly.project_id)
  );

  return anomalies.filter(a => a.anomaly_type !== 'Vendor Concentration').concat(uniqueVendorAnomalies);
}

export function getAnomalyStats(anomalies: Anomaly[]) {
  const total = anomalies.length;
  const high = anomalies.filter(a => a.severity === 'high').length;
  const medium = anomalies.filter(a => a.severity === 'medium').length;
  const low = anomalies.filter(a => a.severity === 'low').length;
  const totalAmount = anomalies.reduce((sum, a) => sum + a.amount_involved, 0);

  return {
    total,
    high,
    medium,
    low,
    totalAmount
  };
}
