import WebhookLog from '@/models/WebhookLog';
import dbConnect from '@/lib/db';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || '';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

interface WebhookPayload {
  event: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export async function triggerWebhook(
  event: string,
  data: Record<string, unknown>
): Promise<boolean> {
  if (!N8N_WEBHOOK_URL) {
    console.warn('N8N_WEBHOOK_URL not configured, skipping webhook');
    return false;
  }

  const payload: WebhookPayload = {
    event,
    data,
    timestamp: new Date().toISOString(),
  };

  await dbConnect();

  const log = new WebhookLog({
    event,
    payload: data,
    status: 'pending',
  });

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
    });

    log.status = response.ok ? 'success' : 'failed';
    log.responseCode = response.status;
    await log.save();

    return response.ok;
  } catch (error) {
    console.error('Webhook trigger failed:', error);
    log.status = 'failed';
    log.responseCode = 0;
    await log.save();
    return false;
  }
}
