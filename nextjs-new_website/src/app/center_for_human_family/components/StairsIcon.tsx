/** The three-step glyph used on the floors badge and on each floor card. */
export default function StairsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 2h8v20h-8zM8 9h7v13H8zM0 16h7v6H0z" />
    </svg>
  );
}
