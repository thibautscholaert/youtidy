import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export const PRODUCTS = {
  PACK_CLEANUP: {
    name: 'Pack Clean-up',
    price: 900, // €9.00 in cents
    currency: 'eur',
    description: 'Unlimited likes, smart filters, and unlimited playlists',
  },
  PACK_NOSTALGIA: {
    name: 'Pack Nostalgia',
    price: 1900, // €19.00 in cents
    currency: 'eur',
    description: 'Everything in Pack Clean-up plus Takeout import and full history stats',
  },
};