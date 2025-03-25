type ResultCalculatorProps = {
  service: string;
  deliveryTime: string;
  price: number;
};

export const ResultsCalculator = ({
  results,
}: {
  results: ResultCalculatorProps[] | null;
}) => {
  if (!results) return null;

  return (
    <div className="mt-8">
      <h4 className="text-lg font-medium text-gray-900 mb-4">
        Shipping Options
      </h4>
      <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {results.map((result, index) => (
            <li key={index}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {result.service}
                      </p>
                      <p className="text-sm text-gray-500">
                        {result.deliveryTime}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center">
                    <span className="text-lg font-bold text-indigo-600">
                      ${result.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Select
                    </button>
                  </div> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
