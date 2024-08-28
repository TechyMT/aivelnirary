import React, { useEffect, useState, useRef } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Heading from './ui/heading';
import Meteors from './magicui/meteors';
import BlurFade from '@/components/magicui/blur-fade';
import ListLoader from './magicui/animated-list';

interface TravelDetailsFormProps {
  formData: any;
  sourceSuggestions: any[];
  destinationSuggestions: any[];
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectSuggestion: (suggestion: any, field: string) => void;
}

const TravelDetailsForm: React.FC<TravelDetailsFormProps> = ({
  formData,
  sourceSuggestions,
  destinationSuggestions,
  loading,
  handleChange,
  handleSelectSuggestion,
}) => {
  const [sourceActive, setSourceActive] = useState(false);
  const [destinationActive, setDestinationActive] = useState(false);

  const sourceRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (sourceRef.current && !sourceRef.current.contains(event.target as Node)) {
      setSourceActive(false);
    }
    if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
      setDestinationActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sourceRef, destinationRef]);

  return (
    <div>
      {!loading ? (
        <>
          <div className="relative flex items-center flex-grow px-6 py-10 overflow-hidden">
            <Meteors number={30} />
            <div className="flex items-center flex-grow justify-center">
              <Heading>Travel Details</Heading>
            </div>
          </div>
          <div className="relative" ref={sourceRef}>
            <Label>Source</Label>
            <Input
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Enter your source"
              className="w-full mb-4"
              autoComplete="off"
              onFocus={() => setSourceActive(true)}
            />
            {sourceActive && sourceSuggestions && sourceSuggestions.length > 0 && (
              <div className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full">
                {sourceSuggestions
                  .filter(
                    (suggestion) => suggestion.formatted !== formData.source
                  )
                  .map((suggestion) => (
                    <div
                      key={suggestion.place_id}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={() => {
                        handleSelectSuggestion(suggestion, 'source');
                        setSourceActive(false); // Close the dropdown after selection
                      }}
                    >
                      {suggestion.formatted}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="relative" ref={destinationRef}>
            <Label>Destination</Label>
            <Input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter your destination"
              className="w-full mb-4"
              autoComplete="off"
              onFocus={() => setDestinationActive(true)}
            />
            {destinationActive && destinationSuggestions && destinationSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full">
                {destinationSuggestions
                  .filter(
                    (suggestion) =>
                      suggestion.formatted !== formData.destination
                  )
                  .map((suggestion) => (
                    <div
                      key={suggestion.place_id}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      onClick={() => {
                        handleSelectSuggestion(suggestion, 'destination');
                        setDestinationActive(false); // Close the dropdown after selection
                      }}
                    >
                      {suggestion.formatted}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="relative">
            <Label>Start Date</Label>
            <Input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="Enter your travel start date"
              type="date"
              className="w-full mb-4"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="relative">
            <Label>Duration</Label>
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter your travel duration"
              type="number"
              className="w-full mb-4"
              autoComplete="off"
              min={1}
              max={10}
            />
          </div>
          <div className="relative">
            <Label>Budget</Label>
            <Input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter your travel budget"
              type="number"
              className="w-full mb-4"
              autoComplete="off"
              min={1000}
            />
          </div>
        </>
      ) : (
        <div className="h-96 overflow-hidden">
          <ListLoader delay={2500} type="itinerary" />
        </div>
      )}
    </div>
  );
};

export default TravelDetailsForm;
