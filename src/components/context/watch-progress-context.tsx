import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { catalogItems } from "@/components/data/catalog";

export type WatchProgress = {
  id: number;
  title: string;
  poster: string;
  episode?: string;
  currentTime: number; // seconds
  duration: number; // seconds
  lastWatched: string; // ISO string
};

export type WatchlistItem = {
  id: number;
  title: string;
  poster: string;
  type: "movie" | "series";
  nextEpisode?: string;
  addedAt: string;
};

type SyncStatus = "idle" | "syncing" | "success" | "error";

type WatchProgressContextValue = {
  entries: WatchProgress[];
  watchlist: WatchlistItem[];
  syncStatus: SyncStatus;
  lastSynced: string | null;
  updateEntry: (entry: Omit<WatchProgress, "lastWatched">) => void;
  clearEntry: (id: number) => void;
  toggleWatchlist: (item: Omit<WatchlistItem, "addedAt">) => void;
  isInWatchlist: (id: number) => boolean;
  syncWithCloud: () => Promise<SyncStatus>;
};

const WatchProgressContext = createContext<WatchProgressContextValue | null>(null);

const LOCAL_STORAGE_KEY = "tuanmovies_watch_state";
const CLOUD_STORAGE_KEY = "tuanmovies_cloud_snapshot";

const seedEntries: WatchProgress[] = catalogItems.slice(0, 3).map((item, index) => ({
  id: item.id,
  title: item.title,
  poster: item.poster,
  episode: item.type === "series" ? `S1 · E${index + 3}` : undefined,
  duration: 7200,
  currentTime: 1500 + index * 600,
  lastWatched: new Date(Date.now() - index * 3600 * 1000).toISOString(),
}));

const seedWatchlist: WatchlistItem[] = catalogItems.slice(3, 6).map((item, index) => ({
  id: item.id,
  title: item.title,
  poster: item.poster,
  type: item.type,
  nextEpisode: item.type === "series" ? `Tập mới sau ${index + 1} ngày` : undefined,
  addedAt: new Date(Date.now() - index * 7200 * 1000).toISOString(),
}));

type PersistedState = {
  entries: WatchProgress[];
  watchlist: WatchlistItem[];
  lastSynced: string | null;
};

const defaultState: PersistedState = {
  entries: seedEntries,
  watchlist: seedWatchlist,
  lastSynced: null,
};

export const WatchProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<WatchProgress[]>(defaultState.entries);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(defaultState.watchlist);
  const [lastSynced, setLastSynced] = useState<string | null>(defaultState.lastSynced);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: Partial<PersistedState> = JSON.parse(stored);
        setEntries(parsed.entries && parsed.entries.length ? parsed.entries : seedEntries);
        setWatchlist(
          parsed.watchlist && parsed.watchlist.length ? parsed.watchlist : seedWatchlist,
        );
        setLastSynced(parsed.lastSynced ?? null);
      } else {
        setEntries(seedEntries);
        setWatchlist(seedWatchlist);
      }

      const cloudSnapshot = localStorage.getItem(CLOUD_STORAGE_KEY);
      if (cloudSnapshot) {
        const parsedCloud: Partial<PersistedState> = JSON.parse(cloudSnapshot);
        if (parsedCloud.lastSynced) {
          setLastSynced(parsedCloud.lastSynced);
        }
      }
    } catch (error) {
      console.error("Failed to load watch state", error);
      setEntries(seedEntries);
      setWatchlist(seedWatchlist);
    }

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === CLOUD_STORAGE_KEY &&
        event.newValue &&
        mountedRef.current
      ) {
        try {
          const snapshot: PersistedState = JSON.parse(event.newValue);
          setEntries(snapshot.entries);
          setWatchlist(snapshot.watchlist);
          setLastSynced(snapshot.lastSynced);
        } catch (error) {
          console.error("Failed to hydrate from cloud snapshot", error);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      mountedRef.current = false;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    const payload: PersistedState = {
      entries,
      watchlist,
      lastSynced,
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error("Failed to persist watch state", error);
    }
  }, [entries, watchlist, lastSynced]);

  const value = useMemo<WatchProgressContextValue>(() => {
    const updateEntry = (entry: Omit<WatchProgress, "lastWatched">) => {
      setEntries((prev) => {
        const existing = prev.filter((item) => item.id !== entry.id);
        const updated: WatchProgress = {
          ...entry,
          lastWatched: new Date().toISOString(),
        };
        return [updated, ...existing].slice(0, 12);
      });
    };

    const clearEntry = (id: number) => {
      setEntries((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleWatchlist = (item: Omit<WatchlistItem, "addedAt">) => {
      setWatchlist((prev) => {
        const exists = prev.find((entry) => entry.id === item.id);
        if (exists) {
          return prev.filter((entry) => entry.id !== item.id);
        }
        const newEntry: WatchlistItem = {
          ...item,
          addedAt: new Date().toISOString(),
        };
        return [newEntry, ...prev].slice(0, 30);
      });
    };

    const isInWatchlist = (id: number) => watchlist.some((item) => item.id === id);

    const syncWithCloud = async (): Promise<SyncStatus> => {
      setSyncStatus("syncing");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const snapshot: PersistedState = {
          entries,
          watchlist,
          lastSynced: new Date().toISOString(),
        };
        localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(snapshot));
        setLastSynced(snapshot.lastSynced);
        setSyncStatus("success");
        setTimeout(() => setSyncStatus("idle"), 2000);
        return "success";
      } catch (error) {
        console.error("Failed to sync with cloud", error);
        setSyncStatus("error");
        setTimeout(() => setSyncStatus("idle"), 3000);
        return "error";
      }
    };

    return {
      entries,
      watchlist,
      syncStatus,
      lastSynced,
      updateEntry,
      clearEntry,
      toggleWatchlist,
      isInWatchlist,
      syncWithCloud,
    };
  }, [entries, watchlist, syncStatus, lastSynced]);

  return (
    <WatchProgressContext.Provider value={value}>
      {children}
    </WatchProgressContext.Provider>
  );
};

export const useWatchProgressContext = () => {
  const context = useContext(WatchProgressContext);
  if (!context) {
    throw new Error("useWatchProgressContext must be used within WatchProgressProvider");
  }

  return context;
};


