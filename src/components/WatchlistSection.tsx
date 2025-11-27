import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useWatchProgress } from "@/components/hooks/use-watch-progress";
import {
  BookmarkMinus,
  BookmarkPlus,
  CalendarClock,
  CheckCircle2,
  Cloud,
  CloudOff,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/hooks/use-toast";

const WatchlistSection = () => {
  const { watchlist, toggleWatchlist, syncWithCloud, syncStatus, lastSynced } = useWatchProgress();
  const { toast } = useToast();
  const isSyncing = syncStatus === "syncing";

  const handleToggle = (id: number) => {
    const item = watchlist.find((entry) => entry.id === id);
    if (item) {
      toggleWatchlist({
        id: item.id,
        title: item.title,
        poster: item.poster,
        type: item.type,
        nextEpisode: item.nextEpisode,
      });
      toast({
        title: "Đã xóa khỏi Watchlist",
        description: `${item.title} sẽ không còn ở danh sách theo dõi.`,
      });
    }
  };

  const handleSync = async () => {
    const status = await syncWithCloud();
    toast({
      title: status === "error" ? "Đồng bộ thất bại" : "Đồng bộ thành công",
      description:
        status === "error"
          ? "Kiểm tra lại kết nối và thử lại nhé."
          : "Watchlist và tiến độ đã được lưu trên thiết bị khác.",
    });
  };

  const lastSyncedLabel = lastSynced
    ? new Date(lastSynced).toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
      })
    : "Chưa đồng bộ";

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Watchlist & Sync
          </p>
          <h2 className="text-3xl font-bold mt-2">Theo dõi đa thiết bị</h2>
          <p className="text-muted-foreground mt-2">
            Lưu phim yêu thích, đồng bộ tiến độ chỉ với một cú nhấp chuột.
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            {syncStatus === "error" ? (
              <CloudOff className="h-4 w-4 text-destructive" />
            ) : (
              <Cloud className="h-4 w-4 text-primary" />
            )}
            <span>Lần cuối: {lastSyncedLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : syncStatus === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <CalendarClock className="h-4 w-4" />
            )}
            {isSyncing ? "Đang đồng bộ..." : "Đồng bộ ngay"}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link to="/movies">
              <BookmarkPlus className="h-4 w-4" />
              Thêm phim mới
            </Link>
          </Button>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center space-y-3">
            <BookmarkPlus className="h-10 w-10 mx-auto text-muted-foreground" />
            <div>
              <p className="font-semibold">Danh sách theo dõi đang trống</p>
              <p className="text-sm text-muted-foreground">
                Hãy thêm phim tại trang chi tiết để đồng bộ qua các thiết bị.
              </p>
            </div>
            <Button asChild>
              <Link to="/movies">Khám phá ngay</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {watchlist.slice(0, 6).map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-2xl border border-border/50 bg-secondary/20 p-4"
            >
              <Link
                to={`/movie/${item.id}`}
                className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-xl"
              >
                <img
                  src={item.poster}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <Badge className="absolute left-2 top-2 capitalize">{item.type}</Badge>
              </Link>
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                  {item.nextEpisode && (
                    <p className="text-sm text-muted-foreground">{item.nextEpisode}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Thêm ngày{" "}
                    {new Date(item.addedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button variant="ghost" size="sm" className="gap-2" asChild>
                    <Link to={`/movie/${item.id}`}>
                      <BookmarkPlus className="h-4 w-4" />
                      Chi tiết
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive"
                    onClick={() => handleToggle(item.id)}
                  >
                    <BookmarkMinus className="h-4 w-4" />
                    Bỏ
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default WatchlistSection;

