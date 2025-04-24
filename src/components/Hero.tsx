
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto py-20 md:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/3 -right-64 w-96 h-96 bg-youtidy-soft-purple rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -z-10 bottom-1/4 -left-32 w-64 h-64 bg-youtidy-soft-blue rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
          You like. You forget. <span className="text-gradient">We tidy.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Youtidy organizes your YouTube likes so you actually find them again.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" className="bg-youtidy-purple hover:bg-youtidy-dark-purple text-white h-14 px-8 text-lg">
            Sign in with Google
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
            Learn more
          </Button>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto relative animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-border">
            <div className="h-8 bg-gradient-to-r from-youtidy-purple/20 to-youtidy-bright-blue/20 flex items-center px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-youtidy-soft-purple/30 rounded-lg p-4 animate-pulse-light">
                  <div className="h-24 bg-youtidy-soft-purple/50 rounded-md mb-3"></div>
                  <div className="h-3 bg-youtidy-purple/30 rounded-md w-3/4 mb-2"></div>
                  <div className="h-3 bg-youtidy-purple/20 rounded-md w-1/2"></div>
                </div>
                <div className="bg-youtidy-soft-blue/30 rounded-lg p-4 animate-pulse-light" style={{ animationDelay: '0.5s' }}>
                  <div className="h-24 bg-youtidy-soft-blue/50 rounded-md mb-3"></div>
                  <div className="h-3 bg-youtidy-bright-blue/30 rounded-md w-3/4 mb-2"></div>
                  <div className="h-3 bg-youtidy-bright-blue/20 rounded-md w-1/2"></div>
                </div>
                <div className="bg-youtidy-light-gray rounded-lg p-4 animate-pulse-light" style={{ animationDelay: '1s' }}>
                  <div className="h-24 bg-youtidy-neutral-gray/20 rounded-md mb-3"></div>
                  <div className="h-3 bg-youtidy-neutral-gray/30 rounded-md w-3/4 mb-2"></div>
                  <div className="h-3 bg-youtidy-neutral-gray/20 rounded-md w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
