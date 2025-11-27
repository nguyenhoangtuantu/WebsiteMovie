import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  catalogItems,
  type CatalogItem,
} from "@/components/data/catalog";

const MAX_RESULTS = 6;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.trim().toLowerCase();

    return catalogItems
      .filter((item) => item.title.toLowerCase().includes(normalized))
      .slice(0, MAX_RESULTS);
  }, [query]);

  const showDropdown = isOpen && query.length > 0;

  return (
    <div className="relative" ref={containerRef}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies, series..."
        className="pl-10 bg-secondary border-border"
      />

      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border border-border bg-background/95 shadow-2xl backdrop-blur-lg">
          <div className="p-3">
            <p className="text-xs uppercase text-muted-foreground tracking-wide mb-2">
              Smart search results
            </p>
            {results.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No matches for “{query}”. Try another keyword.
              </p>
            ) : (
              <ul className="space-y-2">
                {results.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-border/40 bg-secondary/30 p-3 transition hover:border-primary/70"
                  >
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/movie/${item.id}`}
                        className="flex items-center gap-3 flex-1"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="relative h-14 w-10 overflow-hidden rounded-md">
                          <img
                            src={item.poster}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                              {item.title}
                            </span>
                            {item.rating && (
                              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                {item.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{item.year}</span>
                            <span>•</span>
                            <span>{item.genres?.slice(0, 2).join(" • ")}</span>
                            {item.type === "series" && item.episodes && (
                              <>
                                <span>•</span>
                                <span>{item.episodes}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>

                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => setIsOpen(false)}
                        asChild
                      >
                        <Link to={`/movie/${item.id}`}>
                          <Play className="h-4 w-4" />
                          Quick play
                        </Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

