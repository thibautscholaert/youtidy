'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { AppDemo1 } from './app-demo-1';

export function AppDemo() {
  return (
    <section id="demo" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl">
        <motion.div
          className="max-w-6xl mx-auto glass-card rounded-3xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

<Carousel opts={{ loop: true, slidesToScroll: 1 }} className='rounded-3xl'>
                      <CarouselContent>
                      <CarouselItem>
                     <AppDemo1/>
                        </CarouselItem>
                      <CarouselItem>
                     <AppDemo1/>
                        </CarouselItem>
                        
                      </CarouselContent>
                      <CarouselPrevious className="left-0 top-1/2" />
                      <CarouselNext className="right-0 top-1/2" />
                    </Carousel>

          
        </motion.div>
      </div>
    </section>
  );
}
