import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsArticles } from "@/components/data/news";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NewsIndex = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    return newsArticles.filter((article) => {
      const matchesQuery =
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || article.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const categories = ["all", ...new Set(newsArticles.map((article) => article.category))];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">
            Newsroom
          </p>
          <h1 className="text-4xl font-bold">Tin tức & Highlights</h1>
          <p className="text-muted-foreground">
            Cập nhật xu hướng phim ảnh, lịch phát hành và bài viết hậu trường mới nhất.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[280px,1fr]">
          <div className="space-y-4 rounded-3xl border border-border/60 p-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Search className="h-4 w-4" />
                Tìm kiếm
              </label>
              <Input
                placeholder="Nhập tên phim hoặc chủ đề..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">Chủ đề</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-4 py-1 text-sm ${
                      category === item
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-foreground"
                    }`}
                  >
                    {item === "all" ? "Tất cả" : item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-secondary/10 p-5 md:flex-row"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-2xl md:w-72">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <Badge>{article.category}</Badge>
                  <h2 className="text-2xl font-semibold">{article.title}</h2>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString("vi-VN")}
                    </span>
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
            {filteredArticles.length === 0 && (
              <div className="rounded-3xl border border-dashed border-border/60 px-6 py-12 text-center">
                <p className="font-semibold">Chưa có bài viết phù hợp</p>
                <p className="text-sm text-muted-foreground">
                  Thử từ khóa khác hoặc chuyển sang chủ đề khác nhé.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsIndex;


