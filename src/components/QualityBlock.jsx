import SectionTitle from "./ui/SectionTitle";

const SECTION_TITLE = "Мы отвечаем за качество нашей продукции";

const QUALITY_ITEMS = [
  {
    title: "Предприятию более 50 лет",
    subtitle: "Входим в список лучших подрядчиков России",
    icon: "/icons/1.png",
  },
  {
    title: "Огромная производственная площадь",
    subtitle: "Проектируем, строим и проводим монтаж объектов любых размеров и сложности.",
    icon: "/icons/2.png",
  },
  {
    title: "Допуск СРО",
    subtitle:
      "Построили самые разные объекты для государства и лидеров рынка, таких как «Технониколь», «Лукойл», «Газпром»",
    icon: "/icons/3.png",
  },
];

const QualityBlock = () => {
  return (
    <section className="py-12 sm:py-14 xl:py-16 app-layout border-b border-[color:var(--c-border)]">
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
              className="mx-auto flex max-w-[355px] items-center xl:mx-0"
            >
              <div className="mr-4 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-white overflow-visible sm:h-[56px] sm:w-[56px] xl:mr-[16px] xl:h-[64px] xl:w-[64px]">
                <img
                  src={item.icon}
                  alt=""
                  className="h-[80px] w-[80px] max-w-none max-h-none object-contain sm:h-[92px] sm:w-[92px] xl:h-[104px] xl:w-[104px]"
                  draggable={false}
                />
              </div>
              <div>
                <div
                  className="text-[18px] font-bold leading-snug sm:text-[20px] xl:text-[22px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {item.title}
                </div>
                <div
                  className="mt-1 text-[14px] leading-snug text-[color:var(--c-text-muted)] sm:text-[15px] xl:text-[16px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityBlock;
