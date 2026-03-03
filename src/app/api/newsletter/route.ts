import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Newsletter from '@/models/Newsletter';
import { triggerWebhook } from '@/lib/webhook';

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    await dbConnect();

    // Check for existing subscription
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { error: 'Already subscribed' },
          { status: 400 }
        );
      }
      // Reactivate
      existing.isActive = true;
      await existing.save();
    } else {
      await Newsletter.create({ email });
    }

    // Trigger n8n webhook
    triggerWebhook('newsletter_subscribe', { email }).catch(console.error);

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
