import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
            <img src='/logo.png' alt='YouTidy Logo' className='h-8 w-8 rounded-full'/>
            <span className="font-jakarta font-bold text-xl text-[#FFE066]">YouTidy</span>
            </Link>
            <p className="mt-2 text-sm text-white/80">
              © {new Date().getFullYear()} YouTidy. All rights reserved.
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-6 justify-center">
            <Link href="#" className="text-sm text-white/80 hover:text-[#FFE066]">
              Contact
            </Link>
            <Link href="#" className="text-sm text-white/80 hover:text-[#FFE066] flex items-center gap-1">
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link href="#" className="text-sm text-white/80 hover:text-[#FFE066]">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-white/80 hover:text-[#FFE066]">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}