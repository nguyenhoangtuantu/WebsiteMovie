import { Link } from "react-router-dom";
import { Search, User, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">TuanMovies</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/movies"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Movies
            </Link>
            <Link
              to="/series"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Series
            </Link>
            <Link
              to="/top-rated"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Top Rated
            </Link>
            <Link
              to="/schedule"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Schedule
            </Link>
            <Link
              to="/news"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              News
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block w-72">
              <SearchBar />
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
