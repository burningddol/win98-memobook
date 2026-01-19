import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Memo from "@/models/Memo";
import mongoose from "mongoose";

// Force Node.js runtime for Mongoose
export const runtime = "nodejs";

// GET /api/memos/[id] - Get memo detail
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid memo ID" }, { status: 400 });
    }

    await dbConnect();

    const memo = await Memo.findById(id).lean();

    if (!memo) {
      return NextResponse.json({ error: "Memo not found" }, { status: 404 });
    }

    return NextResponse.json(memo);
  } catch (error) {
    console.error("Error fetching memo:", error);
    return NextResponse.json(
      { error: "Failed to fetch memo" },
      { status: 500 }
    );
  }
}
