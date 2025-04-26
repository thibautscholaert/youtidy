"use client";

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SignInButton from '../sign-in-button';
import { createClient } from '@/lib/supabase/client';

const navItems: { name: string; href: string; auth?: boolean }[] = [
  { name: 'Home', href: '/protected' },
  { name: 'Playlists', href: '/protected/playlists' },
  { name: 'Rewind', href: '/protected/rewind' },
  // { name: 'Pricing', href: '#pricing' },
  // { name: 'Privacy', href: '#trust' },
  // { name: 'My space', href: '/protected', auth: true },
];

export function HeaderProtected() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'glass-card backdrop-blur-lg'
        : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="YouTidy home"
            >
              <img src='/logo.png' alt='YouTidy Logo' className='h-8 w-8 rounded-full' />
              <span className="font-jakarta font-bold text-xl text-[#FFE066]">YouTidy</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white hover:text-[#FFE066] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <SignInButton />
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden glass-card backdrop-blur-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.auth ? (authenticated && <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#FFE066] hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>) : <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#FFE066] hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-3">
              <SignInButton />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}