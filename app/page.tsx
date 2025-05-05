import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { TrustSection } from '@/components/sections/trust-section';
import { Footer } from '@/components/layout/footer';
import { AppDemo } from '@/components/sections/app-demo';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <HeroSection />
      <AppDemo />
      <FeaturesSection />
      <PricingSection />
      <TrustSection />
      <Footer />
    </main>
  );
}
