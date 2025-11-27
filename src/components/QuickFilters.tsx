import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";
import { latestMovies } from "@/components/data/movies";

const filters = [
  { name: "Action", movies: latestMovies.slice(0, 6) },
  { name: "Romance", movies: latestMovies.slice(6, 12) },
  { name: "Horror", movies: latestMovies.slice(0, 6) },
  { name: "Anime", movies: latestMovies.slice(6, 12) },
  { name: "Asian Drama", movies: latestMovies.slice(0, 6) },
  { name: "Hollywood", movies: latestMovies.slice(6, 12) },
];

const QuickFilters = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Quick Filters</h2>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <div key={filter.name} className="relative">
            <Button
              variant={activeFilter === filter.name ? "default" : "outline"}
              onClick={() =>
                setActiveFilter(
                  activeFilter === filter.name ? null : filter.name
                )
              }
              className="gap-2"
            >
              {filter.name}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  activeFilter === filter.name ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        ))}
      </div>

      {activeFilter && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
            {filters
              .find((f) => f.name === activeFilter)
              ?.movies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default QuickFilters;
