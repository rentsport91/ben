"use client";
import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

interface ShipmentDetails {
  sender: string;
  recipient: string;
  service: string;
  weight: string;
  dimensions: string;
  pieces: number;
}

interface TrackingData {
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  originCountry: string;
  destinationCountry: string;
  currentLocation: string;
  events: TrackingEvent[];
  shipmentDetails: ShipmentDetails;
}

interface TrackingResultProps {
  data: TrackingData;
}

export default function TrackingResult({ data }: TrackingResultProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "details">(
    "timeline"
  );

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "MMM d, yyyy h:mm a");
    } catch (e) {
      console.log(e);

      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in transit":
        return "bg-blue-100 text-blue-800";
      case "arrived":
        return "bg-purple-100 text-purple-800";
      case "departed":
        return "bg-indigo-100 text-indigo-800";
      case "picked up":
        return "bg-yellow-100 text-yellow-800";
      case "information received":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {/* Tracking header */}
      <div className="px-4 py-5 sm:px-6 bg-gray-50">
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
                data.status
              )}`}
            >
              {data.status}
            </span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">From</p>
            <p className="mt-1 text-sm text-gray-900">{data.originCountry}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">To </p>
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
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`${
              activeTab === "details"
                ? "border-indigo-500 text-indigo-600"
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
              {data.events.map((event, eventIdx) => (
                <li key={eventIdx}>
                  <div className="relative pb-8">
                    {eventIdx !== data.events.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
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
                          <p>{event.description}</p>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>{event.location}</p>
                        </div>
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
                <dt className="text-sm font-medium text-gray-500">Sender </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.shipmentDetails.sender}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Recipient</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.shipmentDetails.recipient}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Service Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.shipmentDetails.service}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Weight </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.shipmentDetails.weight}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Dimensions
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.shipmentDetails.dimensions}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Number of Pieces
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.shipmentDetails.pieces}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Current Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.currentLocation}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <Link
            href={`/tracking/print?number=${data.trackingNumber}`}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="mr-2 -ml-1 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                clipRule="evenodd"
              />
            </svg>
            Print
          </Link>
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="mr-2 -ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            Get Updates
          </button>
        </div>
      </div>
    </div>
  );
}
