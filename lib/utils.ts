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

export function createParserWorker() {
  return new Worker(new URL('../workers/parser.worker.ts', import.meta.url), {
    type: 'module',
  });
}

export function createWorker() {
  return new Worker(new URL('../workers/worker.ts', import.meta.url), {
    type: 'module',
  });
}
