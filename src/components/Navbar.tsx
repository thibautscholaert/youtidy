
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gradient">Youtidy</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/#features" className="text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link to="/#pricing" className="text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link to="/#trust" className="text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Log in
          </Button>
          <Button className="bg-youtidy-purple hover:bg-youtidy-dark-purple text-white">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
