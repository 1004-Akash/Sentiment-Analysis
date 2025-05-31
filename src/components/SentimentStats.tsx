
import React from 'react';
import { Card } from '@/components/ui/card';
import { SentimentResult } from '@/pages/Index';
import { TrendingUp, Users, Target } from 'lucide-react';

interface SentimentStatsProps {
  results: SentimentResult[];
}

export const SentimentStats: React.FC<SentimentStatsProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Analytics Dashboard</h3>
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Start analyzing feedback to see insights here</p>
        </div>
      </Card>
    );
  }

  const positive = results.filter(r => r.sentiment === 'positive').length;
  const negative = results.filter(r => r.sentiment === 'negative').length;
  const neutral = results.filter(r => r.sentiment === 'neutral').length;
  const total = results.length;

  const positivePercentage = (positive / total) * 100;
  const negativePercentage = (negative / total) * 100;
  const neutralPercentage = (neutral / total) * 100;

  const averageConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / total;

  return (
    <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Analytics Dashboard</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Sentiment Distribution</span>
            <span className="text-xs text-gray-500">{total} analyses</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-green-600">Positive</span>
                <span>{positive} ({Math.round(positivePercentage)}%)</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${positivePercentage}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-yellow-600">Neutral</span>
                <span>{neutral} ({Math.round(neutralPercentage)}%)</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${neutralPercentage}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-600">Negative</span>
                <span>{negative} ({Math.round(negativePercentage)}%)</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${negativePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Analysis Quality</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Avg. Confidence</span>
            <span className="text-sm font-semibold text-blue-600">
              {Math.round(averageConfidence * 100)}%
            </span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-3 text-xs">
          <p className="text-blue-700">
            <strong>💡 Quick Insight:</strong>{' '}
            {positivePercentage > 60 
              ? "Your customers are mostly happy! Keep up the great work."
              : negativePercentage > 40
              ? "Consider addressing negative feedback to improve satisfaction."
              : "Mixed feedback suggests room for targeted improvements."}
          </p>
        </div>
      </div>
    </Card>
  );
};
