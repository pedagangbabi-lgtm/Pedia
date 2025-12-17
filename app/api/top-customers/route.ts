import { NextRequest, NextResponse } from 'next/server';
import { fetchTopCustomers } from '@/app/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') as 'all-time' | 'this-month' | 'this-week' || 'all-time';
    
    console.log('🔵 API Called with period:', period);
    
    const topCustomers = await fetchTopCustomers(period);
    
    console.log('🟢 API Returning data:', topCustomers.length, 'customers');
    
    return NextResponse.json(topCustomers);
  } catch (error) {
    console.error('🔴 API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top customers' },
      { status: 500 }
    );
  }
}