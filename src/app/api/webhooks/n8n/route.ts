import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import WebhookLog from '@/models/WebhookLog';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { event, data } = body;

    if (!event) {
      return NextResponse.json(
        { error: 'Event is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Log the webhook event
    await WebhookLog.create({
      event,
      payload: data || {},
      status: 'success',
      responseCode: 200,
    });

    // Process different event types
    switch (event) {
      case 'new_post':
        // Handle new post event from n8n
        console.log('New post webhook received:', data);
        break;
      case 'sync_github':
        // Handle GitHub sync
        console.log('GitHub sync webhook received:', data);
        break;
      case 'social_post':
        // Handle social media posting
        console.log('Social post webhook received:', data);
        break;
      default:
        console.log('Unknown webhook event:', event);
    }

    return NextResponse.json(
      { message: 'Webhook processed successfully', event },
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook error:', error);

    try {
      await dbConnect();
      await WebhookLog.create({
        event: 'unknown',
        payload: {},
        status: 'failed',
        responseCode: 500,
      });
    } catch {
      // Ignore logging errors
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
