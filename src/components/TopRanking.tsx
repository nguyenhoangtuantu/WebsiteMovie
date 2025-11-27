import { Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { topRatedMovies } from "@/components/data/movies";

const TopRanking = () => {
  const top10 = topRatedMovies.slice(0, 10);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Top 10 Movies Today</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {top10.map((movie, index) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="group relative overflow-hidden rounded-lg border border-border/40 bg-card hover:border-primary transition-all"
          >
            <div className="relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute top-0 left-0 w-16 h-16 bg-primary flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-foreground">
                  {index + 1}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="text-accent font-semibold">
                  {movie.rating}
                </span>
                <span>• {movie.year}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopRanking;
