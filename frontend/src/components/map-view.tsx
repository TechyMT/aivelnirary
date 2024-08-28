'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { CustomMarker } from './map';
import useMapContext from './useMapContext';

interface MapViewProps {
  selectedPlaces: any[]; // You might want to replace `any` with a specific type if possible
  selectedDestination: { lat: number; lon: number } | null;
  places: any[];
  handleSelectPlace: (place: any) => void;
  route: {
    features: { geometry: { coordinates: [number, number][] } }[];
    properties: any;
    type:
      | 'Point'
      | 'MultiPoint'
      | 'LineString'
      | 'MultiLineString'
      | 'Polygon'
      | 'MultiPolygon'
      | 'GeometryCollection'
      | 'Feature'
      | 'FeatureCollection';
  } | null; // Adjust type based on actual route data
}

const MapView: React.FC<MapViewProps> = ({
  selectedDestination = null,
  selectedPlaces = [],
  places = [],
  handleSelectPlace,
  route,
}) => {
  const defaultPosition: [number, number] = selectedDestination
    ? [selectedDestination.lat, selectedDestination.lon]
    : [0, 0]; // Default fallback position if no selectedDestination

  const { map } = useMapContext();

  const MapCenter = () => {
    useEffect(() => {
      if (selectedDestination && map) {
        map.flyTo(defaultPosition, 12); // Adjust zoom level as needed
      }
    }, [map, selectedDestination, defaultPosition, selectedPlaces]);
    return null;
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={12}
      className="h-[60vh] w-full rounded-lg"
    >
      <MapCenter />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render markers for each place */}
      {places.length > 0 &&
        places.map((category, catIndex) =>
          category
            .filter((place: any) => place.properties?.name)
            .map((place: any, index: number) => (
              <CustomMarker
                key={place.properties.place_id}
                place={place}
                onSelect={handleSelectPlace}
                selectedPlaces={selectedPlaces}
              />
            ))
        )}

      {route && (
        <GeoJSON
          key={route.properties.waypoints.length}
          data={route}
          style={{
            color: 'black',
            weight: 5,
          }}
        />
      )}
    </MapContainer>
  );
};

export default MapView;
