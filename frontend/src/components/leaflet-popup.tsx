import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Popup, PopupProps } from 'react-leaflet';

import { AppConfig } from '@/lib/AppConfig';
import { MarkerCategoriesValues } from '@/lib/MarkerCategories';
import useMapContext from './useMapContext';
import Link from 'next/link';

const MarkerIconWrapper = dynamic(() => import('./map/marker-wrapper'));

interface LeafletPopupProps extends PopupProps {
  handlePopupClose: (active?: boolean) => void;
  handleOpenLocation: (place: any) => void;
  item: any;
  color: MarkerCategoriesValues['color'];
  icon: MarkerCategoriesValues['icon'];
  isSelected: boolean;
}

const LeafletPopup = ({
  handlePopupClose,
  handleOpenLocation,
  color,
  isSelected,
  icon,
  item,
  ...props
}: LeafletPopupProps) => {
  const { name, address_line2 } = item.properties;
  const { map } = useMapContext();

  return (
    <Popup {...props} className="leaflet-popup">
      <div className="relative bg-white shadow-lg text-black p-4 rounded-lg w-64">
        <div className="flex justify-center mt-4">
          <MarkerIconWrapper color={color} icon={icon} />
        </div>
        <div className="text-center mt-4">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{address_line2}</p>
        </div>
        <div
          className={`flex ${
            item.properties.website ? 'justify-between' : 'justify-center'
          } mt-6`}
        >
          {item.properties.website && (
            <Link
              href={item.properties.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Visit Website
              <ChevronRight size={AppConfig.ui.menuIconSize} />
            </Link>
          )}
          <button
            className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => handleOpenLocation(item)}
          >
            {isSelected ? 'Remove' : 'Select'}
            <ChevronRight size={AppConfig.ui.menuIconSize} />
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default LeafletPopup;
