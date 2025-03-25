"use client";
import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

interface TrackingEvent {
  id: string;
  timestamp: string;
  location: string | null;
  status: string;
  message: string;
}

interface Package {
  id: string;
  packageType: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  declaredValue: number;
  description: string;
  pieces: number;
  dangerous: boolean;
  insurance: boolean;
}

interface TrackingData {
  trackingNumber: string;
  status?: string; // made optional
  estimatedDelivery: string;
  deliveredAt: string | null;
  isPaid: boolean;
  originAddress: string;
  originCity: string;
  originState: string;
  originPostalCode: string;
  originCountry: string;
  destinationAddress: string;
  destinationCity: string;
  destinationState: string;
  destinationPostalCode: string;
  destinationCountry: string;
  serviceType: string;
  specialInstructions?: string | null;
  TrackingUpdates: TrackingEvent[];
  packages: Package[];
}

interface TrackingResultProps {
  data: TrackingData | null;
}

export default function TrackingResult({ data }: TrackingResultProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "details">(
    "timeline"
  );
  const formatDate = (input: string | Date): string => {
    try {
      // If the input is already a Date, use it directly; otherwise, parse it
      const date = input instanceof Date ? input : parseISO(input);
      return format(date, "MMM d, yyyy h:mm a");
    } catch (e) {
      console.error(e);
      return typeof input === "string" ? input : input.toString();
    }
  };

  if (!data) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Error Retrieving Tracking Information
          </h1>
          <p className="text-gray-500 mb-6">
            We were unable to find tracking information for the number
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
  // If TrackingUpdates is non-empty, assume the first one is the latest update
  const currentStatus =
    data.TrackingUpdates.length > 0
      ? data.TrackingUpdates[data.TrackingUpdates.length - 1].status
      : "";

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg container mx-auto">
      {/* Header */}
      <div className=" px-4 py-5 sm:px-6 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tracking Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Tracking Number:{" "}
              <span className="font-medium">{data.trackingNumber}</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getStatusColor(
                currentStatus
              )}`}
            >
              {currentStatus}
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">From</p>
            <p className="mt-1 text-sm text-gray-900">{data.originCountry}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">To</p>
            <p className="mt-1 text-sm text-gray-900">
              {data.destinationCountry}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Estimated Delivery
            </p>
            <p className="mt-1 text-sm text-gray-900">
              {formatDate(data.estimatedDelivery)}
            </p>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`${
              activeTab === "timeline"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`${
              activeTab === "details"
                ? "border-secondary text-secondary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
          >
            Shipment Details
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="px-4 py-5 sm:p-6">
        {activeTab === "timeline" ? (
          <div className="flow-root">
            <ul className="-mb-8">
              {data.TrackingUpdates.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== data.TrackingUpdates.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(
                            event.status
                          )}`}
                        >
                          <svg
                            className="h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            {event.status}
                          </p>
                          <p className="mt-0.5 text-gray-500">
                            {formatDate(event.timestamp)}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{event.message}</p>
                        </div>
                        {event.location && (
                          <div className="mt-1 text-sm text-gray-500">
                            <p>{event.location}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Origin Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.originAddress}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Destination Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.destinationAddress}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Service Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.serviceType}
                </dd>
              </div>
              {/* Additional shipment details can be added here */}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-200 text-green-800";
    case "in transit":
      return "bg-blue-200 text-blue-800";
    case "arrived":
      return "bg-purple-200 text-purple-800";
    case "departed":
      return "bg-indigo-200 text-indigo-800";
    case "picked up":
      return "bg-yellow-200 text-yellow-800";
    case "information received":
      return "bg-gray-200 text-gray-800";
    case "failed":
      return "bg-red-200 text-gray-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}
