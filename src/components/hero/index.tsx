import { Info } from "lucide-react";
import Image from "next/image";
import TrackingForm from "../tracking.form";

export const Hero = () => {
  return (
    <div className="bg-[url('/images/banner_bg.jpg')] bg-cover relative">
      <Image
        src={"/images/globe.webp"}
        className="absolute animate-spin duration-30000 origin-center top-12 -left-44"
        width={350}
        height={350}
        alt="globe"
      />
      <div className="relative flex gap-5 container mx-auto w-full z-10">
        {/* left side */}
        <div className="w-1/2 pt-32 pb-28 px-7">
          <div className="flex flex-col gap-5">
            <p className="uppercase text-primary-text font-semibold">
              Fastest & Secure Shipping
            </p>
            <h1 className="capitalize text-top-header text-5xl leading-14 font-bold">
              We Deliver Your <br /> Product Anywhere!
            </h1>
            <p className="text-sm">
              When An Unknown Printer Took A Galley Of Type And Company Need
              Scra Make It Better Future To Make Attempt Type Specimen.
            </p>
            <div>
              <TrackingForm />
              {/* <div className="flex gap-3">
                <input
                  className="flex-1 h-12 px-5 border-[1px] bg-white border-gray-600 focus:border-secondary outline-0 rounded-md"
                  placeholder="Tracking Number"
                />
                <button className="h-12 px-5 bg-primary-text hover:bg-primary-text/80 w-42 text-white rounded-md shadow-2xl cursor-pointer">
                  Track Now
                </button>
              </div> */}
              <div className="flex items-center gap-2 mt-2">
                <Info size={15} className="text-secondary" />
                <p className="text-xs text-muted-foreground">
                  Enter your tracking number (usually 12-16 digits) found in
                  your order confirmation email or shipping label.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* right side  */}
        <div className="relative w-1/2 h-auto self-end">
          <Image
            src={"/images/delivery-man.webp"}
            width={500}
            height={500}
            alt="delivery-man"
          />
        </div>
      </div>
    </div>
  );
};
