import { ChartAreaInteractive } from "@/components/features/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/features/dashboard/section-cards";

export default function Page() {
  return (
    <div>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
