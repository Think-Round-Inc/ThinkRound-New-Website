import type { VideoSource } from "./types";

/** Accept public web URLs; root-relative paths and fragments are opt-in. */
export function safeLink(
  value: unknown,
  allowRelative = false,
): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  if (!text || /[\u0000-\u0020\u007f\\]/.test(text)) return undefined;
  if (
    allowRelative &&
    ((text.startsWith("/") && !text.startsWith("//")) || text.startsWith("#"))
  )
    return text;
  try {
    const url = new URL(text);
    return ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function safeEmail(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  return /^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(text) ? text : undefined;
}

export function videoSource(value: unknown): VideoSource | undefined {
  const src = safeLink(value);
  if (!src) return undefined;
  const url = new URL(src);
  const host = url.hostname.replace(/^www\./, "");
  let youtubeId: string | null = null;
  if (host === "youtu.be") youtubeId = url.pathname.slice(1);
  if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
    youtubeId =
      url.searchParams.get("v") ??
      url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)\/?$/)?.[1] ??
      null;
  }
  if (youtubeId && /^[\w-]{11}$/.test(youtubeId)) {
    return {
      kind: "embed",
      src: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    };
  }
  if (["vimeo.com", "player.vimeo.com"].includes(host)) {
    const id = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/)?.[1];
    if (id) {
      const embed = new URL(`https://player.vimeo.com/video/${id}`);
      const hash = url.searchParams.get("h");
      if (hash && /^[a-z0-9]+$/i.test(hash)) embed.searchParams.set("h", hash);
      return { kind: "embed", src: embed.href };
    }
  }
  return {
    kind: /\.(mp4|webm|ogv|ogg)$/i.test(url.pathname) ? "file" : "link",
    src,
  };
}
