import Image from "next/image";
import { Progress } from "../ui/progress";

export const Choice = () => {
  return (
    <div className="bg-[url('/images/banner_bg.jpg')] bg-cover py-28">
      <div className="container mx-auto px-8">
        <div className="flex gap-10">
          <div className="w-1/2 space-y-5">
            <p className="uppercase font-medium text-primary-text">
              What we achieved
            </p>
            <p className="text-4xl font-semibold text-top-header drop-shadow-md">
              We Are Logistics Improving Our Skills To Fulfill Delivery Of Any
              Level!
            </p>
            <p className="w-3/4">
              Adipiscing elit. Aliquam vulputate, tortor nec com ultri viverra
              Suspen disse faucibus sed dolor eget Sed id urna. hiftler Group
              irepresentatilve in loisticsti
            </p>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Successful Delivery</span>
                <span>82%</span>
              </div>
              <Progress value={82} className="bg-gray-200" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Happy Customers</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="bg-gray-200" />
            </div>
          </div>
          <div className="w-1/2 relative ">
            <Image
              src={"/images/container.webp"}
              alt="container"
              width={500}
              height={500}
              className="absolute -top-28 right-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
