import { NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { cookies } from 'next/headers';

async function updateReadingPlaylist(trackId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { error: 'No token found' };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/track/${trackId}/read`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update reading playlist');
    }

    return await response.json();
  } catch (error) {
    logger.error('Error updating reading playlist:', error);
    return { error: 'Error updating reading playlist' };
  }
}

export async function POST(request: Request) {
  const { trackId } = await request.json();
  const result = await updateReadingPlaylist(trackId);
  return NextResponse.json(result);
}
