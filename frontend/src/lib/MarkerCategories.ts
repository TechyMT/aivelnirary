import {
  Leaf,
  LocateFixed,
  LucideProps,
  PersonStanding,
  ForkKnife,
  CameraIcon,
  Utensils,
  Sun,
  MusicIcon,
} from 'lucide-react';
import { FunctionComponent } from 'react';
import colors from 'tailwindcss/colors';

// Define your categories enum
enum Category {
  NATURAL = 'natural',
  TOURISM = 'tourism',
  CATERING = 'catering',
  BEACH = 'beach',
  ENTERTAINMENT = 'entertainment',
}

export interface MarkerCategoriesValues {
  name: string;
  icon: any;
  color: string;
  hideInMenu?: boolean;
}

const MarkerCategories: { [key in Category]: MarkerCategoriesValues } = {
  [Category.NATURAL]: {
    name: 'Natural',
    icon: Leaf,
    color: colors.green[400],
    hideInMenu: false,
  },
  [Category.TOURISM]: {
    name: 'Tourism',
    icon: CameraIcon,
    color: colors.blue[400],
  },
  [Category.CATERING]: {
    name: 'Catering',
    icon: Utensils,
    color: colors.orange[400],
  },
  [Category.BEACH]: {
    name: 'Beach',
    icon: Sun,
    color: colors.yellow[400],
  },
  [Category.ENTERTAINMENT]: {
    name: 'Entertainment',
    icon: MusicIcon,
    color: colors.purple[400],
  },
};

// Function to map API categories to a single MarkerCategory
const mapToSingleMarkerCategory = (
  categories: string[]
): MarkerCategoriesValues => {
  const categoryMapping: { [key: string]: Category } = {
    natural: Category.NATURAL,
    'leisure.park': Category.NATURAL,
    tourism: Category.TOURISM,
    'tourism.attraction': Category.TOURISM,
    catering: Category.CATERING,
    beach: Category.BEACH,
    entertainment: Category.ENTERTAINMENT,
    // Add more mappings as needed
  };

  for (const category of categories) {
    if (categoryMapping[category]) {
      return MarkerCategories[categoryMapping[category]];
    }
  }

  // Return default if no category matches
  return {
    name: 'Default',
    icon: PersonStanding,
    color: colors.gray[400],
  };
};

export { Category, MarkerCategories, mapToSingleMarkerCategory };
