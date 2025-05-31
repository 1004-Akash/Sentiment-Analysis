
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Loader2, Send, FileText } from 'lucide-react';
import { SentimentResult } from '@/pages/Index';
import { analyzeSentiment } from '@/utils/sentimentAnalyzer';

interface AnalysisInputProps {
  onResult: (result: SentimentResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export const AnalysisInput: React.FC<AnalysisInputProps> = ({ 
  onResult, 
  isAnalyzing, 
  setIsAnalyzing 
}) => {
  const [text, setText] = useState('');
  const [batchMode, setBatchMode] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      if (batchMode) {
        const lines = text.split('\n').filter(line => line.trim());
        for (const line of lines) {
          const result = await analyzeSentiment(line.trim());
          onResult(result);
          // Small delay between batch analyses for better UX
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      } else {
        const result = await analyzeSentiment(text);
        onResult(result);
      }
      setText('');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sampleTexts = [
    "I absolutely love this product! It exceeded my expectations.",
    "The service was okay, nothing special but not terrible either.",
    "Very disappointed with the quality. Would not recommend."
  ];

  const handleSampleClick = (sample: string) => {
    setText(sample);
  };

  return (
    <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Analyze Customer Feedback</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={batchMode ? "default" : "outline"}
              size="sm"
              onClick={() => setBatchMode(!batchMode)}
              className="text-xs"
            >
              <FileText className="w-4 h-4 mr-1" />
              Batch Mode
            </Button>
          </div>
        </div>
        
        <Textarea
          placeholder={batchMode 
            ? "Enter multiple pieces of feedback, one per line..." 
            : "Enter customer feedback, review, or comment to analyze..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32 resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-400"
        />
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-500 mr-2">Try these examples:</span>
          {sampleTexts.map((sample, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleSampleClick(sample)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              Example {index + 1}
            </Button>
          ))}
        </div>
        
        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing emotions...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Analyze Sentiment
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
