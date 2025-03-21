import Image from "next/image";

export const Archievement = () => {
  return (
    <div className="bg-primary-text py-14 text-white">
      <div className="container mx-auto px-8">
        <div className="flex items-center gap-5">
          {/* left side  */}
          <div className="p-10">
            <div className="relative size-[450px] bg-gray-200 rounded-4xl overflow-hidden">
              <Image src={"/images/port.jpg"} alt="" fill />
            </div>
          </div>
          {/* right side  */}
          <div className="space-y-4">
            <p className="uppercase font-medium text-base">Why choose us</p>
            <p className="text-4xl font-semibold">
              We Are Logistics Improving Our Skills To Fulfill Delivery Of Any
              Level!
            </p>
            <div className="flex items-start justify-between gap-10 h-full">
              <div className="grid gap-5 w-full ">
                <span className="text-sm text-gray-300">
                  Adipiscing eliAl iquam vulputate tortor area neclue com
                  university viverra Suspen disse arfauci bussed dolor eget Sed
                  drar urna hiftler Group irepres entatilve loisticsti for
                  operato vulputate tortor area neclue instagram area.
                </span>
                <button className="font-semibold w-fit px-5 py-3 bg-white text-primary-text rounded-sm cursor-pointer shadow-2xl">
                  To Know More About Us
                </button>
              </div>
              <div className="h-48 w-2 bg-secondary/40" />
              <div className="w-full grid gap-8">
                <div className="flex items-center gap-4">
                  <Image
                    src={"/images/order.png"}
                    width={80}
                    height={80}
                    alt=""
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-3xl font-bold">9.5M</span>
                    <p className="text-sm">Delieverd Goods</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src={"/images/earth.png"}
                    width={80}
                    height={80}
                    alt=""
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-3xl font-bold">10.4M</span>
                    <p className="text-sm">Clients Worldwide</p>
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
