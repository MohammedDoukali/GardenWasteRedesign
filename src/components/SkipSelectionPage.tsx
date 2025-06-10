import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ProgressSteps from './ProgressSteps';
import SkipCard from './SkipCard';
import { useSkipData } from '../hooks/useSkipData';

const SkipSelectionPage: React.FC = () => {
  const [selectedSkip, setSelectedSkip] = useState<string>('');
  const { data: skipOptions = [], isLoading, error } = useSkipData();

  const steps = [
    { id: 'postcode', title: 'Postcode', completed: true, current: false },
    { id: 'waste-type', title: 'Waste Type', completed: true, current: false },
    { id: 'select-skip', title: 'Select Skip', completed: false, current: true },
    { id: 'permit-check', title: 'Permit Check', completed: false, current: false },
    { id: 'choose-date', title: 'Choose Date', completed: false, current: false },
    { id: 'payment', title: 'Payment', completed: false, current: false },
  ];

  const handleSkipSelect = (skipId: string) => {
    const skip = skipOptions.find(s => s.id === skipId);
    if (skip && !skip.is_restricted) {
      setSelectedSkip(skipId);
    }
  };

  const handleBack = () => {
    // Navigate to previous step - this would be handled by your routing logic
    console.log('Navigate back to waste type selection');
  };

  const selectedSkipData = skipOptions.find(skip => skip.id === selectedSkip);
  const totalAmount = selectedSkipData ? selectedSkipData.price_before_vat + (selectedSkipData.price_before_vat * (selectedSkipData.vat / 100)) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load skip options</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-lg font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button and Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300 mr-4 group"
            aria-label="Go back to previous step"
          >
            <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transition-colors duration-300" />
          </button>
          <div className="flex-1">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              <h1 className="text-3xl md:text-5xl font-bold">
                Choose Your Skip Size
              </h1>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <ProgressSteps steps={steps} />
        </div>

        {/* Description */}
        <div className="text-center mb-16">
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select the perfect skip size for your waste disposal needs. All skips feature our premium
            <span className="text-yellow-400 font-semibold"> "WE WANT WASTE" </span>
            design and come with flexible hire periods.
          </p>
        </div>

        {/* Skip Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {skipOptions.map((skip) => (
            <SkipCard
              key={skip.id}
              size={skip.size}
              title={`${skip.size} Yard Skip`}
              price={skip.price_before_vat}
              vat={skip.vat}
              hireperiod={skip.hire_period_days}
              image="/images/skip.png"
              isSelected={selectedSkip === skip.id}
              isRestricted={skip.is_restricted}
              restrictionText={skip.restriction_text}
              onSelect={() => handleSkipSelect(skip.id)}
            />
          ))}
        </div>
      </div>

      {/* Fixed Bottom Section - Always visible when product selected */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t-2 border-gray-700 p-4 z-50 lg:hidden">
          <div className="max-w-md mx-auto">
            {/* Total Amount Display */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 mb-4 border border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-white">
                    £<span className="text-yellow-400">{totalAmount}</span>
                  </p>
                  <p className="text-xs text-gray-400">inc. VAT</p>
                </div>
                {selectedSkipData && (
                  <div className="text-right">
                    {/* <p className="text-sm font-medium text-yellow-400">{selectedSkipData.size} Yards skip</p>
                    <p className="text-xs text-gray-400">{selectedSkipData.hire_period_days} Day hire</p> */}
                    <div>
                      {/* <p className="text-sm text-gray-400">Selected Skip</p> */}
                      <p className="text-sm font-bold text-yellow-400">{selectedSkipData.size} Yard Skip</p>
                    </div>
                    <div>
                      {/* <p className="text-sm text-gray-400">Hire Period</p> */}
                      <p className="text-sm text-gray-400">{selectedSkipData.hire_period_days} Day hire</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Continue Button */}
            <button
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 py-4 rounded-xl text-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              disabled={!selectedSkip}
            >
              Continue to Permit Check
            </button>
          </div>
        </div>
      )}

      {/* Desktop Fixed Bottom Section - Always visible when product selected */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t-2 border-gray-700 p-6 z-50 hidden lg:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {selectedSkipData && (
                <>
                  <div>
                    <p className="text-sm text-gray-400">Selected Skip</p>
                    <p className="text-lg font-bold text-yellow-400">{selectedSkipData.size} Yards</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hire Period</p>
                    <p className="text-lg font-medium text-white">{selectedSkipData.hire_period_days}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-400">Total Amount</p>
                <p className="text-3xl font-bold text-white">
                  £<span className="text-yellow-400">{totalAmount}</span>
                </p>
                <p className="text-xs text-gray-400">inc. VAT</p>
              </div>
              <button
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedSkip}
              >
                Continue to Permit Check
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkipSelectionPage;
