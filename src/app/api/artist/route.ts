import { NextResponse } from 'next/server';
import { Artist, ArtistFull } from '@/types/api/artist';
import logger from '@/utils/logger';

async function getArtists(): Promise<Artist[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artist`);
    return (await response.json()) as Artist[];
  } catch (error) {
    logger.error('Error fetching artists:', error);
    return [];
  }
}

async function getArtistById(id: number): Promise<Artist> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/artist/${id}`
    );
    return (await response.json()) as ArtistFull;
  } catch (error) {
    logger.error('Error fetching artist:', error);
    return {} as ArtistFull;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const artist = await getArtistById(Number(id));
    return NextResponse.json(artist);
  }

  const artists = await getArtists();
  return NextResponse.json(artists);
}
