import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import TopRated from "./pages/TopRated";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import NewsIndex from "./pages/NewsIndex";
import NewsDetail from "./pages/NewsDetail";
import { WatchProgressProvider } from "@/components/context/watch-progress-context";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WatchProgressProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/news" element={<NewsIndex />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WatchProgressProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
