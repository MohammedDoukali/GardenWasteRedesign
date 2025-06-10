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

const StepCircle: React.FC<{ step: Step; index: number; size: string; textSize: string }> = ({ step, index, size, textSize }) => (
  <div
    className={`
      ${size} rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm
      ${step.completed 
        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-yellow-400/20'
        : step.current 
        ? 'bg-gray-800 text-yellow-400 border border-yellow-400 shadow-yellow-400/10' 
        : 'bg-gray-700 text-gray-400 border border-gray-600'
      }
    `}
  >
    {step.completed ? <Check className={textSize} /> : <span>{index + 1}</span>}
  </div>
);

const StepLabel: React.FC<{ step: Step; additionalClasses?: string }> = ({ step, additionalClasses = '' }) => (
  <span 
    className={`
      transition-colors duration-300 ${additionalClasses}
      ${step.current ? 'text-yellow-400' : step.completed ? 'text-white' : 'text-gray-400'}
    `}
  >
    {step.title}
  </span>
);



const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps }) => (
  <div className="w-full max-w-6xl mx-auto px-2">
    <div className="grid grid-cols-6 md:hidden gap-y-4 justify-items-center">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          <StepCircle step={step} index={index} size="w-7 h-7" textSize="w-3 h-3" />
          <StepLabel step={step} additionalClasses="mt-2 text-xs font-medium text-center" />
        </div>
      ))}
    </div>

    <div className="hidden md:flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1 min-w-0">
          <div className="flex items-center min-w-0 flex-shrink-0">
            <StepCircle step={step} index={index} size="w-8 h-8 text-sm" textSize="w-4 h-4" />
            <StepLabel step={step} additionalClasses="ml-2 text-sm font-medium truncate" />
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`
                flex-1 h-0.5 mx-3 lg:mx-4 rounded-full transition-all duration-300 w-full
                ${step.completed ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-sm shadow-yellow-400/20' : 'bg-gray-700'}
              `}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ProgressSteps;