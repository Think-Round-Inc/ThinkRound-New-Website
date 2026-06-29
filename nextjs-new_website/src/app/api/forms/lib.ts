import { NextResponse } from "next/server";
import { getServerClient } from "@/sanity/client";

export type ContactFormType = "volunteer" | "subscribe";

type ContactPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  message?: unknown;
  subject?: unknown;
  interest?: unknown;
};

function normalizeFormType(value: unknown): ContactFormType | null {
  if (value === "volunteer" || value === "subscribe") {
    return value;
  }

  return null;
}

export async function submitContactForm(
  request: Request,
  formType?: ContactFormType,
) {
  try {
    const body = (await request.json()) as ContactPayload & {
      formType?: unknown;
    };
    const resolvedFormType = formType ?? normalizeFormType(body.formType);

    if (!resolvedFormType) {
      return NextResponse.json(
        { error: "Missing required form type." },
        { status: 400 },
      );
    }

    const firstName =
      typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName =
      typeof body.lastName === "string" ? body.lastName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const interest =
      typeof body.interest === "string" ? body.interest.trim() : "";

    if (!firstName || !lastName || !email || !message) {
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

    if (resolvedFormType === "subscribe" && !subject) {
      return NextResponse.json(
        { error: "Please provide a subject." },
        { status: 400 },
      );
    }

    const client = getServerClient();

    const document =
      resolvedFormType === "volunteer"
        ? await client.create({
            _type: "volunteerSubmission",
            firstName,
            lastName,
            email,
            interest,
            message,
          })
        : await client.create({
            _type: "subscribeSubmission",
            firstName,
            lastName,
            email,
            subject,
            message,
          });

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
