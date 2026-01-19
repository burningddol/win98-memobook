"use client";

import { useState, useEffect, useRef } from "react";
import { useMemoStore } from "@/store/useMemoStore";
import { MemoDetail } from "@/types/memo";
import Window from "./win98/Window";
import Button from "./win98/Button";
import AdminReplyEditor from "./AdminReplyEditor";
import { MemoIcon } from "./icons";

interface MemoDetailClientProps {
  initialMemo: MemoDetail | null;
}

export default function MemoDetailClient({
  initialMemo,
}: MemoDetailClientProps) {
  const {
    selectedMemo,
    isLoadingDetail,
    detailError,
    selectedMemoId,
    setSelectedMemo,
    setSelectedMemoId,
  } = useMemoStore();
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const hydratedRef = useRef(false);

  // Hydrate from server data on first render (only once)
  useEffect(() => {
    if (!hydratedRef.current && initialMemo) {
      // Only set if store doesn't have this memo yet
      if (!selectedMemo || selectedMemo._id !== initialMemo._id) {
        setSelectedMemo(initialMemo);
        setSelectedMemoId(initialMemo._id);
      }
      hydratedRef.current = true;
    }
  }, [initialMemo, selectedMemo, setSelectedMemo, setSelectedMemoId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Use store data if available, otherwise fall back to initial server data
  const displayMemo = selectedMemo || initialMemo;
  const displayMemoId = selectedMemoId || initialMemo?._id || null;

  // No memo selected and no initial memo
  if (!displayMemoId) {
    return (
      <Window title="Memo Detail" icon={<MemoIcon />} className="h-full">
        <div className="flex items-center justify-center h-full text-win98-gray-dark">
          <div className="text-center">
            <div className="text-4xl mb-2">📭</div>
            <div>Select a memo from the list to view details</div>
          </div>
        </div>
      </Window>
    );
  }

  // Loading
  if (isLoadingDetail) {
    return (
      <Window title="Memo Detail" icon={<MemoIcon />} className="h-full">
        <div className="flex items-center justify-center h-full text-win98-gray-dark">
          <div className="text-center">
            <div className="text-2xl mb-2">⏳</div>
            <div>Loading...</div>
          </div>
        </div>
      </Window>
    );
  }

  // Error
  if (detailError) {
    return (
      <Window title="Memo Detail" icon={<MemoIcon />} className="h-full">
        <div className="flex items-center justify-center h-full text-red-600">
          <div className="text-center">
            <div className="text-2xl mb-2">❌</div>
            <div>{detailError}</div>
          </div>
        </div>
      </Window>
    );
  }

  // No memo data
  if (!displayMemo) {
    return (
      <Window title="Memo Detail" icon={<MemoIcon />} className="h-full">
        <div className="flex items-center justify-center h-full text-win98-gray-dark">
          <div>Memo not found</div>
        </div>
      </Window>
    );
  }

  return (
    <Window
      title={`Memo: ${displayMemo.title || "(No Title)"}`}
      icon={<MemoIcon />}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {/* Memo Header */}
        <div className="win98-sunken p-2 mb-2">
          <div className="flex justify-between items-start mb-1">
            <div className="font-bold">{displayMemo.title || "(No Title)"}</div>
            <div className="text-xs text-win98-gray-dark">
              {formatDate(displayMemo.createdAt)}
            </div>
          </div>
          <div className="text-xs text-win98-gray-dark">
            From: {displayMemo.name || "Anonymous"}
          </div>
        </div>

        {/* Memo Content */}
        <div className="win98-sunken p-2 mb-2 flex-1 overflow-auto min-h-0">
          <div className="whitespace-pre-wrap break-words">
            {displayMemo.content}
          </div>
        </div>

        {/* Admin Reply Section */}
        <div className="pt-2">
          <div className="win98-divider mb-2" />
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-xs flex items-center gap-1">
              <span>💬</span> Admin Reply
            </div>
            <Button
              onClick={() => setShowReplyEditor(!showReplyEditor)}
              size="small"
            >
              {showReplyEditor
                ? "Cancel"
                : displayMemo.reply
                  ? "Edit"
                  : "Add Reply"}
            </Button>
          </div>

          {showReplyEditor ? (
            <AdminReplyEditor
              memoId={displayMemo._id}
              currentReply={displayMemo.reply}
              onClose={() => setShowReplyEditor(false)}
            />
          ) : (
            <div className="win98-sunken p-2 min-h-[60px]">
              {displayMemo.reply ? (
                <div className="whitespace-pre-wrap break-words">
                  {displayMemo.reply}
                </div>
              ) : (
                <div className="text-win98-gray-dark italic">No reply yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}
