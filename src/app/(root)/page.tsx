import { Archievement } from "@/components/features/public/archieve";
import { Choice } from "@/components/features/public/choice";
import { GlobalNetwork } from "@/components/global.network";
import { Hero } from "@/components/features/public/hero";
// import { Quota } from "@/components/features/public/quote";
import { Service } from "@/components/features/public/Services";
// import { QuotaRateCalculator } from "@/components/features/quoteCalculator/rate.calculator";

export default async function Home() {
  return (
    <main className="">
      <Hero />
      <GlobalNetwork />
      <Service />
      <Archievement />
      <Choice />
    </main>
  );
}
