import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "s3cfqcyr",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const getServerClient = () => {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN");
  }

  return createClient({
    projectId: "s3cfqcyr",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });
};

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
