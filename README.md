# TuanMovies – Frontend playground

Web app mô phỏng một dịch vụ xem phim hiện đại, build bằng React + Vite + TypeScript + Tailwind + shadcn/ui. Điểm nhấn hiện tại:

- Trang chủ đầy đủ hero slider, quick filters, trending, top ranking.
- Continue Watching + Watchlist với khả năng đồng bộ giả lập đa thiết bị.
- Trang chi tiết phim có tabs trailer, episodes, bình luận nội bộ.
- Lịch phát hành (`/schedule`) với calendar, filter và reminder lưu localStorage.
- News Hub (`/news`, `/news/:slug`) đọc từ data JSON – mock CMS mini.

## Getting started

```bash
git clone <repo-url>
cd WebPhim
npm install
npm run dev
```

App chạy ở `http://localhost:5173/`.

## Scripts

| Command           | Mô tả                             |
|-------------------|-----------------------------------|
| `npm run dev`     | Dev server + HMR                  |
| `npm run build`   | Build production                  |
| `npm run preview` | Serve bản build                   |
| `npm run lint`    | ESLint toàn bộ project            |

## Cấu trúc chính

```
src/
├─ components/
│  ├─ context/   WatchProgressProvider, watchlist
│  ├─ data/      mock dataset: movies, schedule, news
│  ├─ hooks/     custom hooks (use-watch-progress, use-comments,…)
│  ├─ pages/     route components: Home, Schedule, News, …
│  └─ ui/        shadcn/ui primitives
└─ lib/
```

Router nằm trong `src/components/App.tsx`. Thêm page mới = tạo component trong `pages/`, add route, rồi link ở `Header.tsx`.

## Backend kế hoạch

Hiện mọi dữ liệu (watchlist, comments, news, schedule) đang nằm ở localStorage / mock JSON để demo. Khi cần backend thật:

- NestJS + PostgreSQL/Supabase để đồng bộ watchlist/progress/comment.
- JWT auth + refresh token để sau này mở login.
- Có thể thêm Redis (queue/cache) nếu muốn realtime sync.

## Deploy

`npm run build` → deploy thư mục `dist/` lên Vercel/Netlify/Cloudflare Pages hoặc bất kỳ static host nào. Hết.

