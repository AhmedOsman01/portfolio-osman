import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// ─── Schemas (inline to avoid ESM/TS import issues) ───

const LocalizedString = { ar: { type: String, required: true }, en: { type: String, required: true } };

const PostSchema = new mongoose.Schema({
  title: LocalizedString,
  slug: { type: String, required: true, unique: true },
  content: LocalizedString,
  excerpt: LocalizedString,
  tags: [String],
  category: String,
  coverImage: { type: String, default: '' },
  author: { type: String, default: 'Admin' },
  publishedAt: { type: Date, default: Date.now },
  readingTime: { type: Number, default: 0 },
  seoTitle: { ar: String, en: String },
  seoDescription: { ar: String, en: String },
  views: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: LocalizedString,
  description: LocalizedString,
  image: { type: String, default: '' },
  techStack: [String],
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  category: { type: String, enum: ['web-app', 'automation', 'ai', 'saas'], default: 'web-app' },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  serviceType: { type: String, default: '' },
  budgetRange: { type: String, default: '' },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now },
});

// ─── Sample Data ───

const posts = [
  {
    title: {
      ar: 'كيف تبني تطبيق ويب حديث باستخدام Next.js و MongoDB',
      en: 'How to Build a Modern Web App with Next.js and MongoDB',
    },
    slug: 'build-modern-web-app-nextjs-mongodb',
    content: {
      ar: `في هذا المقال سنتعلم كيفية بناء تطبيق ويب متكامل باستخدام Next.js و MongoDB.\n\nNext.js هو إطار عمل React قوي يوفر العديد من الميزات مثل Server Side Rendering و Static Site Generation.\n\nMongoDB هي قاعدة بيانات NoSQL مرنة وقابلة للتوسع.\n\n## الخطوة الأولى: إعداد المشروع\n\nقم بإنشاء مشروع Next.js جديد باستخدام:\n\nnpx create-next-app@latest my-app --typescript\n\n## الخطوة الثانية: إعداد MongoDB\n\nقم بتثبيت Mongoose:\n\nnpm install mongoose\n\n## الخطوة الثالثة: إنشاء نماذج البيانات\n\nقم بإنشاء نموذج بيانات للمستخدمين والمقالات.\n\n## الخلاصة\n\nNext.js مع MongoDB مزيج قوي لبناء تطبيقات ويب حديثة وسريعة.`,
      en: `In this article, we'll learn how to build a full-stack web application using Next.js and MongoDB.\n\nNext.js is a powerful React framework that provides many features like Server Side Rendering and Static Site Generation.\n\nMongoDB is a flexible and scalable NoSQL database.\n\n## Step 1: Project Setup\n\nCreate a new Next.js project using:\n\nnpx create-next-app@latest my-app --typescript\n\n## Step 2: MongoDB Setup\n\nInstall Mongoose:\n\nnpm install mongoose\n\n## Step 3: Create Data Models\n\nCreate data models for users and articles.\n\n## Conclusion\n\nNext.js with MongoDB is a powerful combination for building modern, fast web applications.`,
    },
    excerpt: {
      ar: 'تعلم كيفية بناء تطبيق ويب متكامل باستخدام Next.js و MongoDB مع أفضل الممارسات',
      en: 'Learn how to build a full-stack web application using Next.js and MongoDB with best practices',
    },
    tags: ['Next.js', 'MongoDB', 'TypeScript', 'Web Development'],
    category: 'development',
    coverImage: '/blog/nextjs_mongo.png',
    readingTime: 8,
    views: 342,
    status: 'published',
    publishedAt: new Date('2025-12-15'),
    seoTitle: { ar: 'بناء تطبيق ويب حديث - Next.js و MongoDB', en: 'Build a Modern Web App - Next.js & MongoDB' },
    seoDescription: { ar: 'دليل شامل لبناء تطبيق ويب باستخدام Next.js و MongoDB', en: 'Complete guide to building a web app with Next.js and MongoDB' },
  },
  {
    title: {
      ar: 'أتمتة سير العمل باستخدام n8n: دليل شامل للمبتدئين',
      en: 'Workflow Automation with n8n: A Comprehensive Beginner Guide',
    },
    slug: 'workflow-automation-n8n-guide',
    content: {
      ar: `n8n هي أداة أتمتة مفتوحة المصدر تتيح لك ربط التطبيقات والخدمات المختلفة.\n\n## ما هو n8n؟\n\nn8n هي منصة أتمتة سير العمل تتيح لك إنشاء سيناريوهات أتمتة معقدة بدون كتابة كود.\n\n## لماذا n8n؟\n\n- مفتوح المصدر\n- يمكن استضافته ذاتياً\n- يدعم أكثر من 200 تطبيق\n- واجهة سحب وإفلات سهلة\n\n## كيف تبدأ\n\n1. قم بتثبيت n8n محلياً\n2. أنشئ أول سيناريو أتمتة\n3. اربط التطبيقات المختلفة\n\n## أمثلة عملية\n\n- أتمتة إرسال البريد الإلكتروني\n- مزامنة البيانات بين الأنظمة\n- إشعارات تلقائية عبر تلغرام`,
      en: `n8n is an open-source automation tool that allows you to connect different applications and services.\n\n## What is n8n?\n\nn8n is a workflow automation platform that lets you create complex automation scenarios without writing code.\n\n## Why n8n?\n\n- Open source\n- Self-hostable\n- Supports 200+ applications\n- Easy drag-and-drop interface\n\n## Getting Started\n\n1. Install n8n locally\n2. Create your first automation workflow\n3. Connect different applications\n\n## Practical Examples\n\n- Automate email sending\n- Data synchronization between systems\n- Automatic Telegram notifications`,
    },
    excerpt: {
      ar: 'دليل شامل لاستخدام n8n في أتمتة سير العمل وربط التطبيقات',
      en: 'A comprehensive guide to using n8n for workflow automation and connecting applications',
    },
    tags: ['n8n', 'Automation', 'Workflow', 'No-Code'],
    category: 'automation',
    coverImage: '/blog/n8n_automation.png',
    readingTime: 12,
    views: 567,
    status: 'published',
    publishedAt: new Date('2026-01-10'),
    seoTitle: { ar: 'أتمتة سير العمل مع n8n', en: 'Workflow Automation with n8n' },
    seoDescription: { ar: 'تعلم أتمتة المهام باستخدام n8n', en: 'Learn task automation using n8n' },
  },
  {
    title: {
      ar: 'دمج الذكاء الاصطناعي في تطبيقات الويب مع OpenAI API',
      en: 'Integrating AI into Web Applications with OpenAI API',
    },
    slug: 'integrating-ai-openai-api-web-apps',
    content: {
      ar: `الذكاء الاصطناعي أصبح جزءاً أساسياً من تطبيقات الويب الحديثة.\n\n## مقدمة عن OpenAI API\n\nOpenAI توفر واجهة برمجة تطبيقات قوية للوصول إلى نماذج الذكاء الاصطناعي.\n\n## كيفية الدمج\n\n1. احصل على مفتاح API\n2. قم بتثبيت مكتبة OpenAI\n3. أنشئ النقاط النهائية\n\n## حالات الاستخدام\n\n- روبوتات المحادثة الذكية\n- توليد المحتوى\n- تحليل المشاعر\n- ترجمة النصوص\n- تلخيص المقالات`,
      en: `Artificial Intelligence has become an essential part of modern web applications.\n\n## Introduction to OpenAI API\n\nOpenAI provides a powerful API for accessing AI models.\n\n## How to Integrate\n\n1. Get an API key\n2. Install the OpenAI library\n3. Create API endpoints\n\n## Use Cases\n\n- Smart chatbots\n- Content generation\n- Sentiment analysis\n- Text translation\n- Article summarization`,
    },
    excerpt: {
      ar: 'كيفية دمج الذكاء الاصطناعي في تطبيقات الويب باستخدام OpenAI API',
      en: 'How to integrate AI into web applications using the OpenAI API',
    },
    tags: ['AI', 'OpenAI', 'Machine Learning', 'API'],
    category: 'ai',
    coverImage: '/blog/openai_ai.png',
    readingTime: 10,
    views: 891,
    status: 'published',
    publishedAt: new Date('2026-02-01'),
    seoTitle: { ar: 'دمج الذكاء الاصطناعي مع OpenAI', en: 'AI Integration with OpenAI' },
    seoDescription: { ar: 'دليل دمج OpenAI API في تطبيقات الويب', en: 'Guide to integrating OpenAI API in web apps' },
  },
  {
    title: {
      ar: '10 نصائح لتحسين أداء تطبيقات Next.js',
      en: '10 Tips to Optimize Next.js Application Performance',
    },
    slug: '10-tips-optimize-nextjs-performance',
    content: {
      ar: `أداء التطبيق عامل حاسم في نجاح أي مشروع ويب.\n\n## 1. استخدم Server Components\n\nقلل من JavaScript المرسل للمتصفح.\n\n## 2. تحسين الصور\n\nاستخدم next/image للتحسين التلقائي.\n\n## 3. Code Splitting\n\nقسّم الكود لتحميل ما يلزم فقط.\n\n## 4. التخزين المؤقت\n\nاستفد من ISR و Static Generation.\n\n## 5. تحسين الخطوط\n\nاستخدم next/font لتحميل الخطوط.\n\n## 6. تقليل حجم الحزم\n\nحلل واحذف المكتبات غير المستخدمة.\n\n## 7. استخدم Edge Runtime\n\nللوظائف البسيطة والسريعة.\n\n## 8. تحسين قاعدة البيانات\n\nأضف الفهارس المناسبة.\n\n## 9. CDN\n\nاستخدم شبكة توصيل المحتوى.\n\n## 10. المراقبة\n\nراقب الأداء باستمرار.`,
      en: `Application performance is a critical factor in any web project's success.\n\n## 1. Use Server Components\n\nReduce JavaScript sent to the browser.\n\n## 2. Optimize Images\n\nUse next/image for automatic optimization.\n\n## 3. Code Splitting\n\nSplit code to load only what's needed.\n\n## 4. Caching\n\nLeverage ISR and Static Generation.\n\n## 5. Font Optimization\n\nUse next/font for font loading.\n\n## 6. Reduce Bundle Size\n\nAnalyze and remove unused libraries.\n\n## 7. Use Edge Runtime\n\nFor simple and fast functions.\n\n## 8. Database Optimization\n\nAdd appropriate indexes.\n\n## 9. CDN\n\nUse a Content Delivery Network.\n\n## 10. Monitoring\n\nContinuously monitor performance.`,
    },
    excerpt: {
      ar: 'نصائح عملية لتحسين أداء تطبيقات Next.js وتسريع التحميل',
      en: 'Practical tips to optimize Next.js application performance and speed up loading',
    },
    tags: ['Next.js', 'Performance', 'Optimization', 'Tips'],
    category: 'tips',
    coverImage: '/blog/nextjs_perf.png',
    readingTime: 6,
    views: 1203,
    status: 'published',
    publishedAt: new Date('2026-02-20'),
    seoTitle: { ar: 'تحسين أداء Next.js', en: 'Optimize Next.js Performance' },
    seoDescription: { ar: '10 نصائح لتحسين أداء Next.js', en: '10 tips to optimize Next.js performance' },
  },
  {
    title: {
      ar: 'بناء نظام إشعارات متكامل مع Webhooks و تلغرام',
      en: 'Building a Complete Notification System with Webhooks and Telegram',
    },
    slug: 'notification-system-webhooks-telegram',
    content: {
      ar: `سنتعلم كيفية بناء نظام إشعارات يربط بين تطبيقك وتلغرام.\n\n## المتطلبات\n\n- Node.js\n- حساب بوت تلغرام\n- n8n أو خادم Webhooks\n\n## الخطوات\n\n1. إنشاء بوت تلغرام\n2. إعداد Webhook endpoint\n3. ربط الأحداث بالإشعارات\n4. تخصيص الرسائل\n\n## النتيجة\n\nسف تحصل على نظام إشعارات فوري عبر تلغرام.`,
      en: `We'll learn how to build a notification system that connects your app with Telegram.\n\n## Requirements\n\n- Node.js\n- Telegram bot account\n- n8n or Webhooks server\n\n## Steps\n\n1. Create a Telegram bot\n2. Set up a Webhook endpoint\n3. Connect events to notifications\n4. Customize messages\n\n## Result\n\nYou'll have an instant notification system via Telegram.`,
    },
    excerpt: {
      ar: 'تعلم بناء نظام إشعارات فوري باستخدام Webhooks وتلغرام',
      en: 'Learn to build a real-time notification system using Webhooks and Telegram',
    },
    tags: ['Webhooks', 'Telegram', 'Notifications', 'n8n'],
    category: 'tutorials',
    coverImage: '/blog/webhooks_telegram.png',
    readingTime: 7,
    views: 456,
    status: 'published',
    publishedAt: new Date('2026-03-01'),
    seoTitle: { ar: 'نظام إشعارات مع Webhooks وتلغرام', en: 'Notification System with Webhooks & Telegram' },
    seoDescription: { ar: 'بناء نظام إشعارات متكامل', en: 'Build a complete notification system' },
  },
  {
    title: {
      ar: 'مستقبل تطوير الويب: اتجاهات 2026',
      en: 'The Future of Web Development: 2026 Trends',
    },
    slug: 'future-web-development-2026-trends',
    content: {
      ar: `ما هي أحدث الاتجاهات في تطوير الويب لعام 2026؟\n\n## 1. AI-First Development\n\nالذكاء الاصطناعي في كل مكان.\n\n## 2. Edge Computing\n\nالحوسبة على الحافة أصبحت المعيار.\n\n## 3. Web Assembly\n\nأداء أسرع للتطبيقات.\n\n## 4. Server Components\n\nتقليل JavaScript في المتصفح.\n\n## 5. الأتمتة الذكية\n\nأتمتة المهام الروتينية بالكامل.`,
      en: `What are the latest trends in web development for 2026?\n\n## 1. AI-First Development\n\nAI is everywhere.\n\n## 2. Edge Computing\n\nEdge computing has become the standard.\n\n## 3. Web Assembly\n\nFaster performance for applications.\n\n## 4. Server Components\n\nReducing JavaScript in the browser.\n\n## 5. Smart Automation\n\nFully automating routine tasks.`,
    },
    excerpt: {
      ar: 'استكشف أحدث اتجاهات تطوير الويب في 2026 وكيف تؤثر على عملك',
      en: 'Explore the latest web development trends in 2026 and how they affect your work',
    },
    tags: ['Trends', 'Web Development', 'AI', '2026'],
    category: 'development',
    coverImage: '/blog/web_trends_2026.png',
    readingTime: 5,
    views: 728,
    status: 'published',
    publishedAt: new Date('2026-03-03'),
    seoTitle: { ar: 'اتجاهات تطوير الويب 2026', en: 'Web Development Trends 2026' },
    seoDescription: { ar: 'أحدث اتجاهات تطوير الويب', en: 'Latest web development trends' },
  },
];

const projects = [
  {
    title: { ar: 'منصة إدارة المشاريع الذكية', en: 'Smart Project Management Platform' },
    description: {
      ar: 'منصة SaaS متكاملة لإدارة المشاريع والمهام مع لوحة تحكم تفاعلية وتقارير متقدمة ونظام إشعارات ذكي',
      en: 'Full-featured SaaS platform for project and task management with interactive dashboard, advanced reporting, and smart notification system',
    },
    image: '/projects-cover/saas_management.png',
    techStack: ['Next.js', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Socket.IO', 'Redis'],
    githubUrl: 'https://github.com/example/project-manager',
    liveUrl: 'https://project-manager.example.com',
    category: 'saas',
    order: 1,
    featured: true,
  },
  {
    title: { ar: 'نظام أتمتة التسويق الرقمي', en: 'Digital Marketing Automation System' },
    description: {
      ar: 'نظام أتمتة متكامل يربط بين CRM والبريد الإلكتروني ومنصات التواصل الاجتماعي عبر n8n لأتمتة حملات التسويق',
      en: 'Comprehensive automation system connecting CRM, email, and social media platforms via n8n to automate marketing campaigns',
    },
    image: '/projects-cover/marketing_automation.png',
    techStack: ['n8n', 'Node.js', 'MongoDB', 'REST APIs', 'Webhooks', 'Telegram Bot'],
    githubUrl: 'https://github.com/example/marketing-automation',
    liveUrl: 'https://marketing-auto.example.com',
    category: 'automation',
    order: 2,
    featured: true,
  },
  {
    title: { ar: 'مساعد الدعم الفني بالذكاء الاصطناعي', en: 'AI-Powered Support Assistant' },
    description: {
      ar: 'روبوت محادثة ذكي يستخدم OpenAI API مع قاعدة معرفية مخصصة ونظام RAG للإجابات الدقيقة على استفسارات العملاء',
      en: 'Intelligent chatbot using OpenAI API with custom knowledge base and RAG system for accurate customer support responses',
    },
    image: '/projects-cover/ai_support.png',
    techStack: ['OpenAI', 'LangChain', 'Next.js', 'Pinecone', 'TypeScript', 'Vercel AI SDK'],
    githubUrl: 'https://github.com/example/ai-support',
    liveUrl: 'https://ai-support.example.com',
    category: 'ai',
    order: 3,
    featured: true,
  },
  {
    title: { ar: 'متجر إلكتروني متقدم', en: 'Advanced E-Commerce Store' },
    description: {
      ar: 'متجر إلكتروني كامل مع نظام دفع متكامل Stripe وإدارة مخزون ذكية وأتمتة الشحن والإشعارات',
      en: 'Complete e-commerce store with Stripe payment integration, smart inventory management, and automated shipping & notifications',
    },
    image: '/projects-cover/ecommerce.png',
    techStack: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'Redis', 'n8n'],
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://shop.example.com',
    category: 'web-app',
    order: 4,
    featured: false,
  },
  {
    title: { ar: 'لوحة تحليلات البيانات التفاعلية', en: 'Interactive Data Analytics Dashboard' },
    description: {
      ar: 'لوحة تحكم تفاعلية لتحليل البيانات وعرض التقارير مع رسوم بيانية متقدمة وتصدير PDF',
      en: 'Interactive dashboard for data analysis and reporting with advanced charts, visualizations, and PDF export',
    },
    image: '/projects-cover/analytics.png',
    techStack: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'Chart.js'],
    githubUrl: 'https://github.com/example/analytics',
    liveUrl: 'https://analytics.example.com',
    category: 'web-app',
    order: 5,
    featured: false,
  },
  {
    title: { ar: 'نظام إدارة المحتوى بالذكاء الاصطناعي', en: 'AI-Enhanced Content Management System' },
    description: {
      ar: 'نظام CMS ذكي يستخدم الذكاء الاصطناعي لتوليد المحتوى وتحسين SEO تلقائياً مع دعم متعدد اللغات',
      en: 'Smart CMS using AI for content generation and automatic SEO optimization with multilingual support',
    },
    image: '/projects-cover/ai_cms.png',
    techStack: ['Next.js', 'OpenAI', 'MongoDB', 'n8n', 'TypeScript', 'MDX'],
    githubUrl: 'https://github.com/example/ai-cms',
    liveUrl: 'https://ai-cms.example.com',
    category: 'ai',
    order: 6,
    featured: true,
  },
];

const contacts = [
  {
    name: 'أحمد الراشد',
    email: 'ahmed@example.com',
    message: 'مرحباً، أرغب في تطوير موقع لشركتي يتضمن نظام إدارة محتوى ومتجر إلكتروني. هل يمكنك مساعدتي؟',
    serviceType: 'webDev',
    budgetRange: 'large',
    isRead: false,
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    message: 'Hi, I need help automating our workflow between Salesforce, Slack, and our internal tools using n8n. Can we discuss?',
    serviceType: 'automation',
    budgetRange: 'medium',
    isRead: true,
  },
  {
    name: 'محمد العتيبي',
    email: 'mohammed.o@example.com',
    message: 'أبحث عن مطور لبناء بوت ذكاء اصطناعي لخدمة العملاء يعمل بالعربية والإنجليزية. ما هي التكلفة المتوقعة؟',
    serviceType: 'ai',
    budgetRange: 'enterprise',
    isRead: false,
  },
  {
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    message: 'We are looking for a consultant to review our Next.js architecture and suggest performance improvements.',
    serviceType: 'consulting',
    budgetRange: 'medium',
    isRead: true,
  },
  {
    name: 'خالد المنصور',
    email: 'khalid.m@example.com',
    message: 'نحتاج تطوير API متكاملة لتطبيق الجوال مع لوحة تحكم إدارية. المشروع يحتاج تسليم خلال شهرين.',
    serviceType: 'api',
    budgetRange: 'large',
    isRead: false,
  },
];

const newsletters = [
  { email: 'subscriber1@example.com', isActive: true },
  { email: 'subscriber2@example.com', isActive: true },
  { email: 'subscriber3@example.com', isActive: true },
  { email: 'tech.fan@example.com', isActive: true },
  { email: 'dev.lover@example.com', isActive: true },
  { email: 'ahmed.dev@example.com', isActive: true },
  { email: 'sarah.codes@example.com', isActive: true },
  { email: 'unsubscribed@example.com', isActive: false },
];

// ─── Seed Function ───

async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
    const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
    const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
    const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Post.deleteMany({});
    await Project.deleteMany({});
    await Contact.deleteMany({});
    await Newsletter.deleteMany({});
    console.log('✅ Cleared\n');

    // Seed posts
    console.log('📝 Seeding posts...');
    await Post.insertMany(posts);
    console.log(`✅ Inserted ${posts.length} posts\n`);

    // Seed projects
    console.log('🚀 Seeding projects...');
    await Project.insertMany(projects);
    console.log(`✅ Inserted ${projects.length} projects\n`);

    // Seed contacts
    console.log('📬 Seeding contacts...');
    await Contact.insertMany(contacts);
    console.log(`✅ Inserted ${contacts.length} contacts\n`);

    // Seed newsletter subscribers
    console.log('📧 Seeding newsletter subscribers...');
    await Newsletter.insertMany(newsletters);
    console.log(`✅ Inserted ${newsletters.length} subscribers\n`);

    console.log('🎉 Seed completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Posts:       ${posts.length}`);
    console.log(`   Projects:    ${projects.length}`);
    console.log(`   Contacts:    ${contacts.length}`);
    console.log(`   Subscribers: ${newsletters.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
