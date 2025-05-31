
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SentimentResult } from '@/pages/Index';
import { Heart, Meh, Frown } from 'lucide-react';

interface SentimentResultsProps {
  results: SentimentResult[];
}

export const SentimentResults: React.FC<SentimentResultsProps> = ({ results }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Heart className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getSentimentMessage = (sentiment: string, confidence: number) => {
    const confidenceLevel = confidence > 0.8 ? 'very' : confidence > 0.6 ? 'quite' : 'somewhat';
    
    switch (sentiment) {
      case 'positive':
        return `This customer seems ${confidenceLevel} happy! They're expressing positive emotions.`;
      case 'negative':
        return `This customer appears ${confidenceLevel} upset. They may need extra attention.`;
      default:
        return `This feedback is ${confidenceLevel} neutral. The customer seems indifferent.`;
    }
  };

  if (results.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Recent Analysis Results</h3>
      
      {results.map((result) => (
        <Card key={result.id} className="p-6 shadow-md border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getSentimentIcon(result.sentiment)}
                <Badge className={getSentimentColor(result.sentiment)}>
                  {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">
                  {Math.round(result.confidence * 100)}% confidence
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {result.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-700">
              "{result.text}"
            </blockquote>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                💡 <strong>Insight:</strong> {getSentimentMessage(result.sentiment, result.confidence)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              {Object.entries(result.emotions).map(([emotion, value]) => (
                <div key={emotion} className="text-center">
                  <div className="bg-gray-100 rounded-full h-2 mb-1">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-600 capitalize">{emotion}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
