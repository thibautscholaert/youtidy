'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Clock as ClockCountdown, Database } from 'lucide-react';

const trustPoints = [
  {
    title: 'Read-only YouTube access',
    description: 'We only request viewing permissions to your YouTube account.',
    icon: <Eye className="h-6 w-6 text-[#FFE066]" />,
  },
  {
    title: 'No subscriptions',
    description: "Buy once, use forever. We don't charge recurring fees.",
    icon: <ClockCountdown className="h-6 w-6 text-[#FFE066]" />,
  },
  {
    title: 'Data stays with you',
    description: 'Your data is only stored for the duration of your session or saved locally.',
    icon: <Database className="h-6 w-6 text-[#FFE066]" />,
  },
  {
    title: 'Private & secure',
    description: "We don't track your viewing habits or sell your data to third parties.",
    icon: <Shield className="h-6 w-6 text-[#FFE066]" />,
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Privacy & Trust
          </motion.h2>
          <motion.p
            className="text-xl text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We built YouTidy with your privacy and data security in mind.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className="glass-card flex gap-4 items-start p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-3 rounded-full bg-white/10">{point.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#FFE066]">{point.title}</h3>
                <p className="text-white/90">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
