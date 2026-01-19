import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMemo extends Document {
  name?: string;
  title?: string;
  content: string;
  reply?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemoSchema = new Schema<IMemo>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    reply: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting by createdAt descending
MemoSchema.index({ createdAt: -1 });

// Prevent model recompilation in development
const Memo: Model<IMemo> =
  mongoose.models.Memo || mongoose.model<IMemo>("Memo", MemoSchema);

export default Memo;
