import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredMovies = [
  {
    id: 1,
    title: "The Last Stand",
    description:
      "In a world on the brink of collapse, one warrior must rise to defend humanity's final hope.",
    backdrop:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80",
    rating: 8.5,
  },
  {
    id: 2,
    title: "Midnight Chase",
    description:
      "A thrilling journey through the neon-lit streets as time runs out and danger closes in.",
    backdrop:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80",
    rating: 7.9,
  },
  {
    id: 3,
    title: "Quantum Legacy",
    description:
      "When reality fractures, only one team can piece together the truth before it's too late.",
    backdrop:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80",
    rating: 8.2,
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length
    );
  };

  const current = featuredMovies[currentSlide];

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${current.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
            {current.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-in">
            {current.description}
          </p>
          <div className="flex items-center gap-4 animate-fade-in">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Play className="h-5 w-5" />
              Watch Now
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold text-lg">
              ★ {current.rating}
            </span>
            <span className="text-muted-foreground">IMDb</span>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur hover:bg-background/80 transition-colors"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur hover:bg-background/80 transition-colors"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all ${
              idx === currentSlide ? "w-8 bg-primary" : "w-4 bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
