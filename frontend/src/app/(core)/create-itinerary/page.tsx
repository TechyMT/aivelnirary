'use client';

import dynamic from 'next/dynamic';

const ItineraryModal = dynamic(() => import('@/components/itinerary-modal'), {
  ssr: false,
});

const CreateItinerary = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ItineraryModal />
    </div>
  );
};

export default CreateItinerary;
