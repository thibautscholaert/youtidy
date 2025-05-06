'use client';

import { signOutAction } from '@/app/actions';
import { handleGoogleSignIn } from '@/lib/auth';
import { createClient } from '@/lib/supabase/client';
import { Loader2Icon, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SignInButton() {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setReady(true);
    });
  }, [setAuthenticated, setReady]);

  return ready ? (
    authenticated ? (
      <form action={signOutAction}>
        <button className="retro-button flex items-center gap-2" type="submit">
          Sign out
          <LogOut className="h-5 w-5 inline" />
        </button>
      </form>
    ) : (
      <button className="retro-button" onClick={handleGoogleSignIn}>
        <img src="google.png" className="h-6 w-6 mr-2 inline bg-white rounded-full" alt="Sign in" />
        Sign in with Google
      </button>
    )
  ) : (
    <button className="retro-button" disabled>
      <Loader2Icon className="animate-spin h-6 w-6 inline" />
    </button>
  );
}
