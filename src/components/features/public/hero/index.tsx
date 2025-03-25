import { Info } from "lucide-react";
import Image from "next/image";
import TrackingForm from "../../../tracking.form";

export const Hero = () => {
  return (
    <div className="bg-[url('/images/banner_bg.jpg')] bg-cover relative">
      <Image
        src={"/images/globe.webp"}
        className="absolute animate-spin duration-30000 origin-center top-12 -left-44 hidden lg:block"
        width={350}
        height={350}
        alt="globe"
      />
      <div className="relative flex flex-col md:flex-row gap-5 container mx-auto w-full z-10 px-4">
        {/* left side */}
        <div className="w-full md:w-1/2 pt-16 md:pt-24 lg:pt-32 pb-10 md:pb-16 lg:pb-28">
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            <p className="uppercase text-primary-text font-semibold text-sm md:text-base">
              Fastest & Secure Shipping
            </p>
            <h1 className="capitalize text-top-header text-3xl md:text-4xl lg:text-5xl leading-tight lg:leading-14 font-bold">
              We Deliver Your <br className="hidden md:block" /> Product
              Anywhere!
            </h1>
            <p className="text-xs md:text-sm">
              Fast, secure, and reliable shipping solutions for businesses and
              individuals. Track your packages in real-time and enjoy peace of
              mind.
            </p>
            <div>
              <TrackingForm />

              <div className="flex items-center gap-2 mt-2">
                <Info size={15} className="text-secondary" />
                <p className="text-xs text-muted-foreground">
                  Enter your tracking number (usually 8-12 digits) found in your
                  order confirmation email or shipping label.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* right side  */}
        <div className="relative w-full md:w-1/2   md:self-end mx-auto md:mx-0 hidden md:flex justify-center">
          <Image
            src={"/logos/euroswift-2.jpg"}
            width={500}
            height={500}
            alt="delivery-man"
            className=""
          />
        </div>
      </div>
    </div>
  );
};
