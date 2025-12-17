import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/app/ui/dashboard/DashboardClient";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="w-full space-y-6">
      <DashboardClient />
    </main>
  );
}
