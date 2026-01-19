"use client";

import { useEffect, useRef } from "react";
import { useMemoStore } from "@/store/useMemoStore";
import { MemoListItem, MemoDetail } from "@/types/memo";

interface StoreHydrationProps {
  initialMemos: MemoListItem[];
  initialMemo: MemoDetail | null;
  children: React.ReactNode;
}

/**
 * Hydrates the Zustand store with server-fetched data on mount.
 * This ensures the store is populated before any client components render,
 * preventing the flash of empty state and duplicate fetches.
 */
export default function StoreHydration({
  initialMemos,
  initialMemo,
  children,
}: StoreHydrationProps) {
  const hydrate = useMemoStore((state) => state.hydrate);
  const hydrated = useRef(false);

  // Hydrate synchronously on first render (before useEffect)
  // This avoids a flash of empty state
  if (!hydrated.current) {
    hydrate(initialMemos, initialMemo);
    hydrated.current = true;
  }

  return <>{children}</>;
}
