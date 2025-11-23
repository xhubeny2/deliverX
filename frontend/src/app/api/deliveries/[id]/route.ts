import { NextResponse } from 'next/server';
import { getDeliveryById } from '@/lib/data';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }, // 1. Type definition: params is a Promise
) {
  const { id } = await params;

  const delivery = await getDeliveryById(id);

  return NextResponse.json(delivery);
}
