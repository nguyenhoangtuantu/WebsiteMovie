import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import MovieSection from "@/components/MovieSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  BookmarkCheck,
  BookmarkPlus,
  Share2,
  Star,
  Clock,
  Calendar,
  Globe,
  Film,
  User,
} from "lucide-react";
import { latestMovies } from "@/components/data/movies";
import { useWatchProgress } from "@/components/hooks/use-watch-progress";
import { useToast } from "@/components/hooks/use-toast";
import CommentsSection from "@/components/CommentsSection";

const MovieDetail = () => {
  const { id } = useParams();
  const { updateEntry, toggleWatchlist, isInWatchlist } = useWatchProgress();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");

  // Mock movie data - in real app, fetch based on id
  const movie = {
    id: Number(id),
    title: "Guardians of Tomorrow",
    englishTitle: "Guardians of Tomorrow",
    poster:
      "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=600&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80",
    year: 2025,
    releaseDate: "March 15, 2025",
    duration: "2h 15min",
    genres: ["Action", "Sci-Fi", "Adventure"],
    country: "USA",
    rating: 8.4,
    director: "James Cameron",
    cast: ["Chris Hemsworth", "Zendaya", "Oscar Isaac", "Lupita Nyong'o"],
    studio: "Marvel Studios",
    ageRating: "PG-13",
    language: "English",
    quality: "4K Ultra HD",
    description:
      "In a dystopian future where humanity faces extinction, a group of unlikely heroes must band together to protect the last remnants of civilization. With time running out and enemies closing in from all sides, they must make the ultimate sacrifice to ensure humanity's survival. An epic tale of courage, friendship, and the indomitable human spirit.",
    trailer: "dQw4w9WgXcQ",
  };

  const episodes = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
  }));
  const episodeLabels = episodes.map((episode) => episode.title);

  const parseDurationToSeconds = (value: string) => {
    const hoursMatch = value.match(/(\d+)\s*h/);
    const minutesMatch = value.match(/(\d+)\s*m/);
    const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
    const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;
    return hours * 3600 + minutes * 60;
  };

  const handleWatchNow = (episodeLabel?: string) => {
    const durationSeconds = parseDurationToSeconds(movie.duration) || 7200;
    const currentTime = Math.floor(durationSeconds * 0.35);
    updateEntry({
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      episode: episodeLabel,
      currentTime,
      duration: durationSeconds,
    });
  };

  const handleWatchlistToggle = () => {
    const alreadyInWatchlist = isInWatchlist(movie.id);
    toggleWatchlist({
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      type: "movie",
    });
    toast({
      title: alreadyInWatchlist ? "Đã gỡ khỏi watchlist" : "Đã thêm vào watchlist",
      description: alreadyInWatchlist
        ? "Phim sẽ không còn được đồng bộ."
        : "Bạn có thể xem tiếp trên bất kỳ thiết bị nào.",
    });
  };
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-64 rounded-lg shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
              <p className="text-xl text-muted-foreground">
                {movie.englishTitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <div>
                  <p className="text-accent font-bold text-lg">
                    {movie.rating}
                  </p>
                  <p className="text-muted-foreground text-xs">IMDb Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{movie.year}</p>
                  <p className="text-muted-foreground text-xs">Release Year</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{movie.duration}</p>
                  <p className="text-muted-foreground text-xs">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{movie.country}</p>
                  <p className="text-muted-foreground text-xs">Country</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex gap-2">
                <User className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Director: </span>
                  <span className="font-semibold">{movie.director}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Film className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted-foreground">Studio: </span>
                  <span className="font-semibold">{movie.studio}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-muted-foreground">Cast: </span>
                <span className="font-semibold">{movie.cast.join(", ")}</span>
              </div>
              <div className="flex gap-4">
                <span className="px-2 py-1 bg-secondary rounded text-xs font-semibold">
                  {movie.ageRating}
                </span>
                <span className="px-2 py-1 bg-secondary rounded text-xs font-semibold">
                  {movie.language}
                </span>
                <span className="px-2 py-1 bg-secondary rounded text-xs font-semibold">
                  {movie.quality}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => handleWatchNow()}
              >
                <Play className="h-5 w-5" />
                Watch Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-5 w-5" />
                Trailer
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={handleWatchlistToggle}>
                {inWatchlist ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <BookmarkPlus className="h-5 w-5" />
                )}
                {inWatchlist ? "Đang theo dõi" : "Thêm watchlist"}
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="trailer">Trailer</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="similar">More Like This</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="episodes" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Episodes - Season 1</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {episodes.map((episode) => (
                  <Button
                    key={episode.number}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleWatchNow(`Episode ${episode.number}`)}
                  >
                    <Play className="h-6 w-6" />
                    <span className="text-sm">{episode.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trailer" className="mt-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${movie.trailer}`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <CommentsSection movieId={movie.id} title={movie.title} episodeOptions={episodeLabels} />
          </TabsContent>

          <TabsContent value="similar" className="mt-6">
            <MovieSection title="" movies={latestMovies} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetail;
