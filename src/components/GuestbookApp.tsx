"use client";

import MemoList from "./MemoList";
import MemoDetail from "./MemoDetail";
import NewMemoModal from "./NewMemoModal";

export default function GuestbookApp() {
  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Desktop Title Bar */}
      <div className="text-white text-center mb-4">
        <h1 className="text-2xl font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
          📝 junseok's book 98
        </h1>
        <p className="text-sm opacity-80">Leave a memo, get a reply!</p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-4 max-w-6xl mx-auto w-full">
        {/* Memo List Panel - Left Side */}
        <div className="w-80 flex-shrink-0">
          <MemoList />
        </div>

        {/* Memo Detail Panel - Main Area */}
        <div className="flex-1 min-w-0">
          <MemoDetail />
        </div>
      </div>

      {/* Footer - Taskbar Style */}
      <div className="mt-4 win98-raised p-1 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between text-xs">
          <div className="win98-sunken px-2 py-0.5 flex items-center gap-1">
            <span>🖥️</span>
            <span>Windows 98 junseok's book</span>
          </div>
          <div className="win98-sunken px-2 py-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* New Memo Modal */}
      <NewMemoModal />
    </div>
  );
}
