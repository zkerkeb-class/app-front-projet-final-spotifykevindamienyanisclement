import { useCallback, useEffect, useState } from 'react';
import { usePlayer } from '@/context/playerContext';
import { useAuth } from '@/context/userContext';
import logger from '@/utils/logger';

interface JamParticipant {
  id: number;
  userId: number;
  username: string;
}

interface JamSession {
  id: number;
  name: string;
  hostId: number;
  currentTrackId: number | null;
  isActive: boolean;
  participants: JamParticipant[];
  createdAt: Date;
  updatedAt: Date;
}

export function useJamSession() {
  const [session, setSession] = useState<JamSession | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { isAuthenticated } = useAuth();
  const { play, pause, setCurrentTime: updateCurrentTime } = usePlayer();

  const createSession = useCallback(async (name: string) => {
    try {
      const response = await fetch('/api/jam-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session');
      }

      const data = await response.json();
      return data.sessionId;
    } catch (error) {
      logger.error('Erreur lors de la création de la session:', error);
      return null;
    }
  }, []);

  const joinSession = useCallback(
    async (sessionId: number) => {
      if (!isAuthenticated) return;

      try {
        const response = await fetch(`/api/jam-session/${sessionId}/join`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la jointure de la session');
        }

        const ws = new WebSocket(
          `${process.env.NEXT_PUBLIC_WS_URL}/jam/${sessionId}`
        );

        ws.onmessage = event => {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'SESSION_UPDATE':
              setSession(data.session);
              break;
            case 'TRACK_CHANGE':
              // Gérer le changement de piste
              break;
            case 'TRACK_POSITION':
              updateCurrentTime(data.data.position);
              break;
            case 'TRACK_PLAY_STATE':
              if (data.data.isPlaying) {
                play();
              } else {
                pause();
              }
              break;
            default:
              logger.warn('Message type non géré:', data.type);
          }
        };

        setSocket(ws);
      } catch (error) {
        logger.error('Erreur lors de la jointure de la session:', error);
      }
    },
    [isAuthenticated, play, pause, updateCurrentTime]
  );

  const leaveSession = useCallback(async () => {
    if (!session) return;

    try {
      await fetch(`/api/jam-session/${session.id}/leave`, {
        method: 'DELETE',
      });

      if (socket) {
        socket.close();
        setSocket(null);
      }
      setSession(null);
    } catch (error) {
      logger.error('Erreur lors du départ de la session:', error);
    }
  }, [session, socket]);

  const updateTrackPosition = useCallback(
    async (position: number) => {
      if (!session) return;

      try {
        await fetch(`/api/jam-session/${session.id}/position`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ position }),
        });
      } catch (error) {
        logger.error('Erreur lors de la mise à jour de la position:', error);
      }
    },
    [session]
  );

  const updatePlayState = useCallback(
    async (isPlaying: boolean) => {
      if (!session) return;

      try {
        await fetch(`/api/jam-session/${session.id}/playstate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isPlaying }),
        });
      } catch (error) {
        logger.error(
          'Erreur lors de la mise à jour du statut de lecture:',
          error
        );
      }
    },
    [session]
  );

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return {
    session,
    createSession,
    joinSession,
    leaveSession,
    updateTrackPosition,
    updatePlayState,
    isConnected: socket?.readyState === WebSocket.OPEN,
  };
}
