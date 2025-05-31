
import { SentimentResult } from '@/pages/Index';

// Simple sentiment analysis function using keyword-based approach
// In a real application, you would use a more sophisticated ML model
export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  // Simulate API delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

  const positiveWords = [
    'love', 'excellent', 'amazing', 'fantastic', 'great', 'awesome', 'wonderful', 
    'perfect', 'best', 'brilliant', 'outstanding', 'superb', 'impressed', 'happy',
    'satisfied', 'pleased', 'delighted', 'thrilled', 'exceeded', 'recommend'
  ];

  const negativeWords = [
    'hate', 'terrible', 'awful', 'horrible', 'worst', 'bad', 'disappointing',
    'poor', 'useless', 'frustrated', 'angry', 'upset', 'disappointed', 'waste',
    'regret', 'problems', 'issues', 'broken', 'failed', 'never again'
  ];

  const neutralWords = [
    'okay', 'fine', 'average', 'decent', 'normal', 'standard', 'typical',
    'acceptable', 'alright', 'nothing special'
  ];

  const words = text.toLowerCase().split(/\s+/);
  
  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;

  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveScore++;
    if (negativeWords.some(nw => word.includes(nw))) negativeScore++;
    if (neutralWords.some(neutral => word.includes(neutral))) neutralScore++;
  });

  // Determine sentiment
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;

  if (positiveScore > negativeScore && positiveScore > neutralScore) {
    sentiment = 'positive';
    confidence = Math.min(0.95, 0.6 + (positiveScore / words.length) * 2);
  } else if (negativeScore > positiveScore && negativeScore > neutralScore) {
    sentiment = 'negative';
    confidence = Math.min(0.95, 0.6 + (negativeScore / words.length) * 2);
  } else {
    sentiment = 'neutral';
    confidence = Math.min(0.9, 0.5 + Math.random() * 0.3);
  }

  // Generate mock emotion scores
  const emotions = {
    joy: sentiment === 'positive' ? 0.3 + Math.random() * 0.7 : Math.random() * 0.3,
    sadness: sentiment === 'negative' ? 0.3 + Math.random() * 0.6 : Math.random() * 0.2,
    anger: sentiment === 'negative' ? 0.2 + Math.random() * 0.5 : Math.random() * 0.2,
    fear: sentiment === 'negative' ? 0.1 + Math.random() * 0.4 : Math.random() * 0.1,
    surprise: Math.random() * 0.4,
  };

  return {
    id: Math.random().toString(36).substr(2, 9),
    text,
    sentiment,
    confidence,
    timestamp: new Date(),
    emotions,
  };
};
