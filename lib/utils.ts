import { DateTime } from 'luxon';
import { clsx, type ClassValue } from 'clsx';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function parseLocalizedDate(input: string, locale = 'fr') {
  // 1. Extract the timezone
  const tzAbbr = input.match(/\b[A-Z]{2,4}\b$/)?.[0] || 'CEST';

  // 2. Clean the string (remove the timezone)
  const cleaned = input.replace(/\b[A-Z]{2,4}\b$/, '').trim();

  // 3. Map abbreviation to IANA time zone
  const zoneMap: Record<string, string> = {
    CEST: 'Europe/Paris',
    CET: 'Europe/Paris',
    PST: 'America/Los_Angeles',
    EST: 'America/New_York',
  };

  const zone = zoneMap[tzAbbr] || 'UTC';

  // 4. Parse
  const dt = DateTime.fromFormat(cleaned, 'd LLLL yyyy, HH:mm:ss', {
    locale: 'fr',
    zone,
  });

  return dt.toJSDate();
}
