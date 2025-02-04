import { NextResponse } from 'next/server';
import { Album, AlbumFull, AlbumResponse } from '@/types/api/album';
import logger from '@/utils/logger';

async function getAlbums(): Promise<Album[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/album`);
    return (await response.json()) as Album[];
  } catch (error) {
    logger.error('Error fetching albums:', error);
    return [];
  }
}

async function getAlbumById(id: number): Promise<AlbumFull> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/album/${id}`
    );
    return (await response.json()) as AlbumFull;
  } catch (error) {
    logger.error('Error fetching album:', error);
    return {} as AlbumFull;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const album = await getAlbumById(Number(id));
    return NextResponse.json(album);
  }

  const albums = await getAlbums();
  return NextResponse.json(albums);
}
