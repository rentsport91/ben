import { Check } from "lucide-react";
import Image from "next/image";

export const Service = () => {
  return (
    <div className="bg-gray-200">
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="relative animate-on-scroll"
              data-animation="fade-slide-left"
              data-delay="200"
            >
              {/* Animated World Map */}
              <div className="relative aspect-square">
                <div className="absolute -top-10 -left-10 -right-10 -bottom-10 bg-dots-pattern opacity-10 animate-pulse-slow"></div>
                <Image
                  src="/images/box.png"
                  alt="Global shipping network"
                  fill
                  className="w-full h-auto max-w-lg mx-auto lg:ml-auto animate-float"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md">
                  <div
                    className="pulse-point"
                    style={{ top: "30%", left: "20%" }}
                  ></div>
                  <div
                    className="pulse-point"
                    style={{ top: "40%", left: "48%" }}
                  ></div>
                  <div
                    className="pulse-point"
                    style={{ top: "35%", left: "70%" }}
                  ></div>
                  <div
                    className="pulse-point"
                    style={{ top: "65%", left: "35%" }}
                  ></div>
                  <div
                    className="pulse-point"
                    style={{ top: "60%", left: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              className="animate-on-scroll"
              data-animation="fade-slide-right"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/25 text-secondary text-sm font-medium mb-4">
                Container Shipping
              </span>
              <h2 className="text-top-header font-bold text-3xl sm:text-4xl mb-5">
                Efficient Container Transport Solutions
              </h2>
              <p className="text-gray-600 mb-6">
                From standard containers to specialized equipment, we provide
                comprehensive container shipping services for all your cargo
                needs, with expert handling and reliable delivery.
              </p>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-white" />
                  </div>
                  <p className="text-gray-600">
                    Standard, refrigerated, and specialized containers
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-white" />
                  </div>
                  <p className="text-gray-600">
                    Full container (FCL) and less than container (LCL) shipments
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-white" />
                  </div>
                  <p className="text-gray-600">
                    Real-time container tracking and monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
