"use client";

import { useState } from "react";
import { useMemoStore } from "@/store/useMemoStore";
import Window from "./win98/Window";
import Button from "./win98/Button";
import AdminReplyEditor from "./AdminReplyEditor";

export default function MemoDetail() {
  const { selectedMemo, isLoadingDetail, detailError, selectedMemoId } =
    useMemoStore();
  const [showReplyEditor, setShowReplyEditor] = useState(false);

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

  const MemoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="1" width="11" height="14" fill="#ffffe1" stroke="#000" />
      <line x1="4" y1="4" x2="11" y2="4" stroke="#808080" />
      <line x1="4" y1="6" x2="11" y2="6" stroke="#808080" />
      <line x1="4" y1="8" x2="11" y2="8" stroke="#808080" />
      <line x1="4" y1="10" x2="9" y2="10" stroke="#808080" />
    </svg>
  );

  // No memo selected
  if (!selectedMemoId) {
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
  if (!selectedMemo) {
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
      title={`Memo: ${selectedMemo.title || "(No Title)"}`}
      icon={<MemoIcon />}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        {/* Memo Header */}
        <div className="win98-sunken p-2 mb-2">
          <div className="flex justify-between items-start mb-1">
            <div className="font-bold">
              {selectedMemo.title || "(No Title)"}
            </div>
            <div className="text-xs text-win98-gray-dark">
              {formatDate(selectedMemo.createdAt)}
            </div>
          </div>
          <div className="text-xs text-win98-gray-dark">
            From: {selectedMemo.name || "Anonymous"}
          </div>
        </div>

        {/* Memo Content */}
        <div className="win98-sunken p-2 mb-2 flex-1 overflow-auto min-h-0">
          <div className="whitespace-pre-wrap break-words">
            {selectedMemo.content}
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
              {showReplyEditor ? "Cancel" : selectedMemo.reply ? "Edit" : "Add Reply"}
            </Button>
          </div>

          {showReplyEditor ? (
            <AdminReplyEditor
              memoId={selectedMemo._id}
              currentReply={selectedMemo.reply}
              onClose={() => setShowReplyEditor(false)}
            />
          ) : (
            <div className="win98-sunken p-2 min-h-[60px]">
              {selectedMemo.reply ? (
                <div className="whitespace-pre-wrap break-words">
                  {selectedMemo.reply}
                </div>
              ) : (
                <div className="text-win98-gray-dark italic">
                  No reply yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}
