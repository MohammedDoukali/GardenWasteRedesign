
import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-2">
      {/* Mobile Layout*/}
      <div className="md:hidden grid grid-cols-6 gap-y-4 justify-items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm
                ${
                  step.completed 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-yellow-400/20' 
                    : step.current 
                    ? 'bg-gray-800 text-yellow-400 border border-yellow-400 shadow-yellow-400/10' 
                    : 'bg-gray-700 text-gray-400 border border-gray-600'
                }
              `}
            >
              {step.completed ? (
                <Check className="w-3 h-3" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span 
              className={`
                mt-2 text-xs font-medium transition-colors duration-300 text-center
                ${step.current ? 'text-yellow-400' : step.completed ? 'text-white' : 'text-gray-400'}
              `}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
  
  

      {/* Desktop Layout - Compact */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1 min-w-0">
            <div className="flex items-center min-w-0 flex-shrink-0">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm flex-shrink-0
                  ${step.completed 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-yellow-400/20' 
                    : step.current 
                    ? 'bg-gray-800 text-yellow-400 border-2 border-yellow-400 shadow-yellow-400/10' 
                    : 'bg-gray-700 text-gray-400 border border-gray-600'
                  }
                `}
              >
                {step.completed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span 
                className={`
                  ml-2 text-sm font-medium transition-colors duration-300 truncate
                  ${step.current ? 'text-yellow-400' : step.completed ? 'text-white' : 'text-gray-400'}
                `}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`
                  flex-1 h-0.5 mx-3 lg:mx-4 rounded-full transition-all duration-300 min-w-4
                  ${step.completed 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-sm shadow-yellow-400/20' 
                    : 'bg-gray-700'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
