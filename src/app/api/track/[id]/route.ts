import { NextResponse } from 'next/server';
import { TrackFull } from '@/types/api/track';
import logger from '@/utils/logger';

async function getTrackById(id: number): Promise<TrackFull[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/track/${id}`
    );
    return (await response.json()) as TrackFull[];
  } catch (error) {
    logger.error('Error fetching track:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const track = await getTrackById(Number(id));
    return NextResponse.json(track);
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
