import SectionTitle from "./ui/SectionTitle";

const SECTION_TITLE = "Мы отвечаем за качество нашей продукции";

const QUALITY_ITEMS = [
  {
    title: "100% соответствие техническому заданию",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
        <path d="M8 12l2.5 2.5L16 9" />
      </svg>
    ),
  },
  {
    title: "Работаем с металлом толщиной до 20 мм",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 6h18" />
        <path d="M3 18h18" />
        <path d="M7 6v12" />
        <path d="M17 6v12" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
      </svg>
    ),
  },
  {
    title: "Гарантируем геометрию до миллиметра",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 3" />
        <path d="M4 12h2" />
        <path d="M18 12h2" />
      </svg>
    ),
  },
];

const QualityBlock = () => {
  return (
    <section className="py-12 sm:py-14 xl:py-16">
      <div className="flex flex-col">
        <SectionTitle
          className="mb-8 xl:mb-10"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {SECTION_TITLE}
        </SectionTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {QUALITY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="mx-auto flex max-w-[355px] items-start xl:mx-0"
            >
              <div className="mr-3 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[color:var(--c-primary)] text-[color:var(--c-surface)] sm:h-[56px] sm:w-[56px] xl:mr-[14px] xl:h-[64px] xl:w-[64px]">
                {item.icon}
              </div>
              <div
                className="text-[18px] font-bold leading-snug sm:text-[20px] xl:text-[22px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityBlock;
