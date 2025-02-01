import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await fetch('https://8.8.8.8', {
      method: 'GET',
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return NextResponse.json({ online: true });
  } catch (error) {
    return NextResponse.json({ online: false }, { status: 503 });
  }
}
