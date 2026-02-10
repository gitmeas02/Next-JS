// app/global-error.tsx
'use client'; // Global error components must be client components

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number }; // Add statusCode to the type definition
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    // You can use a service like Sentry here
  }, [error]);

  const statusCode = error.statusCode || 500; // Default to 500 if no status code is available
  const errorMessage = error.message || 'An unexpected error occurred';

  return (
    <html>
      <body>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Error {statusCode}</h1>
          <p>{errorMessage}</p>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  );
}
