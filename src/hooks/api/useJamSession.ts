import { useCallback, useEffect, useState } from 'react';
import { usePlayer } from '@/context/playerContext';
import { useAuth } from '@/context/userContext';
import logger from '@/utils/logger';

interface JamParticipant {
  id: string;
  username: string;
}

interface JamSession {
  id: string;
  participants: JamParticipant[];
  hostId: string;
}

export function useJamSession() {
  const [session, setSession] = useState<JamSession | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { isAuthenticated } = useAuth();
  const { play, pause, setCurrentTime: updateCurrentTime } = usePlayer();

  const createSession = useCallback(async () => {
    try {
      const response = await fetch('/api/jam/create', {
        method: 'POST',
      });
      const data = await response.json();
      return data.sessionId;
    } catch (error) {
      logger.error('Erreur lors de la création de la session:', error);
      return null;
    }
  }, []);

  const joinSession = useCallback(
    (sessionId: string) => {
      if (!isAuthenticated) return;

      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}/jam/${sessionId}`
      );

      ws.onmessage = event => {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'SESSION_UPDATE':
            setSession(data.session);
            break;
          case 'PLAYBACK_UPDATE':
            if (data.isPlaying) {
              play();
            } else {
              pause();
            }
            updateCurrentTime(data.currentTime);
            break;
          default:
            logger.warn('Message type non géré:', data.type);
            break;
        }
      };

      setSocket(ws);
    },
    [isAuthenticated, play, pause, updateCurrentTime]
  );

  const leaveSession = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setSession(null);
    }
  }, [socket]);

  const updatePlayback = useCallback(
    (newIsPlaying: boolean, newCurrentTime: number) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'PLAYBACK_UPDATE',
            isPlaying: newIsPlaying,
            currentTime: newCurrentTime,
          })
        );
      }
    },
    [socket]
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
    updatePlayback,
    isConnected: socket?.readyState === WebSocket.OPEN,
  };
}
