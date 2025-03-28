"use client";
import TrackingForm from "@/components/tracking.form";

export default function TrackingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Track Your Shipment
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Stay informed about the status and location of your packages in
              real-time.
            </p>
          </div>

          {/* Tracking form */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Track Shipment
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                Enter your tracking number to get the latest updates on your
                shipment.
              </div>

              <TrackingForm />
            </div>
          </div>

          {/* FAQ section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6 divide-y divide-gray-200">
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  How long does it take for tracking information to appear?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Tracking information typically appears in our system within
                  1-2 hours after your shipment has been picked up or processed
                  at one of our facilities.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  What if my tracking information hasn&apos;t updated in several
                  days?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  If your tracking information hasn&apos;t updated in 48 hours
                  or more, please contact our customer service team for
                  assistance.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Can I track international shipments?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, our tracking system supports both domestic and
                  international shipments across our global network.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
