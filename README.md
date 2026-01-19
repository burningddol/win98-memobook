<<<<<<< HEAD
# win98-memobook
=======
# Guestbook 98

A Windows 98-themed guestbook/memo application built with Next.js, Tailwind CSS, Zustand, and MongoDB.

## Features

- **Retro Win98 UI**: Classic Windows 98 styling with beveled buttons, window chrome, and that nostalgic gray palette
- **Memo System**: Visitors can submit memos (title optional, content required, name optional)
- **Admin Replies**: Admin can write replies to memos using password authentication
- **Real-time Updates**: Optimistic UI updates when creating memos
- **Responsive Layout**: Side panel for memo list, main area for detail view

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **State Management**: Zustand
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Runtime**: Node.js (required for Mongoose)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://your-connection-string
ADMIN_PASSWORD=your-secret-password
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `ADMIN_PASSWORD`: Your admin password
3. Deploy

**Note**: This app uses Node.js runtime (not Edge) for Mongoose compatibility. Vercel will automatically detect this from the route handlers.

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/memos` | List all memos | No |
| POST | `/api/memos` | Create a memo | No |
| GET | `/api/memos/[id]` | Get memo detail | No |
| PATCH | `/api/memos/[id]/reply` | Update reply | `x-admin-password` header |

## Project Structure

```
src/
├── app/
│   ├── api/memos/          # API route handlers
│   ├── globals.css         # Win98 styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── win98/              # Reusable Win98 UI components
│   ├── GuestbookApp.tsx    # Main app component
│   ├── MemoList.tsx        # Memo list panel
│   ├── MemoDetail.tsx      # Memo detail view
│   ├── NewMemoModal.tsx    # Create memo modal
│   └── AdminReplyEditor.tsx # Admin reply form
├── lib/
│   ├── db.ts               # Mongoose connection helper
│   └── validation.ts       # Zod schemas
├── models/
│   └── Memo.ts             # Mongoose model
├── store/
│   └── useMemoStore.ts     # Zustand store
└── types/
    └── memo.ts             # TypeScript types
```

## License

MIT
>>>>>>> f4965b6 (start claude coding)
