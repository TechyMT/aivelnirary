import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { Marker as ReactMarker } from 'react-leaflet';
import { AppConfig } from '@/lib/AppConfig';
import {
  mapToSingleMarkerCategory,
  MarkerCategoriesValues,
} from '@/lib/MarkerCategories';
import { PlaceValues } from '@/lib/Places';
import Leaflet, { PointExpression } from 'leaflet';
import { renderToString } from 'react-dom/server';
import MarkerIconWrapper from './marker-wrapper';
import useMapContext from '../useMapContext';

const LeafletPopup = dynamic(() => import('../leaflet-popup'));

export interface CustomMarkerProps {
  place: any;
  onSelect: (place: any) => void;
  selectedPlaces: any[];
}

interface DivIconValues {
  source: JSX.Element;
  anchor: PointExpression;
}

const LeafletDivIcon = ({ source, anchor }: DivIconValues) =>
  Leaflet?.divIcon({
    html: renderToString(source),
  });

export const CustomMarker = ({
  place,
  onSelect,
  selectedPlaces,
}: CustomMarkerProps) => {
  const { map } = useMapContext();

  const markerCategory: MarkerCategoriesValues = useMemo(
    () => mapToSingleMarkerCategory(place.properties.categories), // Toggle category based on selection
    []
  );

  const handleMarkerClick = useCallback(() => {
    if (!map) return;
    const clampZoom = map.getZoom() < 14 ? 14 : undefined;
    map.setView([place?.properties?.lat, place?.properties?.lon], clampZoom);
  }, [map, place]);

  const handlePopupClose = useCallback(() => {
    if (!map) return;
    map.closePopup();
  }, [map]);

  return (
    <ReactMarker
      position={[place?.properties?.lat, place?.properties?.lon]}
      icon={LeafletDivIcon({
        source: (
          <MarkerIconWrapper
            color={markerCategory.color}
            icon={markerCategory.icon}
          />
        ),
        anchor: [
          AppConfig.ui.markerIconSize / 2,
          AppConfig.ui.markerIconSize / 2,
        ],
      })}
      eventHandlers={{ click: handleMarkerClick }}
      autoPan={false}
      autoPanOnFocus={false}
    >
      <LeafletPopup
        autoPan={true}
        autoClose
        closeButton={false}
        item={place}
        color={markerCategory.color}
        icon={markerCategory.icon}
        handleOpenLocation={onSelect}
        handlePopupClose={handlePopupClose}
        isSelected={selectedPlaces.includes(place)}
      />
    </ReactMarker>
  );
};
