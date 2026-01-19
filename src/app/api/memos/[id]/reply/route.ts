import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Memo from "@/models/Memo";
import { replySchema } from "@/lib/validation";
import mongoose from "mongoose";

// Force Node.js runtime for Mongoose
export const runtime = "nodejs";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// PATCH /api/memos/[id]/reply - Update memo reply (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin password
    const password = request.headers.get("x-admin-password");

    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Admin password not configured" },
        { status: 500 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid memo ID" }, { status: 400 });
    }

    await dbConnect();

    const body = await request.json();
    const result = replySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const memo = await Memo.findByIdAndUpdate(
      id,
      { reply: result.data.reply },
      { new: true }
    ).lean();

    if (!memo) {
      return NextResponse.json({ error: "Memo not found" }, { status: 404 });
    }

    return NextResponse.json(memo);
  } catch (error) {
    console.error("Error updating reply:", error);
    return NextResponse.json(
      { error: "Failed to update reply" },
      { status: 500 }
    );
  }
}
