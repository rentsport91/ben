interface ShipmentDestinationFormProps {
  data: any;
  onChange: (name: string, value: string | number | boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ShipmentDestinationForm({
  data,
  onChange,
  onNext,
  onPrevious,
}: ShipmentDestinationFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="p-6">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recipient Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Provide information about the recipient and destination of this
            shipment.
          </p>
        </div>

        <div className="pt-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="recipientName"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="recipientName"
                  id="recipientName"
                  value={data.recipientName}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="recipientCompany"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="recipientCompany"
                  id="recipientCompany"
                  value={data.recipientCompany}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="recipientEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="recipientEmail"
                  id="recipientEmail"
                  value={data.recipientEmail}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="recipientPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number *
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="recipientPhone"
                  id="recipientPhone"
                  value={data.recipientPhone}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="destinationAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="destinationAddress"
                  id="destinationAddress"
                  value={data.destinationAddress}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="destinationCity"
                className="block text-sm font-medium text-gray-700"
              >
                City *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="destinationCity"
                  id="destinationCity"
                  value={data.destinationCity}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="destinationState"
                className="block text-sm font-medium text-gray-700"
              >
                State / Province *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="destinationState"
                  id="destinationState"
                  value={data.destinationState}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="destinationPostalCode"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP / Postal Code *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="destinationPostalCode"
                  id="destinationPostalCode"
                  value={data.destinationPostalCode}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="destinationCountry"
                className="block text-sm font-medium text-gray-700"
              >
                Country *
              </label>
              <div className="mt-1">
                <select
                  id="destinationCountry"
                  name="destinationCountry"
                  value={data.destinationCountry}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                  <option value="Australia">Australia</option>
                </select>
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
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
