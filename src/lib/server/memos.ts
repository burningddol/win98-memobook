import "server-only";
import dbConnect from "@/lib/db";
import Memo from "@/models/Memo";
import { MemoListItem, MemoDetail } from "@/types/memo";

/**
 * Fetches all memos for the list view (server-only).
 * Returns only the fields needed for the list.
 */
export async function getMemosList(): Promise<MemoListItem[]> {
  await dbConnect();

  const memos = await Memo.find({})
    .select("_id name title createdAt")
    .sort({ createdAt: -1 })
    .lean();

  // Convert Mongoose documents to plain objects with string _id
  return memos.map((memo) => ({
    _id: memo._id.toString(),
    name: memo.name,
    title: memo.title,
    createdAt: memo.createdAt.toISOString(),
  }));
}

/**
 * Fetches a single memo by ID (server-only).
 * Returns the full memo detail including content and reply.
 */
export async function getMemoById(id: string): Promise<MemoDetail | null> {
  await dbConnect();

  // Validate ObjectId format
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return null;
  }

  const memo = await Memo.findById(id).lean();

  if (!memo) {
    return null;
  }

  return {
    _id: memo._id.toString(),
    name: memo.name,
    title: memo.title,
    content: memo.content,
    reply: memo.reply,
    createdAt: memo.createdAt.toISOString(),
    updatedAt: memo.updatedAt.toISOString(),
  };
}

/**
 * Gets the latest memo (first one by createdAt descending).
 * Used for pre-rendering the initial detail view.
 */
export async function getLatestMemo(): Promise<MemoDetail | null> {
  await dbConnect();

  const memo = await Memo.findOne({}).sort({ createdAt: -1 }).lean();

  if (!memo) {
    return null;
  }

  return {
    _id: memo._id.toString(),
    name: memo.name,
    title: memo.title,
    content: memo.content,
    reply: memo.reply,
    createdAt: memo.createdAt.toISOString(),
    updatedAt: memo.updatedAt.toISOString(),
  };
}
