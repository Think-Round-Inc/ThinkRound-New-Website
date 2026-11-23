import type { ChfContent } from "../types";

export default function ClosingNote({
  invitation,
  email,
  socialText,
  socialLinks,
}: ChfContent["closingNote"]) {
  const emailIndex = email ? invitation.indexOf(email) : -1;
  const emailLink = email ? (
    <a className="underline" href={`mailto:${encodeURIComponent(email)}`}>
      {email}
    </a>
  ) : null;
  const iconClass =
    "grid size-[40px] place-items-center rounded-[8px] bg-[#0f0f0f] text-[14px] font-bold text-white max-[767px]:size-[34px]";
  return (
    <section
      className="chf-container pt-[96px] pb-[140px] text-center max-[767px]:pt-[48px] max-[767px]:pb-[96px]"
      aria-label="Get in touch"
    >
      {invitation ? (
        <p className="mx-auto mt-0 mb-0 max-w-[900px]">
          {email && emailIndex >= 0 ? (
            <>
              {invitation.slice(0, emailIndex)}
              {emailLink}
              {invitation.slice(emailIndex + email.length)}
            </>
          ) : (
            invitation
          )}
        </p>
      ) : null}
      {email && emailIndex < 0 ? (
        <p className="mt-[8px] mb-0">{emailLink}</p>
      ) : null}
      {socialText ? (
        <p className="mx-auto mt-[8px] mb-0 max-w-[900px]">{socialText}</p>
      ) : null}
      {socialLinks.length ? (
        <ul className="m-0 mt-[46px] flex list-none flex-wrap justify-center gap-[24px] p-0 max-[767px]:mt-[32px] max-[767px]:gap-[16px]">
          {socialLinks.map((link) => (
            <li key={link._key}>
              {link.href ? (
                <a
                  className={`${iconClass} chf-social-link`}
                  href={link.href}
                  aria-label={link.platform}
                >
                  <span aria-hidden="true">
                    {(
                      {
                        facebook: "f",
                        x: "X",
                        twitter: "X",
                        instagram: "IG",
                        youtube: "YT",
                      } as Record<string, string>
                    )[link.platform.toLowerCase()] ??
                      link.platform.slice(0, 2).toUpperCase()}
                  </span>
                </a>
              ) : (
                <span
                  className={iconClass}
                  role="img"
                  aria-label={link.platform}
                />
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
