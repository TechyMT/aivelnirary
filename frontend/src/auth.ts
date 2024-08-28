import NextAuth, { type User, DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import axios from 'axios';
import { getBaseUrl } from './lib/utils';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [Google],
  callbacks: {
    async session({ session }) {
      try {
        const data = await axios.get(
          `${getBaseUrl()}/user/getByEmail?email=${session.user.email}`
        );
        const sessionUser = data.data.user;
        return {
          ...session,
          user: {
            ...session.user,
            id: sessionUser._id,
            name: sessionUser.name,
            age: sessionUser.age,
            title: sessionUser.title,
            bio: sessionUser.bio,
            persona: sessionUser.persona,
            created_at: sessionUser.created_at,
            itineraries: sessionUser.itineraries,
            profile_completed: sessionUser.profile_completed,
          },
        };
      } catch (error) {
        return session;
      }
    },

    async signIn(profile) {
      try {
        const response = await axios.post(`${getBaseUrl()}/user/signup`, {
          email: profile.user.email,
        });
      } catch (error) {}
      return true;
    },
  },
});
