import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Memo from "@/models/Memo";
import { createMemoSchema } from "@/lib/validation";

// Force Node.js runtime for Mongoose
export const runtime = "nodejs";

// GET /api/memos - List all memos
export async function GET() {
  try {
    await dbConnect();

    const memos = await Memo.find({})
      .select("_id name title content reply updatedAt createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(memos);
  } catch (error) {
    console.error("Error fetching memos:", error);
    return NextResponse.json(
      { error: "Failed to fetch memos" },
      { status: 500 }
    );
  }
}

// POST /api/memos - Create a new memo
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const result = createMemoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const memo = await Memo.create(result.data);

    return NextResponse.json(
      {
        _id: memo._id,
        name: memo.name,
        title: memo.title,
        content: memo.content,
        createdAt: memo.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating memo:", error);
    return NextResponse.json(
      { error: "Failed to create memo" },
      { status: 500 }
    );
  }
}
