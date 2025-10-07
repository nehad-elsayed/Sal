import { AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export default function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        {/* Error Title */}
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Un expected error</h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          Sorry, an error occurred in the application. Please try again.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
            <h3 className="text-sm font-medium text-red-800 mb-2">تفاصيل الخطأ:</h3>
            <pre className="text-xs text-red-700 whitespace-pre-wrap break-words">
              {error.message}
            </pre>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer">عرض Stack Trace</summary>
                <pre className="text-xs text-red-700 whitespace-pre-wrap break-words mt-1">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

