import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getRideCreationData } from '@/lib/data';

// Data are fetched dynamically on each request
export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getRideCreationData();
  return NextResponse.json(data);
}
