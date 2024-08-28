import { Document } from 'mongoose';


export interface PreferredActivities {
  sightseeing?: boolean;
  adventure?: boolean;
  cultural_experiences?: boolean;

  nightlife?: boolean;
}

export interface FoodPreferences {
  local_cuisine: boolean;
  vegetarian: boolean;
}

export interface Persona {
  prefered_activities: PreferredActivities;
  food_preferences: FoodPreferences;
  tripstyle: string;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  age: number;
  title?: string;
  bio?: string;
  token: string;
  persona?: Persona; // Make persona optional
  created_at: Date;
  itineraries: string[]; // Assuming itineraries are referenced by their IDs
  profile_completed: boolean;
}
