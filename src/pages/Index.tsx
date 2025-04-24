
import React from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Trust from '@/components/Trust';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
          <Pricing />
          <Trust />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
