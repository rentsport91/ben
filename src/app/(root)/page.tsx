import { Achievement } from "@/components/features/public/archieve";
import { Choice } from "@/components/features/public/choice";
import { GlobalNetwork } from "@/components/global.network";
import { Hero } from "@/components/features/public/hero";
import { Service } from "@/components/features/public/Services";

export default async function Home() {
  return (
    <main className="">
      <Hero />
      <GlobalNetwork />
      <Service />
      <Achievement />
      <Choice />
    </main>
  );
}
