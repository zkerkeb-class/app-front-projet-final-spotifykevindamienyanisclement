import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import logger from '@/utils/logger';

interface JamSessionResponse {
  id: number;
  name: string;
  hostId: number;
  participants: {
    id: number;
    userId: number;
    username: string;
  }[];
}

async function createJamSession(
  name: string,
  token: string
): Promise<JamSessionResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jam-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      logger.error('Erreur API:', errorData);
      throw new Error(
        errorData.message || 'Erreur API lors de la création de la session'
      );
    }

    return await response.json();
  } catch (error) {
    logger.error('Erreur détaillée:', error);
    throw error;
  }
}

async function getJamSessions(token: string): Promise<JamSessionResponse[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jam-session`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Erreur API lors de la récupération des sessions');
    }

    return await response.json();
  } catch (error) {
    logger.error('Erreur lors de la récupération des sessions:', error);
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userId = cookieStore.get('userId')?.value;

    if (!token || !userId) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { name } = await request.json();
    logger.info('Création session:', { name, userId });

    const session = await createJamSession(name, token);
    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    logger.error('Erreur complète:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur interne' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const sessions = await getJamSessions(token);
    return NextResponse.json(sessions);
  } catch (error) {
    logger.error('Erreur lors de la récupération des sessions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des sessions' },
      { status: 500 }
    );
  }
}
