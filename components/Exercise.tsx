import React, { useState, useEffect } from 'react';
import { MiniExercise } from '../types';
import { CheckCircle2, RefreshCw, HelpCircle } from 'lucide-react';

interface ExerciseProps {
  data: MiniExercise;
  moduleId: string;
}

export const Exercise: React.FC<ExerciseProps> = ({ data, moduleId }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Reset state when module changes
  useEffect(() => {
    setUserAnswer('');
    setShowFeedback(false);
  }, [moduleId]);

  const handleCheck = () => {
    if (userAnswer.trim().length > 0) {
      setShowFeedback(true);
    }
  };

  const handleRetry = () => {
    setShowFeedback(false);
    setUserAnswer('');
  };

  const formatExpectedAnswer = (answer: MiniExercise['expected_answer']) => {
      if (typeof answer === 'string') return answer;
      if (Array.isArray(answer)) return answer.join(', ');
      // Object handling
      return JSON.stringify(answer, null, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-brand-dark p-4 flex items-center gap-2">
        <HelpCircle className="text-brand-light w-5 h-5" />
        <h3 className="text-white font-semibold">Mini-Ejercicio Conceptual</h3>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700 font-medium mb-4 text-lg">{data.prompt}</p>
        
        {!showFeedback ? (
          <div className="space-y-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-medium focus:border-transparent outline-none transition-all resize-none bg-brand-bg"
              rows={3}
              placeholder={data.placeholder || "Escribe tu análisis aquí..."}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
              onClick={handleCheck}
              disabled={userAnswer.trim().length === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                userAnswer.trim().length > 0 
                  ? 'bg-brand-medium text-white hover:bg-brand-dark' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Verificar Respuesta
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2 text-green-800 font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Respuesta Modelo</span>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{formatExpectedAnswer(data.expected_answer)}</p>
            </div>
            
            <div className="mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tu respuesta</span>
              <p className="text-gray-600 bg-gray-50 p-3 rounded mt-1">{userAnswer}</p>
            </div>

            <button
              onClick={handleRetry}
              className="flex items-center gap-2 text-brand-medium hover:text-brand-dark font-medium text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Intentar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};