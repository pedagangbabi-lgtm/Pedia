// File: app/dashboard/layout.tsx
import TopNav from "@/app/ui/dashboard/topnav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gray-50">
      <TopNav />
      <main className="mx-auto max-w-7xl px-3 py-4 md:px-6 md:py-6">
        {children}
      </main>
    </div>
  );
}