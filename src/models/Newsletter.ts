import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletterDocument extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
}

const NewsletterSchema = new Schema<INewsletterDocument>({
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Newsletter || mongoose.model<INewsletterDocument>('Newsletter', NewsletterSchema);
