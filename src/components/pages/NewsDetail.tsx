import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsArticles } from "@/components/data/news";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-24 text-center space-y-4">
          <p className="text-muted-foreground">Bài viết không tồn tại hoặc đã bị xoá.</p>
          <Button asChild>
            <Link to="/news">Quay lại trang tin</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const related = newsArticles.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-8">
        <Button variant="ghost" className="gap-2" asChild>
          <Link to="/news">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </Button>

        <article className="space-y-6">
          <div className="space-y-4">
            <Badge>{article.category}</Badge>
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="text-muted-foreground text-lg">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Tác giả: {article.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString("vi-VN")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime}
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <img src={article.image} alt={article.title} className="w-full object-cover" />
          </div>

          <div className="prose prose-invert max-w-none space-y-4 text-base leading-relaxed text-muted-foreground">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="ml-auto gap-2">
              <Share2 className="h-4 w-4" />
              Chia sẻ
            </Button>
          </div>
        </article>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Bài viết liên quan</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="rounded-2xl border border-border/60 hover:border-primary transition p-4 space-y-2"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {item.category}
                </p>
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;


