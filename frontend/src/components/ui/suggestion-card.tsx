import * as React from 'react';
import { cn } from '@/lib/utils';
import { CookingPot, Mountain, Camera, Utensils, Leaf } from 'lucide-react';
import { Tooltip } from './tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition-shadow duration-300 ease-in-out h-72',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.0 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-semibold leading-none tracking-tight text-xl',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground line-clamp-2', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 flex-grow', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0 justify-between', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

// Type definitions for the data structure
interface Catering {
  cuisine?: string;
  diet?: {
    vegetarian?: boolean;
  };
}

interface PlaceData {
  name: string;
  categories: string[];
  formatted: string;
  contact?: string;
  website?: string;
  opening_hours?: string;
  catering?: Catering;
}

interface CardComponentProps {
  data: {
    properties: PlaceData;
  };
}

// Utility function to render category icons
const renderCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'catering':
      return (
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center">
              <CookingPot className="text-red-500 inline mr-1" />
              <div className="text-muted-foreground text-sm">: Food-Place</div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white p-2 shadow-xl rouded-2xl text-xs font-semibold text-muted-foreground">
            food
          </TooltipContent>
        </Tooltip>
      );
    case 'natural':
      return (
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center">
              <Mountain className="text-red-500 inline mr-1" />
              <div className="text-muted-foreground text-sm"> Adventure</div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white p-2 shadow-xl rouded-2xl text-xs font-semibold text-muted-foreground">
            adventure
          </TooltipContent>
        </Tooltip>
      );
    case 'tourism':
    case 'entertainment':
      return (
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center">
              <Camera className="text-yellow-500 inline mr-1" />
              <div className="text-muted-foreground text-sm">
                {' '}
                Tourist-Place
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white p-2 shadow-xl rouded-2xl text-xs font-semibold text-muted-foreground">
            tourist-place
          </TooltipContent>
        </Tooltip>
      );
    default:
      return null; // Do not render if category is not matched
  }
};

// Utility function to render cuisine types and dietary information
const renderCuisineTypes = (catering: Catering | undefined) => {
  const cuisineTypes = catering?.cuisine ? catering?.cuisine.split(';') : [];

  return (
    <div className="text-sm text-muted-foreground">
      <p>
        {cuisineTypes.length > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center">
                <Utensils className="text-yellow-500 inline mr-1" />
                <div>: Regional Cuisine</div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white p-2 shadow-xl rouded-2xl text-xs font-semibold">
              regional
            </TooltipContent>
          </Tooltip>
        )}
        {catering?.diet?.vegetarian && (
          <Tooltip>
            <TooltipTrigger>
              <div className="flex">
                <Leaf className="text-green-500 inline mr-1" />
                <div className="flex items-center">: Pure-Veg</div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white p-2 shadow-xl rouded-2xl text-xs font-semibold">
              pure-veg
            </TooltipContent>
          </Tooltip>
        )}
      </p>
    </div>
  );
};

const CardComponent: React.FC<CardComponentProps> = ({ data }) => {
  const { name, categories, formatted, catering } = data.properties;

  return (
    <Card
      className={cn('max-w-lg mx-auto', {
        'bg-green-100 bg-opacity-35': catering?.diet?.vegetarian,
      })}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatted}</CardDescription>
      </CardHeader>
      <CardContent>
        {categories.length > 0 && (
          <div className="mb-4">
            <p className="text-muted-foreground font-semibold">Categories:</p>
            <div className="flex flex-col gap-2">
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  {renderCategoryIcon(category)}
                </React.Fragment>
              ))}
              {catering && renderCuisineTypes(catering)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { CardComponent, Card };
