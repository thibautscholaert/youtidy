'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SuccessPage() {
  // const searchParams = useSearchParams();
  // const sessionId = searchParams.get('session_id');

  // useEffect(() => {
  //   // Here you would typically verify the payment with your backend
  //   // and update the user's access level
  //   console.log('Payment successful, session ID:', sessionId);
  // }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Thank you for your purchase. Your account has been upgraded and you now have access to
            all features.
          </p>
          <Link href="/" passHref>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
