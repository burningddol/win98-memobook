"use client";

import { useState } from "react";
import { useMemoStore } from "@/store/useMemoStore";
import Modal from "./win98/Modal";
import Button from "./win98/Button";
import Input from "./win98/Input";
import TextArea from "./win98/TextArea";
import { useRouter } from "next/navigation";

export default function NewMemoModal() {
  const { isNewMemoModalOpen, closeNewMemoModal,setSelectedMemoId, fetchMemos, createMemo, isCreating, createError } =
    useMemoStore();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    setValidationError(null);

    if (!content.trim()) {
      setValidationError("Content is required");
      return;
    }

    const success = await createMemo({
      name: name.trim() || undefined,
      title: title.trim() || undefined,
      content: content.trim(),
    });
    
    
    if (success) {
      // Reset form
      setName("");
      setTitle("");
      setContent("");
      router.refresh();  // 캐시 최신화 (isr)
    }
  };

  const handleClose = () => {
    setName("");
    setTitle("");
    setContent("");
    setValidationError(null);
    closeNewMemoModal();
  };

  const NewMemoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="1" width="11" height="14" fill="#ffffe1" stroke="#000" />
      <line x1="6" y1="8" x2="10" y2="8" stroke="#000" strokeWidth="2" />
      <line x1="8" y1="6" x2="8" y2="10" stroke="#000" strokeWidth="2" />
    </svg>
  );

  return (
    <Modal
      title="New Memo"
      isOpen={isNewMemoModalOpen}
      onClose={handleClose}
      icon={<NewMemoIcon />}
    >
      <div className=" space-y-3">
        <Input
          label="Your Name (optional):"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          placeholder="Anonymous"
          maxLength={50}
        />

        <Input
          label="Title (optional):"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
          placeholder="Enter a title"
          maxLength={100}
        />

        <TextArea
          label="Content (required):"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full"
          rows={6}
          placeholder="Write your memo here..."
          maxLength={2000}
        />

        <div className="text-xs text-win98-gray-dark text-right">
          {content.length}/2000
        </div>

        {(validationError || createError) && (
          <div className="bg-white p-2 text-red-600 text-sm win98-sunken">
            ⚠️ {validationError || createError}
          </div>
        )}

        <div className="win98-divider" />

        <div className="flex justify-end gap-2">
          <Button onClick={handleClose} disabled={isCreating}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isCreating} variant="primary">
            {isCreating ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
