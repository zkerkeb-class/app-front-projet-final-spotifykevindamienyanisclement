import { NextResponse } from 'next/server';
import logger from '@/utils/logger';

async function getLastListenedPlaylist() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/playlist/last-listened`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error('Error fetching last listened playlist:', error);
    return null;
  }
}

async function getMostListenedPlaylist() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/playlist/most-listened`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error('Error fetching most listened playlist:', error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'last-listened') {
    const data = await getLastListenedPlaylist();
    return NextResponse.json(data);
  }

  if (type === 'most-listened') {
    const data = await getMostListenedPlaylist();
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
}
