"use client";

import { useEffect } from "react";
import { useMemoStore } from "@/store/useMemoStore";
import Window from "./win98/Window";
import Button from "./win98/Button";

export default function MemoList() {
  const {
    memos,
    isLoadingList,
    listError,
    selectedMemoId,
    setSelectedMemoId,
    fetchMemos,
    fetchMemoDetail,
    openNewMemoModal,
  } = useMemoStore();

  useEffect(() => {
    fetchMemos();
  }, [fetchMemos]);

  const handleMemoClick = (id: string) => {
    // Don't select temp memos
    if (id.startsWith("temp-")) return;
    setSelectedMemoId(id);
    fetchMemoDetail(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const ListIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="text-current"
    >
      <rect x="2" y="2" width="12" height="12" fill="#ffffe1" stroke="#000" />
      <line x1="4" y1="5" x2="12" y2="5" stroke="#000" />
      <line x1="4" y1="8" x2="12" y2="8" stroke="#000" />
      <line x1="4" y1="11" x2="10" y2="11" stroke="#000" />
    </svg>
  );

  return (
    <Window
      title="Memo List"
      icon={<ListIcon />}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex gap-2 mb-2">
          <Button onClick={openNewMemoModal}>New Memo</Button>
          <Button onClick={() => fetchMemos()}>Refresh</Button>
        </div>

        {/* List Container */}
        <div className="win98-sunken flex-1 overflow-auto min-h-0">
          {isLoadingList ? (
            <div className="p-2 text-win98-gray-dark">Loading...</div>
          ) : listError ? (
            <div className="p-2 text-red-600">{listError}</div>
          ) : memos.length === 0 ? (
            <div className="p-2 text-win98-gray-dark">No memos yet. Create one!</div>
          ) : (
            <ul className="divide-y divide-win98-gray">
              {memos.map((memo) => (
                <li
                  key={memo._id}
                  onClick={() => handleMemoClick(memo._id)}
                  className={`px-2 py-1.5 cursor-pointer select-none flex items-center gap-2 ${
                    selectedMemoId === memo._id
                      ? "bg-win98-navy text-white"
                      : "hover:bg-win98-gray-light"
                  } ${memo._id.startsWith("temp-") ? "opacity-50" : ""}`}
                >
                  <span className="text-xs">📝</span>
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-bold text-xs">
                      {memo.title || "(No Title)"}
                    </div>
                    <div
                      className={`text-xs truncate ${
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
