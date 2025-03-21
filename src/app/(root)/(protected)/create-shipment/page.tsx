"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ShipmentOriginForm from "@/components/features/shipment/shipment-origin-form";
import ShipmentDestinationForm from "@/components/features/shipment/shipment-destination-form";
import ShipmentDetailsForm from "@/components/features/shipment/shipment-details-form";
import ShipmentSummary from "@/components/features/shipment/shipment-summary";
// import ShipmentProgress from "@/components/shipment/ShipmentProgress";

export default function CreateShipmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState({
    // Origin information
    senderName: "",
    senderCompany: "",
    senderEmail: "",
    senderPhone: "",
    originAddress: "",
    originCity: "",
    originState: "",
    originPostalCode: "",
    originCountry: "United States",

    // Destination information
    recipientName: "",
    recipientCompany: "",
    recipientEmail: "",
    recipientPhone: "",
    destinationAddress: "",
    destinationCity: "",
    destinationState: "",
    destinationPostalCode: "",
    destinationCountry: "Canada",

    // Shipment details
    serviceType: "Express International",
    packageType: "Box",
    weight: "",
    length: "",
    width: "",
    height: "",
    declaredValue: "",
    description: "",
    pieces: 1,
    dangerous: false,
    insurance: false,
    signature: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setShipmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // For simplicity, we're not validating here, but you should add validation
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Simulate API call to create shipment
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response with tracking number
      const response = {
        success: true,
        trackingNumber:
          "SHP" +
          Math.floor(Math.random() * 10000000)
            .toString()
            .padStart(7, "0"),
        estimatedDelivery: new Date(
          Date.now() + 4 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };

      // Redirect to success page with tracking number
      router.push(
        `/shipments/confirmation?tracking=${response.trackingNumber}`
      );
    } catch (error) {
      console.error("Error creating shipment:", error);
      // Handle error state
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShipmentOriginForm
            data={shipmentData}
            onChange={handleChange}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ShipmentDestinationForm
            data={shipmentData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ShipmentDetailsForm
            data={shipmentData}
            onChange={handleChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <ShipmentSummary
            data={shipmentData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Shipment
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Fill out the information below to create a new international shipment.
        </p>
      </div>

      {/* <ShipmentProgress currentStep={currentStep} /> */}

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
