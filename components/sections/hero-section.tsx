"use client";

import { motion } from 'framer-motion';
import { RocketIcon, ThumbsUpIcon } from 'lucide-react';

export function HeroSection() {

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-24 sm:pt-16 overflow-hidden section">
      <div className="hero-glow"></div>
      <div className="container mx-auto pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="my-6 font-semibold flex flex-wrap gap-2 items-center justify-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              className='text-4xl py-1'>
              You like.
              {/* <ThumbsUpIcon className='inline-block w-8 h-8 ' /> */}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className='text-4xl py-1 '>You forget.</motion.span>
            <motion.span
              initial={{ opacity: 0, y: -400 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className='text-5xl py-2 text-gradient'><strong>We</strong> tidy.</motion.span>
          </motion.h1>

          <motion.p
            className="mb-10 text-xl md:text-2xl text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            YouTidy organizes your YouTube likes so you actually find them again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="retro-button-accent flex items-center justify-center gap-2 sm:gap-4" onClick={() => scrollTo('demo')}>
              <RocketIcon className='w-5 h-5 inline' />
              <span className="text-lg"> Get started</span>
            </button>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Read-only access, promise not to mess things up.
          </motion.p>
        </div>
      </div>
    </section>
  );
}