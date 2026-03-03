export interface LocalizedString {
  ar: string;
  en: string;
}

export interface IPost {
  _id: string;
  title: LocalizedString;
  slug: string;
  content: LocalizedString;
  excerpt: LocalizedString;
  tags: string[];
  category: string;
  coverImage: string;
  author: string;
  publishedAt: Date;
  readingTime: number;
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  views: number;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: 'web-app' | 'automation' | 'ai' | 'saas';
  order: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  message: string;
  serviceType: string;
  budgetRange: string;
  isRead: boolean;
  createdAt: Date;
}

export interface INewsletter {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: Date;
}

export interface IWebhookLog {
  _id: string;
  event: string;
  payload: Record<string, unknown>;
  status: 'success' | 'failed' | 'pending';
  responseCode: number;
  createdAt: Date;
}
