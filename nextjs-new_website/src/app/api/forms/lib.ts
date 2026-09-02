import { NextResponse } from "next/server";
import { getServerClient } from "@/sanity/client";
import { parseFormPayload } from "./validation";

export type ContactFormType = "volunteer" | "subscribe" | "contact";

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
        {
          error: payload.error.issues[0]?.message ?? "Invalid form payload.",
        },
        { status: 400 },
      );
    }

    const client = getServerClient();

    if (payload.data.formType === "volunteer") {
      const { firstName, lastName, email, message, interest } = payload.data;
      const typeName = "volunteerSubmission";

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

      const document = await client.create({
        _type: "volunteerSubmission",
        firstName,
        lastName,
        email,
        interest,
        message,
      });

      return NextResponse.json(
        { success: true, id: document._id },
        { status: 200 },
      );
    }

    if (payload.data.formType === "contact") {
      const { firstName, lastName, email, message, subject } = payload.data;
      const typeName = "contactSubmission";

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

      const document = await client.create({
        _type: "contactSubmission",
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
    }

    const { firstName, lastName, email, message, subject } = payload.data;
    const typeName = "subscribeSubmission";

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

    const document = await client.create({
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