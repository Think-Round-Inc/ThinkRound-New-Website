import { after, NextResponse } from "next/server";
import { parseFormPayload } from "./validation";
import emailjs from "@emailjs/nodejs";

export type ContactFormType = "volunteer" | "subscribe" | "contact";

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID!;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY!;


function normalizeFormType(value: unknown): ContactFormType | null {
  if (
    value === "volunteer" ||
    value === "subscribe" ||
    value === "contact"
  ) {
    return value;
  }

  return null;
}

async function writeToGoogleSheet(
  formType: ContactFormType,
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    interest?: string;
    subject?: string;
    message: string;
  },
) {
  const webhookUrl =
    formType === "volunteer"
      ? process.env.GOOGLE_SHEETS_VOLUNTEER_WEBHOOK_URL
      : formType === "subscribe"
        ? process.env.GOOGLE_SHEETS_SUBSCRIBE_WEBHOOK_URL
        : process.env.GOOGLE_SHEETS_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(`Webhook URL for ${formType} not set — skipping Sheet write.`);
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    console.error("Failed to write to Google Sheet:", error);
  }
}

export async function submitContactForm(
  request: Request,
  formType?: ContactFormType,
) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const resolvedFormType = formType ?? normalizeFormType(body.formType);

    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const subscribeTemplateId =process.env.EMAILJS_SUBSCRIBE_TEMPLATE_ID;
    if (!templateId || !subscribeTemplateId) {
      return Response.json(
        { error: "EMAILJS TEMPLATE ID is not set on the server." },
        { status: 500 }
      );
    }

    if (!SERVICE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      return Response.json(
        { error: "Missing EmailJS environment variables." },
        { status: 500 }
      );
    }

    if (!resolvedFormType) {
      return NextResponse.json(
        { error: "Missing required form type." },
        { status: 400 },
      );
    }

    const payload = parseFormPayload({
      ...body,
      formType: resolvedFormType,
    });

    if (!payload.success) {
      return NextResponse.json(
        {
          error: payload.error.issues[0]?.message ?? "Invalid form payload.",
        },
        { status: 400 },
      );
    }

    if (payload.data.formType === "volunteer") {
      const { firstName, lastName, email, message, interest } = payload.data;
      after(() => writeToGoogleSheet("volunteer", {
        firstName,
        lastName,
        email,
        interest,
        message,
      }));

      await emailjs.send(
      SERVICE_ID,
      templateId,
      { first_name:firstName, last_name:lastName, user_email: email, subject:interest, message },
      { publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY }
    );

      return NextResponse.json({ success: true }, { status: 200 });
    }

   

    if (payload.data.formType === "contact") {
      const { firstName, lastName, email, message, subject } = payload.data;
      after(() => writeToGoogleSheet("contact", {
        firstName,
        lastName,
        email,
        subject,
        message,
      }));

      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { firstName, lastName, email, message, subject } = payload.data;
    after(() => writeToGoogleSheet("subscribe", {
      firstName,
      lastName,
      email,
      subject,
      message,
    }));

    await emailjs.send(
      SERVICE_ID,
      subscribeTemplateId,
      { first_name: firstName, last_name:lastName, user_email: email, subject, message },
      { publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY }
     );


    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Sanity form submission failed:", error);

    if (
      error instanceof Error &&
      error.message.includes("SANITY_API_WRITE_TOKEN")
    ) {
      return NextResponse.json(
        {
          error:
            "Missing SANITY_API_WRITE_TOKEN. Add it to your Next.js .env.local file.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Unable to submit form right now." },
      { status: 500 },
    );
  }
}