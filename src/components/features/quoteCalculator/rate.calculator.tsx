"use client";

import { ErrorCalculator } from "./error.calculator";
import { useShippingCalculator } from "./hook/useShippingCalculator";
import RateCalculator from "./rate.form";
import { ResultsCalculator } from "./results.calculator";

export const QuotaRateCalculator = () => {
  const { isCalculating, results, error, calculateShippingRate } =
    useShippingCalculator();
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-20 sm:p-6 container mx-auto px-4">
        <h3 className="text-3xl  mt-12 leading-6 font-medium text-gray-900">
          Shipping Rate Calculator
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Calculate shipping rates for your package based on size, weight, and
            destination.
          </p>
        </div>
        <RateCalculator
          isloading={isCalculating}
          calculateShippingRate={calculateShippingRate}
        />
      </div>
      <ErrorCalculator error={error} />
      <ResultsCalculator results={results} />
    </div>
  );
};
