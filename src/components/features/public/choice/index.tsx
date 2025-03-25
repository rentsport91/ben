import Image from "next/image";
import { Progress } from "../../../ui/progress";

export const Choice = () => {
  return (
    <div className="bg-[url('/images/banner_bg.jpg')] bg-cover py-12 md:py-16 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="w-full lg:w-1/2 space-y-3 md:space-y-4 lg:space-y-5">
            <p className="uppercase font-medium text-primary-text text-sm md:text-base">
              What we achieved
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-top-header drop-shadow-md">
              We Are Logistics Improving Our Skills To Fulfill Delivery Of Any
              Level!
            </p>
            <p className="w-full md:w-5/6 lg:w-3/4 text-sm md:text-base">
              We Are Logistics Improving Our Skills To Fulfill Delivery Of Any
              Level! EuroSwift delivers shipments efficiently and securely.
            </p>
            <div className="grid gap-2 pt-2 md:pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base">
                  Successful Delivery
                </span>
                <span className="text-sm md:text-base font-medium">82%</span>
              </div>
              <Progress value={82} className="bg-gray-200" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base">Happy Customers</span>
                <span className="text-sm md:text-base font-medium">90%</span>
              </div>
              <Progress value={90} className="bg-gray-200" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 flex justify-center lg:block">
            <Image
              src={"/logos/euroswift-1.jpg"}
              alt="container"
              width={400}
              height={400}
              className="relative lg:absolute lg:-top-28 lg:right-0 max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
