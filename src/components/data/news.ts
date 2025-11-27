export type NewsArticle = {
  id: number;
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  readingTime: string;
  excerpt: string;
  content: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "new-movie-releases",
    title: "New Movie Releases This Week",
    date: "2025-01-15",
    author: "Tuấn Trần",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80",
    category: "News",
    tags: ["Releases", "Cinema", "Streaming"],
    readingTime: "6 phút",
    excerpt:
      "Tổng hợp 5 tựa phim đáng chú ý nhất trong tuần cùng suất chiếu đặc biệt và ưu đãi tại Tuấn Movies.",
    content: [
      "Tuần này, những bộ phim hành động - khoa học viễn tưởng tiếp tục thống lĩnh phòng vé. 'Guardians of Tomorrow' chính thức mở suất chiếu IMAX với phiên bản 4DX, hứa hẹn những phân cảnh chiến đấu mãn nhãn.",
      "Song song đó, 'Neon Nights' bản Director's Cut lên sóng độc quyền trên Tuấn Movies Premium với 12 phút cảnh quay mới. Người xem có thể đặt lịch xem trước và đồng bộ watchlist sang các thiết bị khác.",
      "Đối với khán giả thích phim tâm lý, 'City of Echoes' ra mắt season 2 vào thứ Sáu với phần mở đầu gây sốc, tiếp nối cliffhanger ở mùa trước.",
    ],
  },
  {
    id: 2,
    slug: "top-10-movies-january",
    title: "Top 10 Movies of the Month",
    date: "2025-01-10",
    author: "Bảo Nguyên",
    image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200&q=80",
    category: "Ranking",
    tags: ["Top list", "Review"],
    readingTime: "8 phút",
    excerpt: "Danh sách 10 phim được người dùng Tuấn Movies bình chọn nhiều nhất trong tháng 1.",
    content: [
      "Bảng xếp hạng tháng này mang đến sự cân bằng thú vị giữa bom tấn hành động và phim độc lập. 'The Quantum Divide' giữ vị trí số 1 nhờ số lượt xem cao cùng điểm đánh giá trung bình 9.1/10.",
      "Một bất ngờ lớn là 'Winter's Tale' - bộ phim lãng mạn phát hành từ 2023 - bất ngờ quay lại top 5 vì chiến dịch kỷ niệm Tết Dương lịch.",
      "Những bộ phim trong danh sách đều đã có mặt trên Tuấn Movies, kèm watchlist và lịch chiếu các suất đặc biệt để fan tiện theo dõi.",
    ],
  },
  {
    id: 3,
    slug: "upcoming-2025-must-watch",
    title: "Upcoming 2025 Movies You Can't Miss",
    date: "2025-01-05",
    author: "Mai Anh",
    image: "https://images.unsplash.com/photo-1574267432644-f610a0aed995?w=1200&q=80",
    category: "Preview",
    tags: ["Coming soon", "Preview"],
    readingTime: "7 phút",
    excerpt: "Những dự án lớn nhất năm 2025 vừa ấn định lịch phát hành, từ Marvel đến các đạo diễn độc lập.",
    content: [
      "Năm 2025 chứng kiến sự trở lại của nhiều thương hiệu đình đám. 'Guardians of Tomorrow' mở màn cho Phase 6 của Vũ trụ TMT với tuyến nhân vật hoàn toàn mới.",
      "Ở mảng phim châu Á, 'Ký Ức Lưu Lạc' của Victor Vũ chính thức công bố phát hành toàn cầu vào tháng 9 nhờ hợp tác với Netflix. Dự án này được kỳ vọng tạo cú hích mới cho điện ảnh Việt.",
      "Cuối cùng là hàng loạt series độc quyền như 'Chronicles of Earth' mùa 4 hay 'Lost Kingdoms' mùa 2 đều đã có lịch chiếu trên trang Lịch Phát Hành mới.",
    ],
  },
];



