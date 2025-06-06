import { Footer } from '@/components/layout/footer';
import { HeaderProtected } from '@/components/protected/header-protected';
import { RewindPage } from '@/components/protected/rewind/rewind-page';

export default function Protected() {
  return (
    <main className="min-h-screen overflow-hidden">
      <HeaderProtected />

      <RewindPage />

      <Footer />
    </main>
  );
}
