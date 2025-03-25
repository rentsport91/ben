import TrackingResult from "@/components/features/tracking.result";
import Link from "next/link";
import { prisma } from "@/constants/config/db";
// import { z } from "zod";

async function getTrackingData(trackingNumber: string) {
  const result = await prisma.shipment.findUnique({
    where: { trackingNumber },
    select: {
      trackingNumber: true, // guaranteed to be non-null
      estimatedDelivery: true,
      originAddress: true,
      originCity: true,
      originState: true,
      originPostalCode: true,
      originCountry: true,
      destinationAddress: true,
      destinationCity: true,
      destinationState: true,
      destinationPostalCode: true,
      destinationCountry: true,
      serviceType: true,
      TrackingUpdates: {
        select: {
          id: true,
          location: true,
          message: true,
          status: true,
          timestamp: true,
        },
      },
      createdAt: true,
    },
  });

  if (!result) return null;

  // const trackingEventSchema = z.object({
  //   id: z.string(),
  //   timestamp: z.date(),
  //   location: z.string().nullable(),
  //   status: z.string(),
  //   message: z.string(),
  // });

  // const trackingDataSchema = z.object({
  //   trackingNumber: z.string(),
  //   estimatedDelivery: z.date(),
  //   originAddress: z.string(),
  //   originCity: z.string(),
  //   originState: z.string(),
  //   originPostalCode: z.string(),
  //   originCountry: z.string(),
  //   destinationAddress: z.string(),
  //   destinationCity: z.string(),
  //   destinationState: z.string(),
  //   destinationPostalCode: z.string(),
  //   destinationCountry: z.string(),
  //   serviceType: z.string(),
  //   TrackingUpdates: z.array(trackingEventSchema),
  //   createdAt: z.date(),
  // });

  // const data = trackingDataSchema.safeParse(result);

  // if (!data.success) {
  //   console.error(
  //     "Data does not match TrackingData type:",
  //     data.error.flatten()
  //   );
  //   // Handle the error or throw an exception
  // } else {
  //   const validData = data.data;
  //   // validData now has type TrackingData
  // }

  return result;
}

export default async function TrackingResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [id: string]: string | undefined }>;
}) {
  const { id: trackingNumber } = await searchParams;
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
  console.log(trackingData);

  if (!trackingData?.trackingNumber) {
    return <div>Invalid tracking number</div>;
  }

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
