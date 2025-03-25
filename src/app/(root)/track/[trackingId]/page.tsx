import TrackingResult from "@/components/features/tracking.result";
import Link from "next/link";
import { prisma } from "@/constants/config/db";

interface TrackingResultsPageProps {
  searchParams: {
    id?: string;
  };
}

async function getTrackingData(trackingNumber: string) {
  const result = await prisma.shipment.findUnique({
    where: { trackingNumber },
    include: {
      TrackingUpdates: { orderBy: { timestamp: "asc" } },
      packages: true,
    },
  });

  if (!result) return null;

  return {
    ...result,
    packages: result.packages.map((pkg) => ({
      ...pkg,
      createdAt: pkg.createdAt.toISOString(),
      updatedAt: pkg.updatedAt.toISOString(),
    })),
    TrackingUpdates: result.TrackingUpdates.map((update) => ({
      ...update,
      timestamp: update.timestamp.toISOString(),
    })),
  };
}

export default async function TrackingResultsPage({
  searchParams,
}: TrackingResultsPageProps) {
  const trackingNumber = searchParams.id ?? "";
  if (!trackingNumber) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              No Tracking Number Provided
            </h1>
            <p className="text-gray-500 mb-6">
              Please enter a tracking number to track your shipment.
            </p>
            <Link
              href="/track"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Tracking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const trackingData = await getTrackingData(trackingNumber);

  try {
    return <TrackingResult data={trackingData} />;
  } catch (error) {
    console.log(error);

    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Error Retrieving Tracking Information
          </h1>
          <p className="text-gray-500 mb-6">
            We were unable to find tracking information for the number:{" "}
            {trackingNumber}
          </p>
          <Link
            href="/track"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }
}
