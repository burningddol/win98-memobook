import { Suspense } from "react";
import { getMemosList, getLatestMemo } from "@/lib/server/memos";
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
  

  return (
    
      <div className="min-h-screen p-4 flex flex-col">
        <div className="text-black text-center mb-4">
          <h1 className="text-2xl font-bold drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
            📝 junseok&apos;s book 
          </h1>
          <p className="text-sm opacity-80">Leave a memo, get a reply!</p>
        </div>

        <div className="flex-1 flex gap-4  w-full">
          <div className="w-80  flex-shrink-0">
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

      

        <NewMemoModal />
      </div>
  
  );
}
