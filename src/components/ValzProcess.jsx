import SectionTitle from "./ui/SectionTitle";
import processImage from "../assets/process.webp";

const SECTION_TITLE = "Как происходит процесс вальцевания";

const PROCESS_STEPS = [
  {
    title: "Этап 1. Подготовка",
    description: "Установка заготовки в зону обработки",
  },
  {
    title: "Этап 2. Формирование",
    description: "Придание металлу требуемой формы на вальцах",
  },
  {
    title: "Этап 3. Контроль качества",
    description: "Проверка геометрии и соответствия техническому заданию",
  },
];

const PROCESS_IMAGE_SRC = processImage;
const PROCESS_IMAGE_ALT = "Процесс вальцевания";

const ValzProcess = () => {
  return (
    <section className="py-12 sm:py-14 xl:py-16 app-layout">
      <div className="flex flex-col">
        <SectionTitle
          className="mb-8 xl:mb-12"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {SECTION_TITLE}
        </SectionTitle>

        <div className="flex flex-col gap-6 xl:flex-row xl:items-stretch xl:gap-10">
          <div className="flex w-full flex-col gap-6 xl:w-1/2 xl:gap-[40px]">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index}>
                <div
                  className="mb-[8px] text-[20px] font-bold sm:text-[22px] lg:text-[24px] xl:mb-[10px] xl:text-[25px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {step.title}
                </div>
                <div
                  className="text-[16px] font-normal sm:text-[18px] xl:text-[20px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {step.description}
                </div>
              </div>
            ))}
          </div>

          <div className="h-[240px] w-full sm:h-[320px] md:h-[360px] xl:h-full xl:w-1/2">
            <img
              src={PROCESS_IMAGE_SRC}
              alt={PROCESS_IMAGE_ALT}
              className="w-full h-full object-cover rounded-md"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValzProcess;
