import { useMemo, useState } from "react";

export type UserComment = {
  id: string;
  movieId: number;
  author: string;
  content: string;
  rating: number;
  episode?: string;
  createdAt: string;
};

type CommentsStore = Record<number, UserComment[]>;

const STORAGE_KEY = "tuanmovies_comments";

const readStore = (): CommentsStore => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored) as CommentsStore;
  } catch (error) {
    console.error("Failed to parse comments store", error);
    return {};
  }
};

const writeStore = (data: CommentsStore) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to persist comments", error);
  }
};

type AddCommentInput = {
  author: string;
  content: string;
  rating: number;
  episode?: string;
};

export const useComments = (movieId: number) => {
  const initial = useMemo(() => {
    const store = readStore();
    return store[movieId] ?? [];
  }, [movieId]);
  const [comments, setComments] = useState<UserComment[]>(initial);

  const persist = (next: UserComment[]) => {
    const store = readStore();
    store[movieId] = next;
    writeStore(store);
  };

  const addComment = (payload: AddCommentInput) => {
    const newComment: UserComment = {
      id: crypto.randomUUID(),
      movieId,
      author: payload.author || "Khách",
      content: payload.content,
      rating: payload.rating,
      episode: payload.episode,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => {
      const next = [newComment, ...prev].slice(0, 50);
      persist(next);
      return next;
    });
  };

  return {
    comments,
    addComment,
  };
};


