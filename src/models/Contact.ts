import mongoose, { Schema, Document } from 'mongoose';

export interface IContactDocument extends Document {
  name: string;
  email: string;
  message: string;
  serviceType: string;
  budgetRange: string;
  isRead: boolean;
}

const ContactSchema = new Schema<IContactDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    serviceType: { type: String, default: '' },
    budgetRange: { type: String, default: '' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContactDocument>('Contact', ContactSchema);
