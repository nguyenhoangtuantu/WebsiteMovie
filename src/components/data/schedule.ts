export type ScheduleEntry = {
  id: string;
  title: string;
  poster: string;
  episodeLabel: string;
  releaseDate: string; // ISO
  platform: string;
  type: "movie" | "series";
  genre: string;
  description: string;
};

export const releaseSchedule: ScheduleEntry[] = [
  {
    id: "schedule-1",
    title: "Chronicles of Earth",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
    episodeLabel: "S3 · E13 Finale",
    releaseDate: new Date(Date.now() + 86400000).toISOString(),
    platform: "Tuấn Movies Premium",
    type: "series",
    genre: "Sci-Fi",
    description: "Trận chiến khép lại mùa 3 với tuyến nhân vật chính cùng bê bối liên hành tinh.",
  },
  {
    id: "schedule-2",
    title: "Digital Dreams",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    episodeLabel: "Suất chiếu sớm",
    releaseDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    platform: "Rạp CGV · Galaxy",
    type: "movie",
    genre: "Thriller",
    description: "Phim điện ảnh mới nhất của đạo diễn Hwang Jun với công nghệ thực tế ảo.",
  },
  {
    id: "schedule-3",
    title: "Lost Kingdoms",
    poster: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80",
    episodeLabel: "S1 · E7",
    releaseDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    platform: "Disney+ Hotstar",
    type: "series",
    genre: "Fantasy",
    description: "Hành trình truy tìm cổ vật đưa Mira quay về quê nhà đối mặt với hoàng gia.",
  },
  {
    id: "schedule-4",
    title: "Eternal Horizon",
    poster: "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=400&q=80",
    episodeLabel: "Digital Release",
    releaseDate: new Date(Date.now() + 8 * 86400000).toISOString(),
    platform: "Netflix",
    type: "movie",
    genre: "Drama",
    description: "Bản dựng director's cut với 20 phút chưa từng công bố.",
  },
];



