
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type PricingTierProps = {
  title: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
  description: string;
}

const PricingTier: React.FC<PricingTierProps> = ({ title, price, features, cta, popular, description }) => {
  return (
    <div className={`bg-white dark:bg-card rounded-2xl shadow-sm border ${popular ? 'border-youtidy-purple ring-2 ring-youtidy-purple/20' : 'border-border'} p-8 flex flex-col h-full`}>
      {popular && (
        <div className="bg-youtidy-purple text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-muted-foreground ml-1">one-time</span>}
      </div>
      
      <ul className="mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start mb-3">
            <Check className="w-5 h-5 text-youtidy-purple mr-2 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant={popular ? "default" : "outline"} 
        className={popular ? "bg-youtidy-purple hover:bg-youtidy-dark-purple w-full" : "w-full"}
      >
        {cta}
      </Button>
    </div>
  );
};

const Pricing: React.FC = () => {
  const tiers = [
    {
      title: "Free",
      price: "Free",
      description: "Perfect for casual YouTube users",
      features: [
        "Organize up to 300 liked videos",
        "Basic categorization",
        "Simple search",
        "7-day history"
      ],
      cta: "Get Started"
    },
    {
      title: "Pack Clean-up",
      price: "€9",
      description: "For serious content curators",
      features: [
        "Unlimited liked videos",
        "Advanced smart filters",
        "Channel-based organization",
        "Permanent access",
        "Export playlists to YouTube"
      ],
      cta: "Buy Now",
      popular: true
    },
    {
      title: "Pack Nostalgia",
      price: "€19",
      description: "Complete YouTube history explorer",
      features: [
        "Everything in Pack Clean-up",
        "Google Takeout import",
        "Full history statistics",
        "Viewing patterns analysis",
        "Memory book PDF export",
        "Priority support"
      ],
      cta: "Get Full Access"
    }
  ];

  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No subscriptions or hidden fees. Just a one-time payment for permanent access.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <PricingTier {...tier} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-muted-foreground">
          <p>All prices include VAT. No recurring payments. Pay once, use forever.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
