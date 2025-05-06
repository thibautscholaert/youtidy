export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();

  const supabase = await createClient();
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  console.log('Redirecting to:', redirectTo);
  console.log('Origin:', origin);

  const { data: supaSession } = await supabase.auth.getSession();

  if (!supaSession.session) {
    console.error('No session found');
    return NextResponse.redirect(`${origin}`);
  } else {
    const accessToken = supaSession.session.provider_token;
    const refreshToken = supaSession.session.provider_refresh_token;

    const expiresAt = new Date(Date.now() + 55 * 60 * 1000); // Current time + 55 minutes as a Date object
    const upsertRes = await supabase.from('user_provider_token').upsert({
      email: supaSession.session.user.email,
      provider: 'youtube',
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    });
    console.log('Upsert result:', upsertRes);
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  return NextResponse.redirect(`${origin}/protected`);
}
