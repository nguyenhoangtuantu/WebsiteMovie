import { Link } from "react-router-dom";
import { Clock, Play, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWatchProgress } from "@/components/hooks/use-watch-progress";
import { Progress } from "@/components/ui/progress";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${minutes}m`;
};

const ContinueWatching = () => {
  const { entries } = useWatchProgress();

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Continue watching
          </p>
          <h2 className="text-3xl font-bold mt-2">Xem tiếp tục</h2>
          <p className="text-muted-foreground mt-2">
            Tiếp tục từ vị trí anh đã dừng lại, đồng bộ trên mọi thiết bị.
          </p>
        </div>
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/movies">
            Xem danh sách phim
            <SkipForward className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {entries.slice(0, 4).map((entry) => {
          const progress = Math.min(
            100,
            Math.round((entry.currentTime / entry.duration) * 100)
          );

          return (
            <div
              key={entry.id}
              className="group flex gap-4 rounded-2xl border border-border/50 bg-secondary/30 p-4 transition hover:border-primary/60 hover:bg-secondary/50"
            >
              <Link
                to={`/movie/${entry.id}`}
                className="relative h-36 w-28 overflow-hidden rounded-xl"
              >
                <img
                  src={entry.poster}
                  alt={entry.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.episode ?? "Movie"} · Còn lại{" "}
                      {formatTime(entry.duration - entry.currentTime)}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {progress}%
                  </span>
                </div>

                <Progress value={progress} className="h-2" />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Đã xem {formatTime(entry.currentTime)}
                  </span>
                  <span>
                    Cập nhật {new Date(entry.lastWatched).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button className="gap-2" asChild>
                    <Link to={`/movie/${entry.id}`}>
                      <Play className="h-4 w-4" />
                      Tiếp tục xem
                    </Link>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    Auto next
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContinueWatching;



