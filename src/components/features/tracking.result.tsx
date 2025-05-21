/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  Truck,
  Check,
  AlertTriangle,
  Package,
  Home,
  MapPin,
  Calendar,
  Box,
  User,
} from "lucide-react";

interface TrackingEvent {
  id: string;
  timestamp: Date;
  location: string | null;
  status: string | null;
  message: string;
}

interface Sender {
  name: string;
  email: string;
}

interface Package {
  height: number;
  width: number;
  length: number;
  weight: number;
  packageType: string;
  declaredValue: number | null;
}

interface Recipient {
  name: string;
  email?: string;
  phone?: string;
}

interface TrackingData {
  trackingNumber: string;
  estimatedDelivery: Date;
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
  carrier: "DHL" | "FedEx" | "UPS";
  TrackingUpdates: TrackingEvent[];
  createdAt: Date;
  sender: Sender | null;
  recipient: Recipient;
  packages: Package[];
}

type TrackingResultProps = {
  data: TrackingData;
};

export default function TrackingResult({ data }: TrackingResultProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "details">(
    "timeline"
  );

  const formatDate = (input: string | Date): string => {
    try {
      const date = input instanceof Date ? input : parseISO(input);
      return format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
    } catch (error) {
      return typeof input === "string" ? input : input.toString();
    }
  };

  const formatShortDate = (input: string | Date): string => {
    try {
      const date = input instanceof Date ? input : parseISO(input);
      return format(date, "MMM d, h:mm a");
    } catch (error) {
      return typeof input === "string" ? input : input.toString();
    }
  };

  if (!data) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Retrieving Tracking Information
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find tracking details for the provided number.
          </p>
          <Link
            href="/track"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const currentStatus =
    data.TrackingUpdates.length > 0
      ? data.TrackingUpdates[data.TrackingUpdates.length - 1].status
      : "";

  // Calculate progress percentage based on status
  const getProgressPercentage = () => {
    const statusOrder = [
      "information_received",
      "processing",
      "picked_up",
      "departed",
      "in_transit",
      "arrived",
      "out_for_delivery",
      "delivered",
    ];

    const currentIndex = statusOrder.indexOf(
      currentStatus?.toLowerCase() || ""
    );
    return currentIndex >= 0
      ? ((currentIndex + 1) / statusOrder.length) * 100
      : 10;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto mb-8">
      {/* Carrier-specific header */}
      <div
        className={`py-3 px-6 ${
          data.carrier === "DHL"
            ? "bg-yellow-500"
            : data.carrier === "FedEx"
            ? "bg-purple-800"
            : "bg-brown-600"
        } flex justify-between items-center`}
      >
        <div className="flex items-center">
          <Truck className="h-6 w-6 text-white mr-2" />
          <span className="text-white font-bold text-lg">
            {data.carrier} Tracking
          </span>
        </div>
        <span className="text-white font-medium">{data.trackingNumber}</span>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-100 h-2 w-full">
        <div
          className={`h-full ${
            currentStatus?.toLowerCase() === "delivered"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      {/* Status banner */}
      {currentStatus && (
        <div
          className={`px-6 py-4 ${
            currentStatus.toLowerCase() === "delivered"
              ? "bg-green-50 border-b border-green-100"
              : currentStatus.toLowerCase() === "on_hold"
              ? "bg-orange-50 border-b border-orange-100"
              : "bg-blue-50 border-b border-blue-100"
          }`}
        >
          <div className="flex items-center">
            {currentStatus.toLowerCase() === "delivered" ? (
              <Check className="h-5 w-5 text-green-500 mr-2" />
            ) : currentStatus.toLowerCase() === "on_hold" ? (
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
            ) : (
              <Truck className="h-5 w-5 text-blue-500 mr-2" />
            )}
            <div>
              <h3 className="font-medium">
                {currentStatus
                  ?.replace(/_/g, " ")
                  .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              </h3>
              {currentStatus.toLowerCase() === "delivered" && (
                <p className="text-sm text-gray-600">
                  Delivered on{" "}
                  {formatDate(
                    data.TrackingUpdates[data.TrackingUpdates.length - 1]
                      .timestamp
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
            <h4 className="font-medium text-gray-700">From</h4>
          </div>
          <p className="text-gray-900 font-medium">
            {data.originCity}, {data.originCountry}
          </p>
          <p className="text-sm text-gray-600">{data.originAddress}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
            <h4 className="font-medium text-gray-700">To</h4>
          </div>
          <p className="text-gray-900 font-medium">
            {data.destinationCity}, {data.destinationCountry}
          </p>
          <p className="text-sm text-gray-600">{data.destinationAddress}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <h4 className="font-medium text-gray-700">Estimated Delivery</h4>
          </div>
          <p className="text-gray-900 font-medium">
            {formatDate(data.estimatedDelivery)}
          </p>
          <p className="text-sm text-gray-600">{data.serviceType}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "timeline"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Shipment Progress
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === "details"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Shipment Details
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "timeline" ? (
          <div className="space-y-8">
            {data.TrackingUpdates.map((event, idx) => (
              <div key={event.id} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`rounded-full p-2 ${getStatusColor(event.status)
                      .replace("text", "text-white")
                      .replace("100", "500")}`}
                  >
                    {getStatusIcon(event.status)}
                  </div>
                  {idx !== data.TrackingUpdates.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {event.status
                          ?.replace(/_/g, " ")
                          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatShortDate(event.timestamp)}
                      </p>
                    </div>
                    {event.location && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {event.location}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-700">{event.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-500" />
                Sender & Receiver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Sender
                  </h4>
                  <p className="font-medium">{data.sender?.name}</p>
                  <p className="text-sm text-gray-600">{data.sender?.email}</p>
                  <div className="mt-3 text-sm text-gray-700">
                    <p>{data.originAddress}</p>
                    <p>
                      {data.originCity}, {data.originState}{" "}
                      {data.originPostalCode}
                    </p>
                    <p>{data.originCountry}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Receiver
                  </h4>
                  <p className="font-medium">{data.recipient.name}</p>
                  {data.recipient.email && (
                    <p className="text-sm text-gray-600">
                      {data.recipient.email}
                    </p>
                  )}
                  {data.recipient.phone && (
                    <p className="text-sm text-gray-600">
                      {data.recipient.phone}
                    </p>
                  )}
                  <div className="mt-3 text-sm text-gray-700">
                    <p>{data.destinationAddress}</p>
                    <p>
                      {data.destinationCity}, {data.destinationState}{" "}
                      {data.destinationPostalCode}
                    </p>
                    <p>{data.destinationCountry}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <Box className="h-5 w-5 mr-2 text-gray-500" />
                Package Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Package Type
                  </h4>
                  <p className="font-medium">{data.packages[0].packageType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Dimensions
                  </h4>
                  <p className="font-medium">
                    {data.packages[0].length} × {data.packages[0].width} ×{" "}
                    {data.packages[0].height} cm
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Weight
                  </h4>
                  <p className="font-medium">{data.packages[0].weight} kg</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Declared Value
                  </h4>
                  <p className="font-medium">
                    {data.packages[0].declaredValue
                      ? `$${data.packages[0].declaredValue}`
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-gray-500" />
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Service Type
                  </h4>
                  <p className="font-medium">{data.serviceType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Carrier
                  </h4>
                  <p className="font-medium">{data.carrier}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Tracking Number
                  </h4>
                  <p className="font-medium">{data.trackingNumber}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Shipment Date
                  </h4>
                  <p className="font-medium">{formatDate(data.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusIcon(status: string | null) {
  switch (status?.toLowerCase()) {
    case "delivered":
      return <Check className="h-4 w-4" />;
    case "in_transit":
      return <Truck className="h-4 w-4" />;
    case "arrived":
      return <Package className="h-4 w-4" />;
    case "departed":
      return <Truck className="h-4 w-4" />;
    case "picked_up":
      return <Package className="h-4 w-4" />;
    case "on_hold":
      return <AlertTriangle className="h-4 w-4" />;
    case "information_received":
      return <Home className="h-4 w-4" />;
    case "failed":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

function getStatusColor(status: string | null): string {
  switch (status?.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "arrived":
      return "bg-purple-100 text-purple-800";
    case "departed":
      return "bg-indigo-100 text-indigo-800";
    case "picked_up":
      return "bg-amber-100 text-amber-800";
    case "on_hold":
      return "bg-orange-100 text-orange-800";
    case "information_received":
      return "bg-gray-100 text-gray-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
