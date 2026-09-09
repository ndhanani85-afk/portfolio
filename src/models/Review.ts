import mongoose, { Schema } from "mongoose";

export interface IReview {
  _id?: string;
  name?: string;
  rating: number;
  category: string;
  subType?: string;
  reviewText: string;
  isAIGenerated: boolean;
  source: string;
  createdAt?: Date;
}

const ReviewSchema: Schema = new Schema({
  _id: { type: String },
  name: { type: String, default: "Client" },
  rating: { type: Number, default: 5 },
  category: { type: String, required: true },
  subType: { type: String, default: "General" },
  reviewText: { type: String, required: true },
  isAIGenerated: { type: Boolean, default: true },
  source: { type: String, default: "site_storage" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
