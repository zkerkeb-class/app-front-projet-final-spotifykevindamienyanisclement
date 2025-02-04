import { NextResponse } from 'next/server';
import { Track, TrackFull, TrackResponse } from '@/types/api/track';
import logger from '@/utils/logger';

async function getTracks(albumId: number): Promise<Track[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/album/${albumId}/track`
    );
    return (await response.json()) as Track[];
  } catch (error) {
    logger.error('Error fetching tracks:', error);
    return [];
  }
}

async function getAllTracks(): Promise<Track[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks`);
    return (await response.json()) as Track[];
  } catch (error) {
    logger.error('Error fetching tracks:', error);
    return [];
  }
}

async function getTrackById(albumId: number, id: number): Promise<TrackFull> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/album/${albumId}/track/${id}`
    );
    return (await response.json()) as TrackFull;
  } catch (error) {
    logger.error('Error fetching track:', error);
    return {} as TrackFull;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const albumId = searchParams.get('albumId');

  if (id && albumId) {
    const track = await getTrackById(Number(albumId), Number(id));
    return NextResponse.json(track);
  }

  if (albumId) {
    const tracks = await getTracks(Number(albumId));
    return NextResponse.json(tracks);
  }

  const allTracks = await getAllTracks();
  return NextResponse.json(allTracks);
}
