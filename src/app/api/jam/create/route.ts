import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import logger from '@/utils/logger';

interface JamSession {
  id: string;
  hostId: string;
  participants: {
    id: string;
    username: string;
  }[];
  createdAt: Date;
}

// Stockage temporaire des sessions (à remplacer par une base de données)
const sessions = new Map<string, JamSession>();

async function createJamSession(
  userId: string,
  username: string
): Promise<JamSession> {
  try {
    const sessionId = nanoid();
    const newSession: JamSession = {
      id: sessionId,
      hostId: userId,
      participants: [
        {
          id: userId,
          username,
        },
      ],
      createdAt: new Date(),
    };

    sessions.set(sessionId, newSession);
    logger.info(`Nouvelle session créée: ${sessionId}`);
    return newSession;
  } catch (error) {
    logger.error('Erreur lors de la création de la session:', error);
    throw error;
  }
}

async function getJamSession(sessionId: string): Promise<JamSession | null> {
  try {
    const session = sessions.get(sessionId);
    if (!session) {
      return null;
    }
    return session;
  } catch (error) {
    logger.error('Erreur lors de la récupération de la session:', error);
    throw error;
  }
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const username = cookieStore.get('username')?.value;

    if (!userId || !username) {
      return NextResponse.json(
        { error: 'Utilisateur non authentifié' },
        { status: 401 }
      );
    }

    const session = await createJamSession(userId, username);

    // Nettoyage des sessions inactives (plus de 24h)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    sessions.forEach((existingSession, key) => {
      if (existingSession.createdAt < yesterday) {
        sessions.delete(key);
      }
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      session,
    });
  } catch (error) {
    logger.error('Erreur lors de la création de la session:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'ID de session manquant' },
        { status: 400 }
      );
    }

    const session = await getJamSession(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Session non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      session,
    });
  } catch (error) {
    logger.error('Erreur lors de la récupération de la session:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la session' },
      { status: 500 }
    );
  }
}
