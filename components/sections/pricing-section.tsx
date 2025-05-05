'use client';

import { useToast } from '@/hooks/use-toast';
import { getStripe } from '@/lib/stripe';
import { motion } from 'framer-motion';
import { Check, SparklesIcon } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '€0',
    features: ['Up to 300 liked videos', 'Basic auto sorting', '2 playlists', 'Standard support'],
    cta: 'Get started',
    ctaColor: 'secondary',
    popular: false,
  },
  {
    name: 'Pack Clean-up',
    price: '€9',
    period: 'one-time',
    features: [
      'Unlimited likes',
      'Smart filters',
      'Unlimited playlists',
      'Full search',
      'YouTube/CSV export',
      'Priority support',
    ],
    cta: 'Buy now',
    ctaColor: 'primary',
    popular: true,
    productId: 'PACK_CLEANUP',
  },
  {
    name: 'Pack Nostalgia',
    price: '€19',
    period: 'one-time',
    features: [
      'Everything in Pack Clean-up',
      'Takeout import',
      'Full history stats',
      'Year-based stats',
      'Memory book export',
      '"Memoress" playlists',
      'Premium support',
    ],
    cta: 'Unlock',
    ctaColor: 'primary',
    popular: false,
    productId: 'PACK_NOSTALGIA',
  },
];

export function PricingSection() {
  const { toast } = useToast();

  const handlePurchase = async (productId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
        return;
      }

      const stripe = await getStripe();
      if (!stripe) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Stripe failed to load. Please try again.',
        });
        return;
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: stripeError.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <section id="pricing" className="section py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            A simple price, no subscription.
            <br />
            Like YouTube in 2008
          </motion.h2>
          <motion.p
            className="text-xl text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pay once, use forever. No monthly subscriptions or hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`glass-card overflow-hidden flex flex-col justify-between h-full p-6 ${
                plan.popular ? 'border-2 border-[#FFE066]' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="flex items-center justify-center gap-2 top-0 left-0 w-full absolute bg-[#FFE066] text-gray-900 text-center py-1 text-sm font-medium">
                  <SparklesIcon className="w-4 h-4 inline" />{' '}
                  <span className="uppercase font-semibold">most popular</span>
                </div>
              )}
              <div className="py-4">
                <h3 className="text-2xl font-bold mb-2 text-[#FFE066]">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/80 mb-1">{plan.period}</span>}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white">
                      <Check className="h-5 w-5 text-[#FFE066] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full retro-button ${
                  plan.ctaColor === 'secondary' ? 'bg-white/20 text-white hover:bg-white/30' : ''
                }`}
                onClick={() => plan.productId && handlePurchase(plan.productId)}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
