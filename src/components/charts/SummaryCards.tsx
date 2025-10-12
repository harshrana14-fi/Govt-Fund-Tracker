'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown
} from 'lucide-react';
import { Project, Anomaly } from '@/lib/anomalies';

interface SummaryCardsProps {
  projects: Project[];
  anomalies: Anomaly[];
}

export default function SummaryCards({ projects, anomalies }: SummaryCardsProps) {
  const totalSanctioned = projects.reduce((sum, p) => sum + p.sanction_amount, 0);
  const totalReleased = projects.reduce((sum, p) => sum + p.released_amount, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent_amount, 0);
  
  const releasePercentage = totalSanctioned > 0 ? (totalReleased / totalSanctioned) * 100 : 0;
  const spendPercentage = totalReleased > 0 ? (totalSpent / totalReleased) * 100 : 0;
  
  const highAnomalies = anomalies.filter(a => a.severity === 'high').length;
  const mediumAnomalies = anomalies.filter(a => a.severity === 'medium').length;
  const lowAnomalies = anomalies.filter(a => a.severity === 'low').length;

  const cards = [
    {
      title: 'Total Sanctioned',
      value: `₹${(totalSanctioned / 10000000).toFixed(1)}Cr`,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: `${projects.length} projects`
    },
    {
      title: 'Fund Release Rate',
      value: `${releasePercentage.toFixed(1)}%`,
      icon: releasePercentage >= 80 ? CheckCircle : TrendingDown,
      color: releasePercentage >= 80 ? 'text-green-600' : 'text-orange-600',
      bgColor: releasePercentage >= 80 ? 'bg-green-50' : 'bg-orange-50',
      description: `₹${(totalReleased / 10000000).toFixed(1)}Cr released`
    },
    {
      title: 'Expenditure Rate',
      value: `${spendPercentage.toFixed(1)}%`,
      icon: spendPercentage >= 70 ? TrendingUp : TrendingDown,
      color: spendPercentage >= 70 ? 'text-green-600' : 'text-red-600',
      bgColor: spendPercentage >= 70 ? 'bg-green-50' : 'bg-red-50',
      description: `₹${(totalSpent / 10000000).toFixed(1)}Cr spent`
    },
    {
      title: 'Anomalies Detected',
      value: anomalies.length.toString(),
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: `${highAnomalies} high, ${mediumAnomalies} medium, ${lowAnomalies} low`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value}
                </div>
                <p className="text-xs text-gray-500">
                  {card.description}
                </p>
                {card.title === 'Anomalies Detected' && anomalies.length > 0 && (
                  <div className="flex space-x-1 mt-2">
                    {highAnomalies > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {highAnomalies} High
                      </Badge>
                    )}
                    {mediumAnomalies > 0 && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                        {mediumAnomalies} Medium
                      </Badge>
                    )}
                    {lowAnomalies > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {lowAnomalies} Low
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
