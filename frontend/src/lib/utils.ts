import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL;
}

export function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

interface Position {
  lat: number;
  lng: number;
}

interface PlaceDetails {
  name: string;
  address: string;
  position: Position;
}

interface PlaceData {
  arrival_time: string;
  description: string;
  place_details: PlaceDetails;
  type: string;
}

interface ItineraryData {
  budget: number;
  cost: number;
  day_wise_data: {
    [day: string]: PlaceData[];
  };
  destination: string;
  duration: number;
  precautions: string;
  source: string;
  start_date: string;
  imgUrl: string;
}

export function generateItineraryMarkdown(
  itinerary: ItineraryData,
  clientName: string
): string {
  if (!itinerary) {
    return '';
  }

  // Create the day-wise itinerary markdown
  const dayWiseMarkdown = Object.entries(itinerary.day_wise_data)
    .map(([day, places]) => {
      if (!Array.isArray(places)) {
        console.error(`Places data for ${day} is invalid or not an array.`);
        return `## ${day}\nNo data available\n`;
      }

      const placesMarkdown = places
        .map((place) => {
          const { arrival_time, description, place_details, type } = place;
          const { address, name, position } = place_details;
          const gmapsUrl = `https://www.google.com/maps?q=${
            position.lat
          },${position.lng}&marker=${position.lat},${
            position.lng
          }(${encodeURIComponent(name)})`;

          return `
- **${name}**  
  - *Description:* ${description}
  - *Arrival Time:* ${new Date(arrival_time).toLocaleString()}
  - *Address:* ${address}
  - [View on Google Maps](${gmapsUrl})
`;
        })
        .join('');

      return `
## ${day}
${placesMarkdown}
`;
    })
    .join('');

  return `
# Travel Itinerary

![Banner Image](https://picsum.photos/1000/300)

**Specially Curated For:** ${clientName}

**Source:** ${itinerary.source}  
**Destination:** ${itinerary.destination}  
**Duration:** ${itinerary.duration} days  
**Budget:** ${itinerary.budget}  
**Cost:** ${itinerary.cost}  

## Precautions
${itinerary.precautions}

${dayWiseMarkdown}

---
&copy; 2024 Travel Buddy. All rights reserved.
`;
}
