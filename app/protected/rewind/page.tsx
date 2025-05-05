import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { HeaderProtected } from '@/components/protected/header-protected';
import { ProtectedPage } from '@/components/protected/protected-page';
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
