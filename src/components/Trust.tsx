
import React from 'react';
import { Shield, FileText, Info } from 'lucide-react';

type TrustItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TrustItem: React.FC<TrustItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-sm mx-auto">
      <div className="w-14 h-14 bg-youtidy-soft-purple text-youtidy-purple rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Trust: React.FC = () => {
  const trustItems = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Read-only Access",
      description: "We only request minimal permissions to read your YouTube data. We never post or modify anything on your behalf."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "No Subscriptions",
      description: "Pay once, use forever. We don't believe in trapping you with recurring payments for a service you already own."
    },
    {
      icon: <Info className="w-6 h-6" />,
      title: "Your Data, Your Control",
      description: "Your data stays with you or gets deleted after use. We don't store or sell your personal information."
    }
  ];

  return (
    <section id="trust" className="section-padding bg-youtidy-soft-purple/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Privacy by Design</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We built Youtidy with your privacy and trust as our top priority.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {trustItems.map((item, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <TrustItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
