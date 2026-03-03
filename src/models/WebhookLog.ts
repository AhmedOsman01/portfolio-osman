import mongoose, { Schema, Document } from 'mongoose';

export interface IWebhookLogDocument extends Document {
  event: string;
  payload: Record<string, unknown>;
  status: 'success' | 'failed' | 'pending';
  responseCode: number;
}

const WebhookLogSchema = new Schema<IWebhookLogDocument>(
  {
    event: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, default: {} },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
    },
    responseCode: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.WebhookLog || mongoose.model<IWebhookLogDocument>('WebhookLog', WebhookLogSchema);
