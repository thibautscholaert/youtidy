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

export async function getToken(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user && user.email) {
    const googleAccessToken = await supabase
      .from('user_provider_token')
      .select('access_token , expires_at')
      .eq('provider', 'youtube')
      .eq('email', user.email)
      .single();

    if (googleAccessToken.data) {
      console.log('Google Access Token:', googleAccessToken.data.access_token);
      // TODO : check if token is expired
      let { access_token, expires_at } = googleAccessToken.data;

      if (new Date(expires_at).getTime() < new Date().getTime()) {
        const refreshedRes = await fetch('/api/refresh-token', {
          method: 'POST',
        });
        const refreshed = await refreshedRes.json();
        if (refreshed.error) {
          console.error('Error refreshing token:', refreshed.error);
          return null;
        }
        access_token = refreshed.access_token;
      }

      return access_token;
    }
  }
  return null;
}
