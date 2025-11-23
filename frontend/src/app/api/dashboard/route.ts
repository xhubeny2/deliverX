import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Data are fetched dynamically on each request
// export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [drivers, deliveries] = await Promise.all([
      prisma.driver.findMany({
        orderBy: { name: 'desc' },
      }),
      prisma.delivery.findMany({
        where: { status: 'PENDING' },
      }),
    ]);

    return NextResponse.json({
      drivers,
      deliveries,
    });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
