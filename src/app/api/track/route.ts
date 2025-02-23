import { NextResponse } from 'next/server';
import { Track } from '@/types/api/track';
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

async function getAllTracks(limit: number): Promise<Track[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/track?limit=${limit}`
    );
    return (await response.json()) as Track[];
  } catch (error) {
    logger.error('Error fetching tracks:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const albumId = searchParams.get('albumId');

  if (albumId) {
    const tracks = await getTracks(Number(albumId));
    return NextResponse.json(tracks);
  }

  const allTracks = await getAllTracks(50);
  return NextResponse.json(allTracks);
}
