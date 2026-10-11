import { router, json, error, db } from '@appdeploy/sdk';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handler = router({
  'GET /api/_healthcheck': [async () => json({ message: 'Success' })],
  'POST /api/contact': [async ({ body }) => {
    if (!body || typeof body !== 'object' || Array.isArray(body)) return error('Please provide valid contact details.',400);
    const payload = body as Record<string,unknown>;
    const name = typeof payload.name==='string'?payload.name.trim():'';
    const email = typeof payload.email==='string'?payload.email.trim().toLowerCase():'';
    const projectType = typeof payload.projectType==='string'?payload.projectType.trim():'';
    const message = typeof payload.message==='string'?payload.message.trim():'';
    const honeypot = typeof payload.website==='string'?payload.website.trim():'';
    if (honeypot) return json({ok:true});
    if (!name || name.length>MAX_NAME) return error('Enter a name of 1–100 characters.',400);
    if (!email || email.length>MAX_EMAIL || !emailPattern.test(email)) return error('Enter a valid email address.',400);
    if (!projectType || projectType.length>80) return error('Choose a valid project type.',400);
    if (!message || message.length<10 || message.length>MAX_MESSAGE) return error('Your message must be between 10 and 5000 characters.',400);
    try {
      const [id] = await db.add('contact_submissions',[{name,email,projectType,message,createdAt:new Date().toISOString(),status:'new'}]);
      if (!id) return error('Unable to save your message right now. Please try again later.',503);
      return json({ok:true,message:'Your message has been submitted.'},201);
    } catch (cause) {
      console.error('Contact submission storage failed.',cause instanceof Error?cause.message:'Unknown error');
      return error('Unable to save your message right now. Please try again later.',503);
    }
  }]
});