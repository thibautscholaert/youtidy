
import React from 'react';
import { Calendar, Search, Zap, List, Play, Star } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white dark:bg-card p-6 rounded-xl border border-border shadow-sm animated-card">
      <div className="w-12 h-12 bg-youtidy-soft-purple text-youtidy-purple rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: "Automatic Categorization",
      description: "Smart tagging organizes your videos by topic, creator, and style without any effort.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Dynamic Playlists",
      description: "Create intelligent playlists that update automatically as you like new videos.",
      icon: <List className="w-6 h-6" />
    },
    {
      title: "Timeline Exploration",
      description: "Browse your liked videos chronologically to rediscover content from specific time periods.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Advanced Search",
      description: "Find exactly what you're looking for with powerful search by title, channel, or date.",
      icon: <Search className="w-6 h-6" />
    },
    {
      title: "Nostalgia Mode",
      description: "Upload your Google Takeout file to explore your complete YouTube history.",
      icon: <Play className="w-6 h-6" />
    },
    {
      title: "Favorite Creators",
      description: "Track and get insights about your most-liked content creators over time.",
      icon: <Star className="w-6 h-6" />
    },
  ];

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-background to-youtidy-soft-purple/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Rediscover What You've Been Missing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop letting your liked videos disappear into the void. Youtidy brings them back to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
