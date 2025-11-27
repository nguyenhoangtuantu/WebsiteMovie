import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useComments } from "@/components/hooks/use-comments";
import { Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/hooks/use-toast";

type CommentsSectionProps = {
  movieId: number;
  title: string;
  episodeOptions?: string[];
};

const ratingOptions = [5, 4, 3, 2, 1];

const CommentsSection = ({ movieId, title, episodeOptions }: CommentsSectionProps) => {
  const { comments, addComment } = useComments(movieId);
  const { toast } = useToast();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [episode, setEpisode] = useState<string | undefined>(episodeOptions?.[0]);

  const averageRating =
    comments.reduce((total, item) => total + item.rating, 0) / (comments.length || 1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) {
      toast({
        title: "Nội dung bình luận còn trống",
        description: "Anh hãy ghi vài cảm nhận nhé!",
      });
      return;
    }

    addComment({
      author: author.trim(),
      content: content.trim(),
      rating,
      episode,
    });

    toast({
      title: "Đã gửi bình luận",
      description: "Ý kiến của anh đã được lưu cục bộ.",
    });

    setContent("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Cộng đồng nhận xét</h2>
          <p className="text-muted-foreground text-sm">
            Bình luận được lưu trên thiết bị của anh và có thể đồng bộ khi đăng nhập sau này.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 px-6 py-3 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Điểm trung bình</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
            <Star className="h-5 w-5 fill-accent text-accent" />
          </div>
          <p className="text-xs text-muted-foreground">{comments.length} lượt nhận xét</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-border/60 bg-secondary/20 px-6 py-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="author">Tên hiển thị</Label>
            <Input
              id="author"
              placeholder="Anh Tuấn"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Đánh giá</Label>
            <Select value={rating.toString()} onValueChange={(value) => setRating(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn điểm" />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} sao
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {episodeOptions && episodeOptions.length > 0 && (
          <div className="space-y-2">
            <Label>Tập phim</Label>
            <Select
              value={episode}
              onValueChange={(value) => setEpisode(value === "all" ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tập anh muốn bình luận" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toàn bộ phim</SelectItem>
                {episodeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="comment">Cảm nhận</Label>
          <Textarea
            id="comment"
            rows={4}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={`Chia sẻ cảm nhận của anh về ${title}...`}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="px-6">
            Gửi bình luận
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Chưa có bình luận nào. Anh hãy là người đầu tiên nhé!
          </p>
        ) : (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {comment.author
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "TV"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold">{comment.author || "Khách"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      <Star className="h-4 w-4 fill-current" />
                      {comment.rating}/5
                    </div>
                  </div>
                  {comment.episode && (
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {comment.episode}
                    </p>
                  )}
                  <p className="leading-relaxed text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;



