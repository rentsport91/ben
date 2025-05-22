export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>

        {/* Loading text
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Loading Logistics Dashboard
        </h2> */}
        <p className="text-gray-500">Please wait while we fetch your data...</p>
      </div>
    </div>
  );
}
