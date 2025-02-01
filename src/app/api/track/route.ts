import { NextResponse } from 'next/server';
import { Track, TrackFull, TrackResponse } from '@/types/api/track';

async function getTracks(): Promise<Track[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/track`);
    return (await response.json()) as Track[];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
}

async function getTrackById(id: number): Promise<TrackFull> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/track/${id}`
    );
    return (await response.json()) as TrackFull;
  } catch (error) {
    console.error('Error fetching track:', error);
    return {} as TrackFull;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const track = await getTrackById(Number(id));
    return NextResponse.json(track);
  }

  const tracks = await getTracks();
  return NextResponse.json(tracks);
}
