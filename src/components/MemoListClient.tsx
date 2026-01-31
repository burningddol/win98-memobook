"use client";

import { useEffect, useRef } from "react";
import { useMemoStore } from "@/store/useMemoStore";
import { MemoListItem } from "@/types/memo";
import Window from "./win98/Window";
import Button from "./win98/Button";
import { ListIcon } from "./icons";

interface MemoListClientProps {
  initialMemos: MemoListItem[];
}

export default function MemoListClient({ initialMemos }: MemoListClientProps) {
  const {
    memos,
    isLoadingList,
    listError,
    selectedMemoId,
    setSelectedMemoId,
    setMemos,
    fetchMemos,
    setMemoDetail,
    openNewMemoModal,
  } = useMemoStore();

  const hydratedRef = useRef(false);

  // Hydrate memos from server data on first render (only once)
  useEffect(() => {
    if (!hydratedRef.current && initialMemos.length > 0) {
      // Only set if store is empty (not yet hydrated by StoreHydration)
      if (memos.length === 0) {
        setMemos(initialMemos);
      }
      hydratedRef.current = true;
    }
  }, [initialMemos, memos.length, setMemos]);

  const handleMemoClick = (id: string) => {
    // Don't select temp memos
    if (id.startsWith("temp-")) return;
    setSelectedMemoId(id);
    setMemoDetail(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Use server data on initial render, then switch to store
  const displayMemos = memos.length > 0 ? memos : initialMemos;

  return (
    <Window title="Memo List" icon={<ListIcon />} className="h-full ">
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex gap-2 mb-2">
          <Button onClick={openNewMemoModal}>New Memo</Button>
          <Button onClick={() => fetchMemos()}>Refresh</Button>
        </div>

        {/* List Container */}
        <div className="win98-sunken flex-1 overflow-y-auto min-h-0 max-h-[83.5vh]">
          {isLoadingList ? (
            <div className="p-2 text-win98-gray-dark">Loading...</div>
          ) : listError ? (
            <div className="p-2 text-red-600">{listError}</div>
          ) : displayMemos.length === 0 ? (
            <div className="p-2 text-win98-gray-dark">
              No memos yet. Create one!
            </div>
          ) : (
            <ul className="divide-y divide-win98-gray">
              {displayMemos.map((memo) => (
                <li
                  key={memo._id}
                  onClick={() => handleMemoClick(memo._id)}
                  className={`px-2 py-1.5 cursor-pointer select-none flex items-center gap-2 ${
                    selectedMemoId === memo._id
                      ? "bg-win98-navy text-white"
                      : "hover:bg-win98-gray-light"
                  } ${memo._id.startsWith("temp-") ? "opacity-50" : ""}`}
                >
                  <span className="text-xl">📝</span>
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-bold text-2xl">
                      {memo.title || "(No Title)"}
                    </div>
                    <div
                      className={`text-xl truncate ${
                        selectedMemoId === memo._id
                          ? "text-win98-gray-light"
                          : "text-win98-gray-dark"
                      }`}
                    >
                      {memo.name || "Anonymous"} · {formatDate(memo.createdAt)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Window>
  );
}
