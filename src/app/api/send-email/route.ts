// src/app/api/send-email/route.ts

import { Resend } from 'resend';

const resend = new Resend('re_4qrYDN1v_7U9PsD4tKmdBFajPTzngJp3T');

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, campaignType, message } = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'support@resend.dev',
      to: ['fluenciagapublishing@gmail.com'],
      subject: 'New Contact Form Submission - Fluenciaga Publishing',
      html: `
        <p>First Name: ${firstName}</p>
        <p>Last Name: ${lastName}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Campaign Type: ${campaignType}</p>
        <p>Message: ${message}</p>
      `,
      replyTo: 'accounts@fluenciaga.com',
    });

    if (error) {
      return new Response(JSON.stringify({ error: error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
