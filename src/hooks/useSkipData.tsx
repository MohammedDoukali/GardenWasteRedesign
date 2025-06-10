
import { useQuery } from '@tanstack/react-query';

interface SkipData {
  hire_period_days: string;
  id: string;
  // name: string;
  price_before_vat: number;
  vat: number;
  size: string;
  image_url: string;
  is_restricted: boolean;
  restriction_text?: string;
}

interface SkipApiResponse {
  skips: SkipData[];
}

const fetchSkipData = async (): Promise<SkipData[]> => {
  console.log('Fetching skip data from API...');
  
  try {
    const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
    
    console.log('API Response status:', response.status);
    console.log('API Response ok:', response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      console.error('Invalid response: not an object', data);
      return [];
    }
    
    // Check if skips array exists and is valid
    if (!data || !Array.isArray(data)) {
      console.error('Invalid response: skips is not an array', data);
      return [];
    }
    
    console.log('Successfully parsed skips data:', data);
    return data;
    
  } catch (error) {
    console.error('Error fetching skip data:', error);
    // Return empty array instead of throwing to prevent undefined
    return [];
  }
};

export const useSkipData = () => {
  return useQuery({
    queryKey: ['skips', 'NR32', 'Lowestoft'],
    queryFn: fetchSkipData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: 1000,
  });
};
