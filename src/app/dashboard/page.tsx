import { ChartAreaInteractive } from "@/components/features/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/features/dashboard/section-cards";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

export default async function Page() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return redirect("/login");
  }

  return (
    <div>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
