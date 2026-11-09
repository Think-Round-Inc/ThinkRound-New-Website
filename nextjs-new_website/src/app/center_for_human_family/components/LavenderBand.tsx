import type { ReactNode } from "react";

/**
 * The lavender stretch of the page, from The Paradise Project down to the
 * social links. Its top edge is the shared dome (see .chf-dome in chf.css).
 */
export default function LavenderBand({ children }: { children: ReactNode }) {
  return (
    <div className="chf-dome mt-[233px] bg-[var(--chf-lavender)] max-[767px]:mt-[120px]">
      {children}
    </div>
  );
}
