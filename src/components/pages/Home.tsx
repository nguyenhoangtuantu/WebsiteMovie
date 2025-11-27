import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import MovieSection from "@/components/MovieSection";
import QuickFilters from "@/components/QuickFilters";
import TopRanking from "@/components/TopRanking";
import NewsSection from "@/components/NewsSection";
import TrendingSection from "@/components/TrendingSection";
import ContinueWatching from "@/components/ContinueWatching";
import WatchlistSection from "@/components/WatchlistSection";
import Footer from "@/components/Footer";
import {
  latestMovies,
  trendingMovies,
  topRatedMovies,
  ongoingSeries,
  animationMovies,
} from "@/components/data/movies";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSlider />
      <main className="container mx-auto px-4 py-12 space-y-12">
        <QuickFilters />
        <ContinueWatching />
        <WatchlistSection />
        <TrendingSection />
        <TopRanking />
        <MovieSection
          title="Latest Movies"
          movies={latestMovies}
          viewAllLink="/movies"
        />
        <MovieSection
          title="Trending Now"
          movies={trendingMovies}
          viewAllLink="/categories"
        />
        <MovieSection
          title="Top IMDb"
          movies={topRatedMovies}
          viewAllLink="/top-rated"
        />
        <MovieSection
          title="Ongoing Series"
          movies={ongoingSeries}
          viewAllLink="/series"
        />
        <MovieSection
          title="Animation"
          movies={animationMovies}
          viewAllLink="/categories"
        />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
