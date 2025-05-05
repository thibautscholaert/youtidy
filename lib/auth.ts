import { createClient } from './supabase/client';

export async function handleGoogleSignIn() {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback/`,
      scopes: 'https://www.googleapis.com/auth/youtube.readonly email profile',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
}
