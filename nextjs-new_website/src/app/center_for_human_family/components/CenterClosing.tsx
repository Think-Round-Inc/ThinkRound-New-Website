export default function CenterClosing() {
  return (
    <footer className="px-[24px] pt-[120px] pb-[112px] max-[768px]:py-[64px]">
      <div
        className="flex items-center justify-center gap-[38px] max-[768px]:flex-wrap max-[768px]:gap-[16px]"
        role="img"
        aria-label="Five logo placeholders"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span
            className="size-[100px] bg-[#d9d9d9] max-[768px]:size-[48px]"
            key={index}
          />
        ))}
      </div>
      <p className="mx-auto mt-[163px] mb-0 w-fit max-w-full text-center text-[72px] leading-[74px] font-bold text-[#701a99] max-[768px]:mt-[64px] max-[768px]:text-[clamp(28px,7vw,48px)] max-[768px]:leading-[1.1]">
        <span className="block">CENTER FOR THE</span>
        <span className="block text-[77px] max-[768px]:text-[clamp(28px,7vw,48px)]">
          HUMAN FAMILY
        </span>
      </p>
    </footer>
  );
}
