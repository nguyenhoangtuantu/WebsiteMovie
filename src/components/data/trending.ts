import { catalogItems, type CatalogItem } from "@/components/data/catalog";

export type TrendingEntry = CatalogItem & {
  viewsTotal: number;
  views24h: number;
  viewsMonth: number;
  completionRate: number;
  momentum: number;
};

const createTrendingMetrics = (): TrendingEntry[] => {
  return catalogItems.map((item) => {
    const base = 50000 + item.id * 3371;
    const views24h = 1200 + ((item.id * 173) % 4200);
    const viewsMonth = views24h * 18 + ((item.rating ?? 8) * 300);
    const viewsTotal = base + viewsMonth * 3;
    const completionRate = 65 + ((item.rating ?? 8) * 3) + (item.type === "series" ? 2 : 0);
    const momentum = (views24h / Math.max(1, viewsMonth)) * 100;

    return {
      ...item,
      views24h,
      viewsMonth,
      viewsTotal,
      completionRate: Math.min(98, Math.round(completionRate)),
      momentum: Math.round(momentum),
    };
  });
};

const metrics = createTrendingMetrics();

const topBy = (key: keyof TrendingEntry, limit = 5) =>
  [...metrics].sort((a, b) => (b[key] as number) - (a[key] as number)).slice(0, limit);

export const trendingLists = {
  mostWatched: topBy("viewsTotal"),
  top24h: topBy("views24h"),
  topMonth: topBy("viewsMonth"),
};



