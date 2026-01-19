"use client";

import { useState } from "react";
import { useMemoStore } from "@/store/useMemoStore";
import Button from "./win98/Button";
import TextArea from "./win98/TextArea";
import Input from "./win98/Input";

interface AdminReplyEditorProps {
  memoId: string;
  currentReply?: string;
  onClose: () => void;
}

export default function AdminReplyEditor({
  memoId,
  currentReply,
  onClose,
}: AdminReplyEditorProps) {
  const [reply, setReply] = useState(currentReply || "");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateReply = useMemoStore((state) => state.updateReply);
  const fetchMemos = useMemoStore((state) => state.fetchMemos);
  const handleSubmit = async () => {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const success = await updateReply(memoId, reply, password);
    fetchMemos();
    if (success) {
      onClose();
    } else {
      setError("Failed to save reply. Check your password.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="win98-sunken p-2 mt-2">
      <div className="text-xs font-bold mb-2 flex items-center gap-1">
        <span>🔐</span> Admin Reply Editor
      </div>

      <TextArea
        label="Reply:"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={4}
        className="w-full mb-2"
        placeholder="Write your reply here..."
      />

      <Input
        label="Admin Password:"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2"
        placeholder="Enter admin password"
      />

      {error && (
        <div className="text-red-600 text-xs mb-2 bg-white p-1">{error}</div>
      )}

      <div className="flex gap-2 justify-end">
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} variant="primary">
          {isSubmitting ? "Saving..." : "Save Reply"}
        </Button>
      </div>
    </div>
  );
}
