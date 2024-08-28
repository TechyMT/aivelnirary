'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { debounce, getBaseUrl } from '@/lib/utils';
import TravelDetailsForm from './travel-details';
import PlaceSuggestions from './place-suggestions';
import MapView from './map-view';
import SummaryView from './SummaryView';
import FadeIn from './ui/blur-fade';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ShineBorder from './magicui/shine-border';
import SparklesText from './magicui/sparkles-text';

const ItineraryModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status, update } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    startDate: '',
    duration: undefined,
    budget: '',
    selectedPlaces: [] as any[],
  });
  const [places, setPlaces] = useState<any[]>([]);
  const [sourceSuggestions, setSourceSuggestions] = useState<any[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>(
    []
  );
  const [route, setRoute] = useState<any>(null);

  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);

  const steps = [
    { title: 'Travel Details' },
    { title: 'Select Places' },
    { title: 'Review and Submit' },
  ];

  const router = useRouter();

  const fetchSuggestions = async (query: string, field: string) => {
    if (query.length > 2) {
      const response = await fetch(
        `${getBaseUrl()}/place/autocomplete/?query=${query}`
      );
      const data = await response.json();


      if (field === 'source') {
        setSourceSuggestions(data.suggestions.results);
      } else if (field === 'destination') {
        setDestinationSuggestions(data.suggestions.results);
      }
    } else {
      if (field === 'source') {
        setSourceSuggestions([]);
      } else if (field === 'destination') {
        setDestinationSuggestions([]);
      }
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'source' || name === 'destination') {
      setSelectedDestination({});
      debouncedFetchSuggestions(value, name);
    }
  };

  const handleSelectSuggestion = (suggestion: any, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: suggestion.formatted,
    }));

    if (field === 'source') {
      setSelectedSource(suggestion);
      setSourceSuggestions([]);
    } else if (field === 'destination') {
      setSelectedDestination(suggestion);
      setDestinationSuggestions([]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (formData.selectedPlaces.length === 0) {
        toast.error('Please select at least one place!');
        return;
      }

      setLoading(true);
      const body = {
        trip_data: {
          start_date: formData.startDate || new Date().toISOString(),
          duration: formData.duration || 2, // Default duration if not provided
          source: formData.source.split(',')[0], // Extract city name
          destination: formData.destination.split(',')[0], // Extract city name
          budget: formData.budget || 50000, // Default budget if not provided
          places_data: formData.selectedPlaces.map((place: any) => ({
            place_details: {
              name: place.properties.name,
              address:
                place.properties.address_line1 +
                ', ' +
                place.properties.address_line2,
              position: {
                lat: place.geometry.coordinates[1].toFixed(3),
                lon: place.geometry.coordinates[0].toFixed(3),
              },
            },
            type: place.properties.categories[0], // Assume the first category is the main type
          })),
          mapImgUrl: `${process.env.NEXT_PUBLIC_IMAGE_URL}`,
        },
        user_persona: session?.user?.persona || {},
        user: {
          id: session?.user?.id,
          email: session?.user?.email,
          name: session?.user?.name,
        },
      };

      console.log("body", body)

      // const response = axios.post(`${getBaseUrl()}/itinerary`, body);

      // setLoading(false);
      // update();

      // toast.success('Itinerary submitted successfully!', {
      //   description:
      //     'Your itinerary has been submitted successfully. Your itinerary will be emailed to you shortly.',
      // });

      // router.replace('/');
    } catch (error) {
      setLoading(false);
      console.error('Error submitting itinerary:', error);
    }
  };
  const fetchPlaces = async (placeId: string) => {
    if (formData.destination) {
      try {
        setLoading(true);
        const response = await fetch(
          `${getBaseUrl()}/place/suggestions/?filter=${placeId}&limit=20`
        );
        const data = await response.json();
        setLoading(false);

        setPlaces(data.suggestions);
      } catch (error) {
        console.error('Error fetching places:', error);
        setLoading(false);
      }
    }
  };

  const handleSelectPlace = (place: any) => {
    return setFormData((prevData) => ({
      ...prevData,
      selectedPlaces: prevData.selectedPlaces.includes(place)
        ? prevData.selectedPlaces.filter((item) => item !== place)
        : [...prevData.selectedPlaces, place],
    }));
  };

  const removeDst = (place: string) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedPlaces: prevData.selectedPlaces.filter((item) => item !== place),
    }));
  };

  const handleNext = async () => {
    if (!formData.destination || !formData.source) {
      toast.error('Please the enter the details for your trip!');
      return;
    }

    if (
      formData.duration &&
      (formData.duration < 1 || formData.duration > 10)
    ) {
      toast.error('Duration should be between 1 and 10 days!');
      return;
    }

    if (
      formData.budget &&
      (Number(formData.budget) < 1000 || Number(formData.budget) > 1000000)
    ) {
      toast.error('Budget should be between 1000 and 1000000!');
      return;
    }

    if (!selectedDestination.place_id) {
      toast.error('Please select a valid destination!');
      return;
    }

    if (!selectedSource.place_id) {
      toast.error('Please select a valid source!');
      return;
    }
    if (currentStep === 0) {
      await fetchPlaces(selectedDestination.place_id);
      // setPlaces(placesData.features);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Fetch route from Geoapify API
  const fetchRoute = async (places: any[]) => {
    if (places.length > 1) {
      const coordinates = places.map((place) => ({
        lat: place.geometry.coordinates[1],
        lon: place.geometry.coordinates[0],
      }));

      const response = await fetch(`${getBaseUrl()}/place/route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          waypoints: coordinates,
          mode: 'drive',
        }),
      });

      const data = await response.json();
      return data.routeDetails;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const routeData = await fetchRoute(formData.selectedPlaces);
      setRoute(routeData);
    };
    if (currentStep === 1 && formData.selectedPlaces.length > 1) {
      fetchData();
    } else if (currentStep === 1 && formData.selectedPlaces.length <= 1) {
      setRoute(null);
    }
  }, [currentStep, formData.selectedPlaces]);

  if (status !== 'loading') {
    return (
      <motion.div
        layoutId="shine-border-outer-div"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ShineBorder
          className="my-10 shadow-xl p-7 max-w-6xl mx-auto rounded-lg"
          color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
          borderWidth={2}
        >
          <div className={`modal text-black open min-w-[600px]`}>
            {currentStep === 0 && (
              <FadeIn>
                <TravelDetailsForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSelectSuggestion={handleSelectSuggestion}
                  sourceSuggestions={sourceSuggestions}
                  destinationSuggestions={destinationSuggestions}
                  loading={loading}
                />
              </FadeIn>
            )}

            {currentStep === 1 && (
              <FadeIn>
                <>
                  <MapView
                    selectedDestination={selectedDestination}
                    places={places}
                    handleSelectPlace={handleSelectPlace}
                    selectedPlaces={formData.selectedPlaces}
                    route={route}
                  />
                  <PlaceSuggestions
                    places={places}
                    handleSelectPlace={handleSelectPlace}
                    selectedPlaces={formData.selectedPlaces}
                    selectedDestination={selectedDestination}
                  />
                </>
              </FadeIn>
            )}

            {currentStep === 2 && (
              <FadeIn>
                <SummaryView
                  destinations={places}
                  selectedDestinations={formData.selectedPlaces}
                  onRemove={removeDst}
                />
              </FadeIn>
            )}
            {!loading && (
              <div className="relative flex justify-between p-4">
                <Button onClick={handlePrevious} disabled={currentStep === 0}>
                  Previous
                </Button>
                <div>
                  {currentStep < steps.length - 1 ? (
                    <Button onClick={handleNext}>Next</Button>
                  ) : (
                    <Button onClick={handleSubmit}>
                      <SparklesText text="Submit" className="text-sm" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </ShineBorder>
      </motion.div>
    );
  } else {
    return;
  }
};

export default ItineraryModal;
