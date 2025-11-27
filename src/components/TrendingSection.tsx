import { Link } from "react-router-dom";
import { Flame, Clock, CalendarDays, Play, ChevronRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { trendingLists, type TrendingEntry } from "@/components/data/trending";

const tabs = [
  {
    id: "mostWatched",
    label: "Top xem nhiều",
    icon: Flame,
    description: "Phim được xem nhiều nhất toàn thời gian",
  },
  {
    id: "top24h",
    label: "Top 24 giờ",
    icon: Clock,
    description: "Bùng nổ lượt xem trong 24h qua",
  },
  {
    id: "topMonth",
    label: "Top tháng này",
    icon: CalendarDays,
    description: "Phim giữ nhiệt độ cao trong tháng",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

const TrendCard = ({ entry, rank }: { entry: TrendingEntry; rank: number }) => {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-secondary/30 p-4 transition hover:border-primary/60 hover:bg-secondary/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary text-lg font-bold">
        {rank}
      </div>
      <Link to={`/movie/${entry.id}`} className="flex items-center gap-4 flex-1">
        <div className="relative h-16 w-12 overflow-hidden rounded-lg shadow-lg">
          <img
            src={entry.poster}
            alt={entry.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold leading-none">{entry.title}</p>
            {entry.rating && (
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">
                {entry.rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {entry.year} • {entry.genres?.slice(0, 2).join(" • ")}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{entry.views24h.toLocaleString()} lượt/24h</span>
            <span>·</span>
            <span>{entry.viewsMonth.toLocaleString()} lượt/tháng</span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-muted-foreground">
          Hoàn thành {entry.completionRate}%
        </span>
        <Button asChild size="sm" className="gap-2">
          <Link to={`/movie/${entry.id}`}>
            <Play className="h-4 w-4" />
            Xem nhanh
          </Link>
        </Button>
      </div>
    </div>
  );
};

const TrendingSection = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Trending Algorithm
          </p>
          <h2 className="text-3xl font-bold mt-2">Phim đang hot nhất hiện nay</h2>
          <p className="text-muted-foreground mt-2">
            Số liệu cập nhật theo realtime user session trên hệ thống.
          </p>
        </div>
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/movies">
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="mostWatched" className="w-full">
        <TabsList className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 bg-secondary/40 p-2 rounded-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-background data-[state=active]:shadow-lg rounded-xl border border-transparent data-[state=active]:border-primary/40"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">{tab.label}</p>
                    <p className="text-xs text-muted-foreground">{tab.description}</p>
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6 space-y-3">
            {trendingLists[tab.id as TabId].map((entry, index) => (
              <TrendCard key={entry.id} entry={entry} rank={index + 1} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default TrendingSection;

