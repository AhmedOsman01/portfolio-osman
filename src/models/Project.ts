import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectDocument extends Document {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: 'web-app' | 'automation' | 'ai' | 'saas';
  order: number;
  featured: boolean;
}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    image: { type: String, default: '' },
    techStack: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    category: {
      type: String,
      enum: ['web-app', 'automation', 'ai', 'saas'],
      default: 'web-app',
    },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);
