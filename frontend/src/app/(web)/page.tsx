'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedGradientText from '@/components/magicui/animated-gradient-text';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import AuthProtector from '@/config/protectors/AuthProtector';
import Footer from '@/components/Footer';
import GlobeAnimation from '@/components/GlobeAnimation';
import { useEffect } from 'react';

const repoPrompt = `
__  __  __
\u005C \u005C \u005C \u005C \u005C\u2215\n \u005C \u005C\u2215\u005C \u005C\n  \u005C\u2215  \u005C\u2215
\n\nTaking a peek huh? Check out the source code: https://github.com/TechyMT/aivelnirary
`;

function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.info(repoPrompt);
  });

  return (
    <div className="flex flex-col min-h-screen  overflow-hidden">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-md w-full space-y-8 text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <AnimatedGradientText className="">
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] text-4xl font-semibold bg-clip-text text-transparent`
                  )}
                >
                  Travel Buddy
                </span>
              </AnimatedGradientText>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl bg">
              Plan Your Journey
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl bg-white rounded-full">
              Create beautiful AI-powered travel itineraries with ease. Your
              next adventure starts here.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              className=" w-full"
              size="lg"
              onClick={() => {
                if (status === 'unauthenticated') {
                  signIn();
                } else {
                  router.push('/create-itinerary');
                }
              }}
            >
              {status === 'authenticated' ? 'Create Itinerary Now!' : 'Login'}
            </Button>
          </motion.div>
        </div>
      </main>
      <GlobeAnimation />
      <Footer />
    </div>
  );
}

export default AuthProtector(LandingPage);
