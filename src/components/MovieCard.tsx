import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck, Play, Star } from "lucide-react";
import { useWatchProgress } from "@/components/hooks/use-watch-progress";
import { useToast } from "@/components/hooks/use-toast";

interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year?: number;
  episodes?: string;
  type?: "movie" | "series";
}

const MovieCard = ({
  id,
  title,
  poster,
  rating,
  year,
  episodes,
  type,
}: MovieCardProps) => {
  const { toggleWatchlist, isInWatchlist } = useWatchProgress();
  const { toast } = useToast();
  const resolvedType = type ?? (episodes ? "series" : "movie");
  const active = isInWatchlist(id);

  const handleWatchlistToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWatchlist({
      id,
      title,
      poster,
      type: resolvedType,
      nextEpisode: episodes,
    });
    toast({
      title: active ? "Đã gỡ khỏi watchlist" : "Đã thêm vào watchlist",
      description: active
        ? `${title} được xóa khỏi danh sách đồng bộ.`
        : `${title} sẽ được đồng bộ sang thiết bị khác.`,
    });
  };

  return (
    <Link
      to={`/movie/${id}`}
      className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-card transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
    >
      <img
        src={poster}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-primary/90 p-4 backdrop-blur-sm">
            <Play
              className="h-8 w-8 text-primary-foreground"
              fill="currentColor"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleWatchlistToggle}
        className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-foreground/80 transition hover:bg-primary hover:text-primary-foreground"
        aria-label={active ? "Remove from watchlist" : "Add to watchlist"}
      >
        {active ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 gradient-overlay">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-accent font-medium">{rating}</span>
          </div>
          {year && <span>{year}</span>}
          {episodes && <span className="text-primary">{episodes}</span>}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
