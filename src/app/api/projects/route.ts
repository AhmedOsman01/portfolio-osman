import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { 'title.ar': { $regex: search, $options: 'i' } },
        { 'title.en': { $regex: search, $options: 'i' } },
        { 'description.ar': { $regex: search, $options: 'i' } },
        { 'description.en': { $regex: search, $options: 'i' } },
        { techStack: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query),
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Projects fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
