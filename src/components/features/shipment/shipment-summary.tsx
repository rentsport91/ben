interface ShipmentSummaryProps {
  data: any;
  onSubmit: () => void;
  onPrevious: () => void;
  loading: boolean;
}

export default function ShipmentSummary({
  data,
  onSubmit,
  onPrevious,
  loading,
}: ShipmentSummaryProps) {
  return (
    <div className="p-6">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Review Your Shipment
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please review all shipment details before submitting.
          </p>
        </div>

        <div className="pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">
            Origin Information
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Sender</p>
              <p className="mt-1">{data.senderName}</p>
              {data.senderCompany && <p>{data.senderCompany}</p>}
              <p className="mt-2">{data.senderEmail}</p>
              <p>{data.senderPhone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="mt-1">{data.originAddress}</p>
              <p>
                {data.originCity}, {data.originState} {data.originPostalCode}
              </p>
              <p>{data.originCountry}</p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">
            Destination Information
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Recipient</p>
              <p className="mt-1">{data.recipientName}</p>
              {data.recipientCompany && <p>{data.recipientCompany}</p>}
              <p className="mt-2">{data.recipientEmail}</p>
              <p>{data.recipientPhone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="mt-1">{data.destinationAddress}</p>
              <p>
                {data.destinationCity}, {data.destinationState}{" "}
                {data.destinationPostalCode}
              </p>
              <p>{data.destinationCountry}</p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">
            Package Details
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Service & Package Type
              </p>
              <p className="mt-1">{data.serviceType}</p>
              <p>{data.packageType}</p>
              <p className="mt-2 text-sm font-medium text-gray-500">
                Dimensions & Weight
              </p>
              <p className="mt-1">
                {data.length} × {data.width} × {data.height} cm
              </p>
              <p>{data.weight} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Additional Details
              </p>
              <p className="mt-1">Pieces: {data.pieces}</p>
              <p>Declared Value: ${data.declaredValue} USD</p>
              <div className="mt-2">
                {data.insurance && (
                  <p className="text-indigo-600">✓ Shipping Insurance</p>
                )}
                {data.signature && (
                  <p className="text-indigo-600">✓ Signature Required</p>
                )}
                {data.dangerous && (
                  <p className="text-red-600">✓ Contains Dangerous Goods</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-2">
            Package Contents
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p>{data.description || "No description provided"}</p>
          </div>
        </div>

        <div className="pt-6">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  By submitting this shipment, you confirm all information is
                  accurate and you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Create Shipment"
          )}
        </button>
      </div>
    </div>
  );
}
