import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NetworkState {
  isOnline: boolean;
  hasUpdate: boolean;
  isPendingSync: boolean;
  pendingActions: number;
  setOnline: (status: boolean) => void;
  setHasUpdate: (status: boolean) => void;
  setPendingSync: (status: boolean) => void;
  incrementPendingActions: () => void;
  decrementPendingActions: () => void;
}

export const useNetworkStatus = create<NetworkState>()(
  persist(
    set => ({
      isOnline: true,
      hasUpdate: false,
      isPendingSync: false,
      pendingActions: 0,
      setOnline: status => set({ isOnline: status }),
      setHasUpdate: status => set({ hasUpdate: status }),
      setPendingSync: status => set({ isPendingSync: status }),
      incrementPendingActions: () =>
        set(state => ({ pendingActions: state.pendingActions + 1 })),
      decrementPendingActions: () =>
        set(state => ({
          pendingActions: Math.max(0, state.pendingActions - 1),
        })),
    }),
    {
      name: 'network-status',
      skipHydration: true,
    }
  )
);
