import mongoose, { Schema, Document } from 'mongoose';

export interface IPostDocument extends Document {
  title: { ar: string; en: string };
  slug: string;
  content: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  tags: string[];
  category: string;
  coverImage: string;
  author: string;
  publishedAt: Date;
  readingTime: number;
  seoTitle: { ar: string; en: string };
  seoDescription: { ar: string; en: string };
  views: number;
  status: 'draft' | 'published';
}

const PostSchema = new Schema<IPostDocument>(
  {
    title: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    content: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    excerpt: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    tags: [{ type: String }],
    category: { type: String, required: true },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'Admin' },
    publishedAt: { type: Date, default: Date.now },
    readingTime: { type: Number, default: 0 },
    seoTitle: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    seoDescription: {
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    views: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

PostSchema.index({ slug: 1 });
PostSchema.index({ status: 1, publishedAt: -1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ category: 1 });

export default mongoose.models.Post || mongoose.model<IPostDocument>('Post', PostSchema);
