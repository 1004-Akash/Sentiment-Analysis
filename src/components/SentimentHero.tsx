
import React from 'react';
import { Heart, Brain, BarChart3 } from 'lucide-react';

export const SentimentHero = () => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          EmpathyAI
        </h1>
      </div>
      
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Understand your customers' emotions with intelligence and empathy. 
        Transform feedback into actionable insights that help you connect deeper with your audience.
      </p>
      
      <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-500" />
          <span>AI-Powered Analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          <span>Emotional Intelligence</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-500" />
          <span>Actionable Insights</span>
        </div>
      </div>
    </div>
  );
};
