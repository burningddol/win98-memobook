import { create } from "zustand";
import { MemoListItem, MemoDetail } from "@/types/memo";

interface MemoState {
  // List state
  memos: MemoListItem[];
  isLoadingList: boolean;
  listError: string | null;

  // Selected memo state
  selectedMemoId: string | null;
  selectedMemo: MemoDetail | null;
  isLoadingDetail: boolean;
  detailError: string | null;

  // Modal state
  isNewMemoModalOpen: boolean;
  isCreating: boolean;
  createError: string | null;

  // Actions
  setMemos: (memos: MemoListItem[]) => void;
  setSelectedMemoId: (id: string | null) => void;
  setSelectedMemo: (memo: MemoDetail | null) => void;
  openNewMemoModal: () => void;
  closeNewMemoModal: () => void;

  // Async actions
  fetchMemos: () => Promise<void>;
  fetchMemoDetail: (id: string) => Promise<void>;
  createMemo: (data: {
    name?: string;
    title?: string;
    content: string;
  }) => Promise<boolean>;
  updateReply: (
    id: string,
    reply: string,
    password: string
  ) => Promise<boolean>;
}

export const useMemoStore = create<MemoState>((set, get) => ({
  // Initial state
  memos: [],
  isLoadingList: false,
  listError: null,

  selectedMemoId: null,
  selectedMemo: null,
  isLoadingDetail: false,
  detailError: null,

  isNewMemoModalOpen: false,
  isCreating: false,
  createError: null,

  // Sync actions
  setMemos: (memos) => set({ memos }),
  setSelectedMemoId: (id) => set({ selectedMemoId: id }),
  setSelectedMemo: (memo) => set({ selectedMemo: memo }),
  openNewMemoModal: () => set({ isNewMemoModalOpen: true, createError: null }),
  closeNewMemoModal: () => set({ isNewMemoModalOpen: false, createError: null }),

  // Async actions
  fetchMemos: async () => {
    set({ isLoadingList: true, listError: null });
    try {
      const res = await fetch("/api/memos");
      if (!res.ok) throw new Error("Failed to fetch memos");
      const memos = await res.json();
      set({ memos, isLoadingList: false });
    } catch (error) {
      set({
        listError: error instanceof Error ? error.message : "Unknown error",
        isLoadingList: false,
      });
    }
  },

  fetchMemoDetail: async (id) => {
    set({ isLoadingDetail: true, detailError: null });
    try {
      const res = await fetch(`/api/memos/${id}`);
      if (!res.ok) throw new Error("Failed to fetch memo");
      const memo = await res.json();
      set({ selectedMemo: memo, isLoadingDetail: false });
    } catch (error) {
      set({
        detailError: error instanceof Error ? error.message : "Unknown error",
        isLoadingDetail: false,
      });
    }
  },

  createMemo: async (data) => {
    set({ isCreating: true, createError: null });

    // Optimistic update - add temporary memo to list
    const tempId = `temp-${Date.now()}`;
    const tempMemo: MemoListItem = {
      _id: tempId,
      name: data.name,
      title: data.title,
      createdAt: new Date().toISOString(),
    };
    const previousMemos = get().memos;
    set({ memos: [tempMemo, ...previousMemos] });

    try {
      const res = await fetch("/api/memos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create memo");
      }

      const newMemo = await res.json();

      // Replace temp memo with real one
      set({
        memos: [newMemo, ...previousMemos],
        isCreating: false,
        isNewMemoModalOpen: false,
      });

      return true;
    } catch (error) {
      // Rollback on error
      set({
        memos: previousMemos,
        createError: error instanceof Error ? error.message : "Unknown error",
        isCreating: false,
      });
      return false;
    }
  },

  updateReply: async (id, reply, password) => {
    try {
      const res = await fetch(`/api/memos/${id}/reply`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ reply }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update reply");
      }

      const updatedMemo = await res.json();
      set({ selectedMemo: updatedMemo });
      return true;
    } catch (error) {
      console.error("Error updating reply:", error);
      return false;
    }
  },
}));
