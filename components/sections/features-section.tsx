"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FolderSearch, List, Clock, BarChart3 } from 'lucide-react';

const features = [
  {
    title: 'Smart sorting',
    description: 'Our AI automatically categorizes your videos by topic, length, and content type.',
    icon: <FolderSearch className="h-8 w-8 text-[#FFE066]" />,
  },
  {
    title: 'Dynamic playlists',
    description: 'Create custom playlists from your likes or let us generate them based on your preferences.',
    icon: <List className="h-8 w-8 text-[#FFE066]" />,
  },
  {
    title: 'Nostalgia mode',
    description: 'Rediscover videos from years ago with our time machine feature.',
    icon: <Clock className="h-8 w-8 text-[#FFE066]" />,
  },
  {
    title: 'Personal stats',
    description: 'See your viewing habits, favorite creators, and content preferences visualized.',
    icon: <BarChart3 className="h-8 w-8 text-[#FFE066]" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="section py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Your YouTube memory deserves<br />
            better than endless scrolling
          </motion.h2>
          <motion.p 
            className="text-xl text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            You like videos to rewatch them later, but you never do.<br />
            YouTidy gives you back control of your personal YouTube library.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-card flex flex-col items-center text-center p-6"
              variants={featureVariants}
            >
              <div className="mb-5 p-4 rounded-full bg-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#FFE066]">{feature.title}</h3>
              <p className="text-white/90">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}