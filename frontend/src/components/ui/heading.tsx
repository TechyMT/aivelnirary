import React from 'react';
import BlurFade from '../magicui/blur-fade';
import { motion } from 'framer-motion';

const Heading = ({ title, children }: { title?: string; children?: any }) => {
  return (
    <BlurFade delay={0.3} inView>
      <span className="flex pointer-events-none min-h-fit whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        {children || title}
      </span>
    </BlurFade>
  );
};

export default Heading;
