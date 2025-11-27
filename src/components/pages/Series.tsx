import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { ongoingSeries } from "@/components/data/movies";

const Series = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">TV Series</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {ongoingSeries.map((series) => (
            <MovieCard key={series.id} {...series} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Series;
