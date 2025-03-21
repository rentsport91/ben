interface ShipmentDetailsFormProps {
  data: any;
  onChange: (name: string, value: string | number | boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ShipmentDetailsForm({
  data,
  onChange,
  onNext,
  onPrevious,
}: ShipmentDetailsFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      onChange(name, checked);
    } else if (type === "number") {
      onChange(name, value === "" ? "" : Number(value));
    } else {
      onChange(name, value);
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Package Details
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Provide information about the package you&apos;re shipping.
          </p>
        </div>

        <div className="pt-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="serviceType"
                className="block text-sm font-medium text-gray-700"
              >
                Service Type *
              </label>
              <div className="mt-1">
                <select
                  id="serviceType"
                  name="serviceType"
                  value={data.serviceType}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="Express International">
                    Express International (1-3 business days)
                  </option>
                  <option value="Priority International">
                    Priority International (3-5 business days)
                  </option>
                  <option value="Economy International">
                    Economy International (5-10 business days)
                  </option>
                  <option value="Standard International">
                    Standard International (7-14 business days)
                  </option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="packageType"
                className="block text-sm font-medium text-gray-700"
              >
                Package Type *
              </label>
              <div className="mt-1">
                <select
                  id="packageType"
                  name="packageType"
                  value={data.packageType}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                >
                  <option value="Box">Box</option>
                  <option value="Envelope">Envelope</option>
                  <option value="Pallet">Pallet</option>
                  <option value="Tube">Tube</option>
                  <option value="Custom">Custom Packaging</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Weight (kg) *
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  name="weight"
                  id="weight"
                  value={data.weight}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="dimensions"
                className="block text-sm font-medium text-gray-700"
              >
                Dimensions (cm) *
              </label>
              <div className="mt-1 grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="length" className="sr-only">
                    Length
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      name="length"
                      id="length"
                      value={data.length}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Length"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="width" className="sr-only">
                    Width
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      name="width"
                      id="width"
                      value={data.width}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Width"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="height" className="sr-only">
                    Height
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      name="height"
                      id="height"
                      value={data.height}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Height"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="declaredValue"
                className="block text-sm font-medium text-gray-700"
              >
                Declared Value (USD) *
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  name="declaredValue"
                  id="declaredValue"
                  value={data.declaredValue}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="pieces"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Pieces *
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="1"
                  min="1"
                  name="pieces"
                  id="pieces"
                  value={data.pieces}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Package Contents Description *
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={data.description}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Detailed description of items being shipped"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Please provide a detailed description of the package contents
                for customs purposes.
              </p>
            </div>

            <div className="sm:col-span-6">
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="dangerous"
                      name="dangerous"
                      type="checkbox"
                      checked={data.dangerous}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="dangerous"
                      className="font-medium text-gray-700"
                    >
                      Dangerous Goods
                    </label>
                    <p className="text-gray-500">
                      This shipment contains dangerous goods as defined by
                      international shipping regulations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="insurance"
                      name="insurance"
                      type="checkbox"
                      checked={data.insurance}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="insurance"
                      className="font-medium text-gray-700"
                    >
                      Add Shipping Insurance
                    </label>
                    <p className="text-gray-500">
                      Protect your shipment up to the declared value (additional
                      fees apply).
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="signature"
                      name="signature"
                      type="checkbox"
                      checked={data.signature}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="signature"
                      className="font-medium text-gray-700"
                    >
                      Require Signature
                    </label>
                    <p className="text-gray-500">
                      A signature will be required upon delivery (additional
                      fees apply).
                    </p>
                  </div>
                </div>
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
