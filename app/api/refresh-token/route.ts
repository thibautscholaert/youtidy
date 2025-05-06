import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    const email = user.data.user?.email;
    if (!email) {
      return NextResponse.json({ error: 'Email not found in session' }, { status: 400 });
    }

    const tokenRes = await supabase
      .from('user_provider_token')
      .select('refresh_token')
      .eq('email', email)
      .single();

    if (tokenRes.error || !tokenRes.data) {
      console.error('Error fetching refresh token:', tokenRes.error);
      return NextResponse.json({ error: 'Error fetching refresh token' }, { status: 500 });
    }

    const refreshToken: string = tokenRes.data.refresh_token;

    const refreshed = await refreshAccessToken(refreshToken);

    const expiresAt = new Date(Date.now() + 55 * 60 * 1000); // Current time + 55 minutes as a Date object
    const upsertRes = await supabase.from('user_provider_token').upsert(
      {
        email,
        provider: 'youtube',
        access_token: refreshed.access_token,
        expires_at: expiresAt,
        updated_at: new Date(),
      },
      {
        onConflict: 'email,provider',
      }
    );

    console.log('Upsert result:', upsertRes);

    return NextResponse.json(refreshed);
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: 'Error refreshing token' }, { status: 500 });
  }
}

async function refreshAccessToken(refreshToken: string) {
  const body = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  return res.json(); // contains new access_token + expires_in
}
