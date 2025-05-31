
import React, { useState } from 'react';
import { SentimentHero } from '@/components/SentimentHero';
import { AnalysisInput } from '@/components/AnalysisInput';
import { SentimentResults } from '@/components/SentimentResults';
import { SentimentHistory } from '@/components/SentimentHistory';
import { SentimentStats } from '@/components/SentimentStats';

export interface SentimentResult {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  timestamp: Date;
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
  };
}

const Index = () => {
  const [results, setResults] = useState<SentimentResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addResult = (result: SentimentResult) => {
    setResults(prev => [result, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <SentimentHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <AnalysisInput 
              onResult={addResult} 
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />
            
            {results.length > 0 && (
              <SentimentResults results={results.slice(0, 3)} />
            )}
          </div>
          
          <div className="space-y-8">
            <SentimentStats results={results} />
            {results.length > 3 && (
              <SentimentHistory results={results.slice(3)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
