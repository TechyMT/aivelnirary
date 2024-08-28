import React, { useState, useEffect } from 'react';
import { CardComponent } from './ui/suggestion-card'; // Adjust import paths as needed
import { MapPin, Check } from 'lucide-react';
import { BorderBeam } from './magicui/border-beam'; // Adjust import as needed

interface PlaceSuggestionsProps {
  places: any[][]; // Assuming places is now an array of categories, each containing an array of places
  selectedPlaces: any[];
  handleSelectPlace: (place: any) => void;
  selectedDestination: {
    formatted: string;
  };
}

const PlaceSuggestions: React.FC<PlaceSuggestionsProps> = ({
  places,
  selectedPlaces,
  handleSelectPlace,
  selectedDestination,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderPlaceCards = () => {
    return (
      <div className="container mx-auto p-4 rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Popular Destinations in {selectedDestination.formatted}
        </h1>
        <h1 className="text-2xl font-bold mb-6">Destinations for Outing</h1>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {places &&
            places.length > 0 &&
            places[0]
              .filter((place: any) => place.properties?.name)
              .map((place, placeIndex) => (
                <div
                  key={placeIndex}
                  className="relative overflow-hidden hover:shadow-md transition-all cursor-pointer rounded-xl"
                  onClick={() => handleSelectPlace(place)}
                  role="checkbox"
                  aria-checked={selectedPlaces.some(
                    (selectedPlace) => selectedPlace.id === place.id
                  )}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectPlace(place);
                    }
                  }}
                >
                  {selectedPlaces.includes(place) && <BorderBeam />}
                  <CardComponent data={place} />
                </div>
              ))}
        </div>

        <h1 className="text-2xl font-bold mb-6">Locations for Food</h1>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 rounded-xl">
          {places &&
            places.length > 0 &&
            places[1]
              .filter((place: any) => place.properties?.name)
              .map((place, placeIndex) => (
                <div
                  key={placeIndex}
                  className="relative overflow-hidden hover:shadow-md transition-all cursor-pointer rounded-xl"
                  onClick={() => handleSelectPlace(place)}
                  role="checkbox"
                  aria-checked={selectedPlaces.some(
                    (selectedPlace) => selectedPlace.id === place.id
                  )}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectPlace(place);
                    }
                  }}
                >
                  {selectedPlaces.includes(place) && (
                    <BorderBeam className="rounded-xl" />
                  )}
                  <CardComponent data={place} />
                </div>
              ))}
        </div>
      </div>
    );
  };

  return <>{renderPlaceCards()}</>;
};

export default PlaceSuggestions;
