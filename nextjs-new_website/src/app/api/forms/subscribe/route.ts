import { submitContactForm } from "../lib";

export async function POST(request: Request) {
  return submitContactForm(request, "subscribe");
}
