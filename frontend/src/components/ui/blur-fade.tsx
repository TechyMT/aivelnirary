import React, { ReactNode } from 'react';
import BlurFade from '../magicui/blur-fade';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0.3,
  duration = 0.3,
}) => {
  return (
    <BlurFade delay={delay} inView>
      <motion.div
        layoutId="itinerary-modal"
        transition={{ duration: duration }}
      >
        {children}
      </motion.div>
    </BlurFade>
  );
};

export default FadeIn;
