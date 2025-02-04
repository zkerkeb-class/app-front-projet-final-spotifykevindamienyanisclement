import { NextResponse } from 'next/server';
import logger from '@/utils/logger';

async function updateReadingPlaylist(userId: number, trackId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/track/${trackId}/read`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      }
    );
    return await response.json();
  } catch (error) {
    logger.error('Error updating reading playlist:', error);
    return { error: 'Error updating reading playlist' };
  }
}

export async function POST(request: Request) {
  const { userId, trackId } = await request.json();
  const result = await updateReadingPlaylist(userId, trackId);
  return NextResponse.json(result);
}
