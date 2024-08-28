// @interfaces/itinerary.interface.ts

export interface DayWiseData {
    arrival_time: Date;
    description: string;
    place_details: {
        address: string;
        name: string;
        position: {
            lat: number;
            lng: number;
        };
    };
    type: string;
}

export interface Itinerary {
    _id: string;
    start_date: Date;
    duration: number;
    source: string;
    destination: string;
    budget: string;
    cost: string;
    precautions: string;
    day_wise_data: Record<string, DayWiseData[]>;
    imgUrl: string;
}

export interface MLDayWiseData {
    arrivalTime: string;
    description: string;
    placeDetails: {
        address: string;
        name: string;
        position: {
            lat: string;
            lon: string;
        }
    };
    type: string;
}

export interface MLItinerary {
    budget: string;
    cost: string;
    dayWiseData: {
        [key: string]: MLDayWiseData[];
    };
    destination: string;
    duration: string;
    precautions: string;
    source: string;
    startDate: string;
    imgUrl: string;
}

export interface ItineraryRequest {
    trip_data: {
        mapImgUrl: string;
        start_date: string;
        duration: string;
        source: string;
        destination: string;
        budget: string;
        places_data: Array<{
            place_details: {
                name: string;
                address: string;
                position: {
                    lat: string;
                    lon: string;
                };
            };
            type: string;
        }>;
    };
    user_persona: {
        prefered_activities: {
            sightseeing: boolean;
            adventure: boolean;
            cultural_experiences: boolean;
            nightlife: boolean;
        };
        food_preferences: {
            local_cuisine: boolean;
            vegetarian: boolean;
        };
        tripstyle: string;
    };
    user: {
        email: string;
        name: string;
        id: string;
    }
}