'use client';
import {
  motion,
  useMotionTemplate,
  useSpring,
} from 'framer-motion';

import { PropsWithChildren } from 'react';

export const BgEffect: React.FC<PropsWithChildren> = ({ children }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, transparent, white)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className="overflow-scroll sm:overflow-hidden relative duration-700 
      bg-gradient-to-t from-white to-orange-500
      group md:gap-8 h-screen w-full md:h-full"
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br via-white opacity-100 transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>
      {children}
    </div>
  );
};
