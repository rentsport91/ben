import { Suspense } from "react";
import TrackingResult from "@/components/features/tracking.result";

interface TrackingResultsPageProps {
  searchParams: {
    number?: string;
  };
}

async function getTrackingData(trackingNumber: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  // Mock tracking data
  return {
    trackingNumber,
    status: "In Transit",
    estimatedDelivery: "2025-03-24T12:00:00Z",
    originCountry: "United States",
    destinationCountry: "Canada",
    currentLocation: "Buffalo Sorting Facility, NY",
    events: [
      {
        timestamp: "2025-03-20T08:30:00Z",
        location: "Buffalo Sorting Facility, NY",
        status: "In Transit",
        description: "Package in transit to next facility",
      },
      {
        timestamp: "2025-03-19T17:45:00Z",
        location: "Chicago Distribution Center, IL",
        status: "Departed",
        description: "Package has left the facility",
      },
      {
        timestamp: "2025-03-19T09:15:00Z",
        location: "Chicago Distribution Center, IL",
        status: "Arrived",
        description: "Package has arrived at facility",
      },
      {
        timestamp: "2025-03-18T14:20:00Z",
        location: "San Francisco, CA",
        status: "Picked Up",
        description: "Package picked up by carrier",
      },
      {
        timestamp: "2025-03-18T10:45:00Z",
        location: "San Francisco, CA",
        status: "Information Received",
        description: "Shipment information received",
      },
    ],
    shipmentDetails: {
      sender: "TechCorp Inc.",
      recipient: "Global Gadgets Ltd.",
      service: "Express International",
      weight: "5.2 kg",
      dimensions: "40 x 30 x 20 cm",
      pieces: 1,
    },
  };
}

export default async function TrackingResultsPage({
  searchParams,
}: TrackingResultsPageProps) {
  const trackingNumber = searchParams.number || "";

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
            <a
              href="/tracking"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Tracking
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<>loading....</>}>
        <TrackingResultContent trackingNumber={trackingNumber} />
      </Suspense>
    </div>
  );
}

async function TrackingResultContent({
  trackingNumber,
}: {
  trackingNumber: string;
}) {
  try {
    const trackingData = await getTrackingData(trackingNumber);
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
          <a
            href="/tracking"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </a>
        </div>
      </div>
    );
  }
}
