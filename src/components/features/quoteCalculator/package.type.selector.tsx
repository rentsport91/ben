export const PackageTypeSelector = ({ register, value, error }) => {
  const options = [
    { id: "document", label: "Document" },
    { id: "parcel", label: "Parcel" },
    { id: "pallet", label: "Pallet" },
  ];

  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-700">
        Package Type
      </label>
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
              value === option.id
                ? "border-indigo-500 ring-2 ring-indigo-500"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              {...register}
              value={option.id}
              className="sr-only"
            />
            <span className="flex-1 flex flex-col">
              <span className="block text-sm font-medium text-gray-900">
                {option.label}
              </span>
            </span>
            <svg
              className={`h-5 w-5 ${
                value === option.id ? "text-indigo-600" : "text-gray-400"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
