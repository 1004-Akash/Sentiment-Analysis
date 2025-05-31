
import React from 'react';
import { Card } from '@/components/ui/card';
import { SentimentResult } from '@/pages/Index';
import { Clock, Heart, Meh, Frown } from 'lucide-react';

interface SentimentHistoryProps {
  results: SentimentResult[];
}

export const SentimentHistory: React.FC<SentimentHistoryProps> = ({ results }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Heart className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  if (results.length === 0) return null;

  return (
    <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-800">Recent History</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {results.map((result) => (
          <div key={result.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            {getSentimentIcon(result.sentiment)}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">
                "{result.text}"
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  result.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                  result.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {result.sentiment}
                </span>
                <span className="text-xs text-gray-500">
                  {result.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
