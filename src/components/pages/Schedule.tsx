import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { releaseSchedule } from "@/components/data/schedule";
import { Calendar as CalendarIcon, BellRing, BellOff, Filter, RefreshCw } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/hooks/use-toast";
import { Link } from "react-router-dom";

const REMINDER_KEY = "tuanmovies_schedule_reminders";

type ReminderMap = Record<string, boolean>;

const loadReminders = (): ReminderMap => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(REMINDER_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Failed to read reminders", error);
    return {};
  }
};

const saveReminders = (data: ReminderMap) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(REMINDER_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save reminders", error);
  }
};

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<ReminderMap>({});
  const [filter, setFilter] = useState<"all" | "movie" | "series">("all");
  const { toast } = useToast();

  useEffect(() => {
    setReminders(loadReminders());
  }, []);

  const events = useMemo(
    () =>
      releaseSchedule
        .filter((item) =>
          filter === "all" ? true : item.type === filter
        )
        .filter((item) => {
          if (!selectedDate) return true;
          const entryDate = new Date(item.releaseDate);
          return entryDate.toDateString() === selectedDate.toDateString();
        })
        .sort(
          (a, b) =>
            new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
        ),
    [filter, selectedDate],
  );

  const handleReminderToggle = (id: string, title: string) => {
    setReminders((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveReminders(next);
      toast({
        title: next[id] ? "Đã bật nhắc lịch" : "Đã tắt nhắc lịch",
        description: next[id]
          ? `${title} sẽ xuất hiện trong danh sách ưu tiên của anh.`
          : "Sự kiện được gỡ khỏi danh sách ưu tiên.",
      });
      return next;
    });
  };

  const reminderCount = Object.values(reminders).filter(Boolean).length;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">
              Release schedule
            </p>
            <h1 className="text-4xl font-bold mt-2">Lịch phát hành phim & series</h1>
            <p className="text-muted-foreground mt-2">
              Theo dõi phim sắp chiếu, bật nhắc lịch và không bỏ lỡ tập mới.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Ưu tiên</p>
            <p className="text-3xl font-bold">{reminderCount}</p>
            <p className="text-xs text-muted-foreground">sự kiện đang bật nhắc</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border/60 p-4">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <p className="font-semibold">Chọn ngày</p>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 gap-2"
                onClick={() => setSelectedDate(undefined)}
              >
                <RefreshCw className="h-4 w-4" />
                Xem toàn bộ
              </Button>
            </div>

            <div className="rounded-3xl border border-border/60 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <p className="font-semibold">Lọc nội dung</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["all", "movie", "series"] as const).map((option) => (
                  <Button
                    key={option}
                    variant={filter === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(option)}
                  >
                    {option === "all" ? "Tất cả" : option === "movie" ? "Phim lẻ" : "Series"}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border/60 px-6 py-10 text-center">
                <p className="font-semibold">Không có lịch phát hành trong ngày này</p>
                <p className="text-sm text-muted-foreground">
                  Thử chọn một ngày khác hoặc bỏ lọc để xem tất cả sự kiện.
                </p>
              </div>
            ) : (
              events.map((event) => {
                const date = new Date(event.releaseDate);
                const reminderActive = reminders[event.id];
                return (
                  <article
                    key={event.id}
                    className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-secondary/10 p-5 md:flex-row"
                  >
                    <div className="relative h-44 w-full overflow-hidden rounded-2xl md:w-52">
                      <img
                        src={event.poster}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute left-3 top-3 capitalize">{event.type}</Badge>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h2 className="text-2xl font-semibold">{event.title}</h2>
                          <p className="text-sm text-muted-foreground">{event.episodeLabel}</p>
                        </div>
                        <Badge variant="secondary">{event.genre}</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                      <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <div className="rounded-2xl bg-background/80 p-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">
                            Khởi chiếu
                          </p>
                          <p className="font-semibold">
                            {date.toLocaleDateString("vi-VN", {
                              weekday: "long",
                              day: "2-digit",
                              month: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-background/80 p-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">
                            Nền tảng
                          </p>
                          <p className="font-semibold">{event.platform}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          variant={reminderActive ? "default" : "outline"}
                          className="gap-2"
                          onClick={() => handleReminderToggle(event.id, event.title)}
                        >
                          {reminderActive ? (
                            <>
                              <BellRing className="h-4 w-4" />
                              Đang nhắc
                            </>
                          ) : (
                            <>
                              <BellOff className="h-4 w-4" />
                              Nhắc tôi
                            </>
                          )}
                        </Button>
                        <Button variant="ghost" className="gap-2" asChild>
                          <Link to={`/movie/${event.id}`}>
                            <CalendarIcon className="h-4 w-4" />
                            Xem chi tiết
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;

