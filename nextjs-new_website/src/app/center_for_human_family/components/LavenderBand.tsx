import type { ReactNode } from "react";

import styles from "./LavenderBand.module.css";

/**
 * The lavender stretch of the page, from The Paradise Project down to the
 * social links. Its top edge is a shallow dome that rises into the white
 * section above — the Figma draws this as a 1440x233 ellipse.
 */
export default function LavenderBand({ children }: { children: ReactNode }) {
  return <div className={styles.band}>{children}</div>;
}
