// app/api/dashboard/route.ts
import { fetchDashboardData } from "@/app/lib/data";
import { NextResponse } from "next/server";

// ✅ DISABLE CACHING - CRITICAL untuk real-time update
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = await fetchDashboardData();
    
    // ✅ Return dengan headers no-cache
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}