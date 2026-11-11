interface ClosingNoteProps {
  lines: readonly string[];
  socialLabels: readonly string[];
}

export default function ClosingNote({ lines, socialLabels }: ClosingNoteProps) {
  return (
    <section
      className="chf-container pt-[96px] pb-[140px] text-center max-[767px]:pt-[48px] max-[767px]:pb-[96px]"
      aria-label="Get in touch"
    >
      {lines.map((line, index) => (
        <p
          className={`mx-auto mb-0 max-w-[900px] ${index > 0 ? "mt-[8px]" : "mt-0"}`}
          key={line}
        >
          {line}
        </p>
      ))}

      <ul className="m-0 mt-[46px] flex list-none justify-center gap-[24px] p-0 max-[767px]:mt-[32px] max-[767px]:gap-[16px]">
        {socialLabels.map((label) => (
          <li key={label}>
            {/* Icons and links still to come from Think Round. */}
            <span
              className="block size-[40px] rounded-[8px] bg-[#0f0f0f] max-[767px]:size-[34px]"
              role="img"
              aria-label={label}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
