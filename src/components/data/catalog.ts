import {
  latestMovies,
  trendingMovies,
  topRatedMovies,
  ongoingSeries,
  animationMovies,
} from "@/components/data/movies";

export type EntertainmentType = "movie" | "series" | "animation";

export type CatalogItem = {
  id: number;
  title: string;
  poster: string;
  year?: number;
  rating?: number;
  genres?: string[];
  episodes?: string;
  type: EntertainmentType;
};

type SourceConfig = {
  type: EntertainmentType;
  items: Array<
    Pick<CatalogItem, "id" | "title" | "poster" | "year" | "rating" | "genres" | "episodes">
  >;
};

const sources: SourceConfig[] = [
  { type: "movie", items: latestMovies },
  { type: "movie", items: trendingMovies },
  { type: "movie", items: topRatedMovies },
  { type: "series", items: ongoingSeries },
  { type: "animation", items: animationMovies },
];

const map = new Map<number, CatalogItem>();

sources.forEach(({ type, items }) => {
  items.forEach((item) => {
    map.set(item.id, {
      type,
      id: item.id,
      title: item.title,
      poster: item.poster,
      year: item.year ?? new Date().getFullYear(),
      rating: item.rating,
      genres: item.genres ?? ["General"],
      episodes: item.episodes,
    });
  });
});

export const catalogItems: CatalogItem[] = Array.from(map.values());

