import { NextResponse } from "next/server";
import { getServerClient } from "@/sanity/client";
import { parseFormPayload } from "./validation";

export type ContactFormType = "volunteer" | "subscribe" | "contact";

function normalizeFormType(value: unknown): ContactFormType | null {
  if (value === "volunteer" || 
      value === "subscribe" || 
      value === "contact" 
    ) {
    return value;
  }

  return null;
}

export async function submitContactForm(
  request: Request,
  formType?: ContactFormType,
) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const resolvedFormType = formType ?? normalizeFormType(body.formType);

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
        { error: "Missing required form fields." },
        { status: 400 },
      );
    }

    if (resolvedFormType === "volunteer" && !interest) {
      return NextResponse.json(
        { error: "Please select an interest option." },
        { status: 400 },
      );
    }

    if ( 
    (resolvedFormType === "subscribe" ||
         resolvedFormType === "contact") &&
        !subject
    ) {
      return NextResponse.json(
        { error: "Please provide a subject." },
        { status: 400 },
      );
    }

    const client = getServerClient();

    const typeName =
      resolvedFormType === "volunteer"
        ? "volunteerSubmission"
        : resolvedFormType === "subscribe"
            ? "subscribeSubmission"
            : "contactSubmission";

    const existingCount = await client.fetch(
      "count(*[_type == $type && email == $email])",
      { type: typeName, email },
    );

    if (existingCount > 0) {
      return NextResponse.json(
        { error: "This email has already been submitted." },
        { status: 409 },
      );
    }

    let document;

    if (typeName === "volunteerSubmission") {
      document = await client.create({
        _type: "volunteerSubmission",
        firstName,
        lastName,
        email,
        interest,
        message,
      });
    } else if (typeName === "subscribeSubmission") {
      document = await client.create({
        _type: "subscribeSubmission",
        firstName,
        lastName,
        email,
        subject,
        message,
      });
    } else {
      document = await client.create({
        _type: "contactSubmission",
        firstName,
        lastName,
        email,
        subject,
        message,
      });
    }
    
    return NextResponse.json(
      { success: true, id: document._id },
      { status: 200 },
    );
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
