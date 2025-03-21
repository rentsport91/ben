"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "next-i18next";

// Define the form schema
const calculatorSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .positive("Weight must be positive"),
  length: z
    .number({
      required_error: "Length is required",
      invalid_type_error: "Length must be a number",
    })
    .positive("Length must be positive"),
  width: z
    .number({
      required_error: "Width is required",
      invalid_type_error: "Width must be a number",
    })
    .positive("Width must be positive"),
  height: z
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .positive("Height must be positive"),
  packageType: z.enum(["parcel", "document", "pallet"], {
    required_error: "Please select a package type",
  }),
  service: z.enum(["standard", "express", "priority"], {
    required_error: "Please select a service type",
  }),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

interface RateResult {
  service: string;
  deliveryTime: string;
  price: number;
}

export default function RateCalculator() {
  const { t } = useTranslation("shipping");
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<RateResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      packageType: "parcel",
      service: "standard",
    },
  });

  const packageType = watch("packageType");

  const calculateVolume = (length: number, width: number, height: number) => {
    return length * width * height;
  };

  const calculateShippingRate = async (data: CalculatorFormValues) => {
    setIsCalculating(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // Here we'll simulate an API response with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const volume = calculateVolume(data.length, data.width, data.height);
      const volumetricWeight = volume / 5000; // Industry standard formula
      const billableWeight = Math.max(data.weight, volumetricWeight);

      // Mock shipping rates calculation
      const baseRate = data.packageType === "document" ? 15 : 25;
      const distanceFactor = Math.random() * 2 + 1; // Simulating distance calculation

      const rateResults: RateResult[] = [
        {
          service: "Standard Shipping",
          deliveryTime: "3-5 business days",
          price:
            Math.round((baseRate + billableWeight * 2) * distanceFactor * 100) /
            100,
        },
        {
          service: "Express Shipping",
          deliveryTime: "1-2 business days",
          price:
            Math.round(
              (baseRate + billableWeight * 3.5) * distanceFactor * 100
            ) / 100,
        },
        {
          service: "Priority Shipping",
          deliveryTime: "Next business day",
          price:
            Math.round((baseRate + billableWeight * 5) * distanceFactor * 100) /
            100,
        },
      ];

      setResults(rateResults);
    } catch (err) {
      console.error("Error calculating shipping rate:", err);
      setError("Failed to calculate shipping rates. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {t("calculator.title")}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{t("calculator.description")}</p>
        </div>

        <form
          onSubmit={handleSubmit(calculateShippingRate)}
          className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
        >
          {/* Location fields */}
          <div>
            <label
              htmlFor="origin"
              className="block text-sm font-medium text-gray-700"
            >
              {t("calculator.origin")}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="origin"
                {...register("origin")}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.origin ? "border-red-300" : ""
                }`}
              />
              {errors.origin && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.origin.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              {t("calculator.destination")}
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="destination"
                {...register("destination")}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.destination ? "border-red-300" : ""
                }`}
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.destination.message}
                </p>
              )}
            </div>
          </div>

          {/* Package type selection */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              {t("calculator.package_type")}
            </label>
            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label
                className={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
                  packageType === "document"
                    ? "border-indigo-500 ring-2 ring-indigo-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  {...register("packageType")}
                  value="document"
                  className="sr-only"
                />
                <span className="flex-1 flex flex-col">
                  <span className="block text-sm font-medium text-gray-900">
                    {t("calculator.document")}
                  </span>
                </span>
                <svg
                  className={`h-5 w-5 ${
                    packageType === "document"
                      ? "text-indigo-600"
                      : "text-gray-400"
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

              <label
                className={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
                  packageType === "parcel"
                    ? "border-indigo-500 ring-2 ring-indigo-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  {...register("packageType")}
                  value="parcel"
                  className="sr-only"
                />
                <span className="flex-1 flex flex-col">
                  <span className="block text-sm font-medium text-gray-900">
                    {t("calculator.parcel")}
                  </span>
                </span>
                <svg
                  className={`h-5 w-5 ${
                    packageType === "parcel"
                      ? "text-indigo-600"
                      : "text-gray-400"
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

              <label
                className={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
                  packageType === "pallet"
                    ? "border-indigo-500 ring-2 ring-indigo-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  {...register("packageType")}
                  value="pallet"
                  className="sr-only"
                />
                <span className="flex-1 flex flex-col">
                  <span className="block text-sm font-medium text-gray-900">
                    {t("calculator.pallet")}
                  </span>
                </span>
                <svg
                  className={`h-5 w-5 ${
                    packageType === "pallet"
                      ? "text-indigo-600"
                      : "text-gray-400"
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
            </div>
            {errors.packageType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.packageType.message}
              </p>
            )}
          </div>

          {/* Weight field */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              {t("calculator.weight")} (kg)
            </label>
            <div className="mt-1">
              <input
                type="number"
                step="0.1"
                id="weight"
                {...register("weight", { valueAsNumber: true })}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  errors.weight ? "border-red-300" : ""
                }`}
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.weight.message}
                </p>
              )}
            </div>
          </div>

          {/* Package dimensions */}
          <div className="sm:col-span-2 grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="length"
                className="block text-sm font-medium text-gray-700"
              >
                {t("calculator.length")} (cm)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.1"
                  id="length"
                  {...register("length", { valueAsNumber: true })}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.length ? "border-red-300" : ""
                  }`}
                />
                {errors.length && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.length.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="width"
                className="block text-sm font-medium text-gray-700"
              >
                {t("calculator.width")} (cm)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.1"
                  id="width"
                  {...register("width", { valueAsNumber: true })}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.width ? "border-red-300" : ""
                  }`}
                />
                {errors.width && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.width.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700"
              >
                {t("calculator.height")} (cm)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  step="0.1"
                  id="height"
                  {...register("height", { valueAsNumber: true })}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.height ? "border-red-300" : ""
                  }`}
                />
                {errors.height && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.height.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Service selection */}
          <div className="sm:col-span-2">
            <label
              htmlFor="service"
              className="block text-sm font-medium text-gray-700"
            >
              {t("calculator.service")}
            </label>
            <select
              id="service"
              {...register("service")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="standard">{t("calculator.standard")}</option>
              <option value="express">{t("calculator.express")}</option>
              <option value="priority">{t("calculator.priority")}</option>
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-600">
                {errors.service.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isCalculating ? (
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
                  {t("calculator.calculating")}
                </>
              ) : (
                t("calculator.calculate")
              )}
            </button>
          </div>
        </form>

        {/* Results section */}
        {error && (
          <div className="mt-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {t("calculator.results")}
            </h4>
            <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {results.map((result, index) => (
                  <li key={index}>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
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
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-indigo-600">
                            ${result.price.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {t("calculator.select")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
