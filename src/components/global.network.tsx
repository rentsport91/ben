import { Globe, MapPin } from "lucide-react";
import Image from "next/image";

export const GlobalNetwork = () => {
  return (
    <div>
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="animate-on-scroll"
              data-animation="fade-slide-right"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/25 text-secondary text-sm font-medium mb-4">
                Global Network
              </span>
              <h2 className="text-top-header font-bold text-4xl md:text-4xl mb-5">
                Connecting Businesses Worldwide
              </h2>
              <p className="text-gray-600 mb-6">
                Our extensive global network ensures your shipments reach
                virtually any destination with efficiency and reliability. With
                strategic hubs across continents, we optimize routes for speed
                and cost-effectiveness.
              </p>

              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary/25 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      220+ Countries & Territories
                    </h3>
                    <p className="text-gray-600">
                      Comprehensive global coverage for all your shipping needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary/25 flex items-center justify-center mr-4 flex-shrink-0">
                    <Globe size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Strategic Global Hubs
                    </h3>
                    <p className="text-gray-600">
                      Optimized routing through key logistics centers worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative animate-on-scroll"
              data-animation="fade-slide-left"
              data-delay="200"
            >
              {/* Animated World Map */}
              <div className="relative">
                <div className="absolute -top-10 -left-10 -right-10 -bottom-10 bg-dots-pattern opacity-10 animate-pulse-slow"></div>
                <Image
                  src={"/images/map.png"}
                  alt="Global shipping network"
                  width={200}
                  height={200}
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
          </div>
        </div>
      </section>
    </div>
  );
};
