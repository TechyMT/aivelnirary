import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      image: string;
      name: string;
      age?: number | string;
      title?: string;
      bio?: string;
      persona?: {
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
        tripstyle: relaxation;
      };
      created_at?: string;
      itineraries?: [any];
      profile_completed?: boolean;
    };
  }
}
