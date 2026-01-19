import { Suspense } from "react";
import { getMemosList, getLatestMemo } from "@/lib/server/memos";
import StoreHydration from "@/components/StoreHydration";
import MemoListClient from "@/components/MemoListClient";
import MemoDetailClient from "@/components/MemoDetailClient";
import MemosListSkeleton from "@/components/skeletons/MemosListSkeleton";
import MemoDetailSkeleton from "@/components/skeletons/MemoDetailSkeleton";
import NewMemoModal from "@/components/NewMemoModal";

export const dynamic = "force-dynamic";

async function MemoListWithData() {
  const memos = await getMemosList();
  return <MemoListClient initialMemos={memos} />;
}

async function MemoDetailWithData() {
  const latestMemo = await getLatestMemo();
  return <MemoDetailClient initialMemo={latestMemo} />;
}

export default async function Home() {
  const [initialMemos, initialMemo] = await Promise.all([
    getMemosList(),
    getLatestMemo(),
  ]);

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StoreHydration initialMemos={initialMemos} initialMemo={initialMemo}>
      <div className="min-h-screen p-4 flex flex-col">
        <div className="text-white text-center mb-4">
          <h1 className="text-2xl font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
            📝 junseok&apos;s book 
          </h1>
          <p className="text-sm opacity-80">Leave a memo, get a reply!</p>
        </div>

        <div className="flex-1 flex gap-4 max-w-6xl mx-auto w-full">
          <div className="w-80 flex-shrink-0">
            <Suspense fallback={<MemosListSkeleton />}>
              <MemoListWithData />
            </Suspense>
          </div>
          <div className="flex-1 min-w-0">
            <Suspense fallback={<MemoDetailSkeleton />}>
              <MemoDetailWithData />
            </Suspense>
          </div>
        </div>

        <div className="mt-4 win98-raised p-1 max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between text-xs">
            <div className="win98-sunken px-2 py-0.5 flex items-center gap-1">
              <span>🖥️</span>
              <span>Windows 98 junseok&apos;s book</span>
            </div>
            <div className="win98-sunken px-2 py-0.5">{dateStr}</div>
          </div>
        </div>

        <NewMemoModal />
      </div>
    </StoreHydration>
  );
}
