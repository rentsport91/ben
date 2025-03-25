import Image from "next/image";

export const Archievement = () => {
  return (
    <div className="bg-primary-text py-8 md:py-10 lg:py-14 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-5">
          {/* left side  */}
          <div className="p-4 md:p-6 lg:p-10 w-full lg:w-auto">
            <div className="relative mx-auto lg:mx-0 w-full max-w-[320px] md:max-w-[380px] lg:size-[450px] aspect-square bg-gray-200 rounded-3xl lg:rounded-4xl overflow-hidden">
              <Image src={"/images/port.jpg"} alt="Port image" fill />
            </div>
          </div>
          {/* right side  */}
          <div className="space-y-3 md:space-y-4 mt-4 lg:mt-0 w-full">
            <p className="uppercase font-medium text-sm md:text-base">
              Why choose us
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              We Are Logistics Improving Our Skills To Fulfill Delivery Of Any
              Level!
            </p>
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8 lg:gap-10 h-full">
              <div className="grid gap-4 lg:gap-5 w-full">
                <span className="text-xs md:text-sm text-gray-300">
                  We Are Logistics Improving Our Skills To Fulfill Delivery Of
                  Any Level! We combine industry expertise with cutting-edge
                  technology to ensure your shipments are secure, timely, and
                  efficient.
                </span>
                <button className="font-semibold w-fit px-4 md:px-5 py-2 md:py-3 bg-white text-primary-text rounded-sm cursor-pointer shadow-2xl">
                  To Know More About Us
                </button>
              </div>
              <div className="hidden md:block h-32 lg:h-48 w-2 bg-secondary/40" />
              <div className="w-full grid gap-6 md:gap-8 mt-6 md:mt-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <Image
                    src={"/images/order.png"}
                    width={60}
                    height={60}
                    alt="Order icon"
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-2xl md:text-3xl font-bold">9.5M</span>
                    <p className="text-xs md:text-sm">Delivered Goods</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <Image
                    src={"/images/earth.png"}
                    width={60}
                    height={60}
                    alt="Earth icon"
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-2xl md:text-3xl font-bold">
                      10.4M
                    </span>
                    <p className="text-xs md:text-sm">Clients Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
