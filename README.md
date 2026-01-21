# junseok's book 98

A Windows 98-themed guestbook/memo application built with Next.js, Tailwind CSS, Zustand, and MongoDB.

Development Timeline: 2026.01.19 - 2026.01.20

## Features

- **Retro Win98 UI**: Classic Windows 98 styling with beveled buttons, window chrome, and that nostalgic gray palette
- **Memo System**: Visitors can submit memos (title optional, content required, name optional)
- **Admin Replies**: Admin can write replies to memos using password authentication

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **State Management**: Zustand
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Runtime**: Node.js (required for Mongoose)


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

## AI Tools Utilized

Claude Code: Logic implementation and refactoring
Gpt: create proper prompt etc...
