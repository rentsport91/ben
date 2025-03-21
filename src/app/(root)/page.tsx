import { Archievement } from "@/components/archieve";
import { Choice } from "@/components/choice";
import RateCalculator from "@/components/features/rate.quote.calculator";
import { GlobalNetwork } from "@/components/global.network";
import { Hero } from "@/components/hero";
import { Quota } from "@/components/quote";
import { Service } from "@/components/Services";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <GlobalNetwork />
      <Service />
      <Archievement />
      <Choice />
      <Quota />
      <RateCalculator />
    </main>
  );
}
