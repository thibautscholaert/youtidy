'use client';

import { signOutAction } from '@/app/actions';
import { handleGoogleSignIn } from '@/lib/auth';
import { createClient } from '@/lib/supabase/client';
import { Loader2Icon } from 'lucide-react';
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
        <button className="retro-button" type="submit">
          Sign out
        </button>
      </form>
    ) : (
      <button className="retro-button" onClick={handleGoogleSignIn}>
        <img src="google.png" className="h-6 w-6 mr-2 inline bg-white rounded-full" /> Sign in with
        Google
      </button>
    )
  ) : (
    <button className="retro-button" disabled>
      <Loader2Icon className="animate-spin h-6 w-6 inline" />
    </button>
  );
}
