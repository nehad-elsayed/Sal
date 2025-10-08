export default function LoadingLogo() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gray-50">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-primary"></div>

        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-pulse rounded-full h-3 w-3 bg-primary"></div>
        </div>

        {/* Loading text */}
        <div className="mt-4 text-center">
          <p className="text-primary font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
}
