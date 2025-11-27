import { Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { newsArticles } from "@/components/data/news";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NewsSection = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">News & Updates</h2>
        <Button variant="ghost" size="sm" className="ml-auto" asChild>
          <Link to="/news">Xem tất cả</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsArticles.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.slug}`}
            className="group overflow-hidden rounded-lg border border-border/40 bg-card hover:border-primary transition-all"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute left-3 top-3">{item.category}</Badge>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(item.date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
