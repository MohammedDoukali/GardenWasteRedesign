
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, AlertTriangle } from 'lucide-react';

interface SkipCardProps {
  size: string;
  title: string;
  price: number;
  vat: number;
  hireperiod: string;
  image: string;
  isSelected: boolean;
  isRestricted?: boolean;
  restrictionText?: string;
  onSelect: () => void;
}

const SkipCard: React.FC<SkipCardProps> = ({
  size,
  title,
  price,
  vat,
  hireperiod,
  image,
  isSelected,
  isRestricted = false,
  restrictionText,
  onSelect
}) => {
  const totalPrice = price + (price * (vat / 100));

  return (
    <div 
      className={`
        group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-pointer transform hover:scale-[1.02]
        ${isSelected 
          ? 'border-yellow-400 shadow-lg shadow-yellow-400/20 ring-2 ring-yellow-400/30' 
          : 'border-gray-700 hover:border-gray-600'
        }
        ${isRestricted ? 'opacity-75 cursor-not-allowed' : ''}
      `}
      onClick={onSelect}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-20 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-scale-in">
          <Check className="w-5 h-5 text-gray-900 font-bold" />
        </div>
      )}

      {/* Glow Effect for Selected Card */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-2xl"></div>
      )}

      {/* Image container */}
      <div className="relative h-56 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Size badge with gradient */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {size} Yards
        </div>
        
        {/* Restriction warning */}
        {isRestricted && restrictionText && (
          <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center shadow-lg">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {restrictionText}
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Price highlight */}
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          Best Value
        </div>
        
        <div className="mt-2">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            {hireperiod} day hire period
          </p>
          
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">
              Base Price: £{price}
            </div>
            <div className="text-sm text-gray-400">
              VAT: {vat}%
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-3xl font-bold text-white">
              £<span className="text-yellow-400">{totalPrice}</span>
            </div>
            <div className="text-sm text-gray-400">
              inc. VAT
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            disabled={isRestricted}
            className={`
              w-full transition-all duration-300 font-bold text-sm py-3 rounded-xl
              ${isSelected 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 shadow-lg shadow-yellow-400/30' 
                : isRestricted
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 text-white hover:text-gray-900 border border-gray-600 hover:border-yellow-400'
              }
            `}
          >
            {isSelected ? (
              <span className="flex items-center justify-center">
                <Check className="w-4 h-4 mr-2" />
                Selected
              </span>
            ) : isRestricted ? (
              <span className="flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Not Available
              </span>
            ) : (
              'Select This Skip'
            )}
          </Button>
        </div>
      </div>

      {/* Animated border for selected state */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 opacity-20 animate-pulse"></div>
      )}
    </div>
  );
};

export default SkipCard;
