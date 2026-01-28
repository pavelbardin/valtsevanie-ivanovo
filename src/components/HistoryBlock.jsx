import SectionTitle from "./ui/SectionTitle";
import historyImage from "../assets/History.webp";

const IMAGE_SRC = historyImage;
const IMAGE_ALT = "История компании";

const HISTORY_PARAGRAPH_1 =
  "АО Ивановское управление «Стальконструкция» является старейшим предприятием города Иваново и Ивановской области в сфере изготовления и монтажа металлоконструкций различного назначения и зарекомендовало себя как надежный партнер.";

const HISTORY_PARAGRAPH_2 =
  "АО ИУ «Стальконструкция» было создано на базе Ярославского ССМУ (Специализированное строительно-монтажное управление) 01.04.1971 года и входило в состав треста «Стальконструкция» г. Москва. АО ИУ «Стальконструкция» ведёт строительство промышленных объектов и других сооружений.";

const HISTORY_PARAGRAPH_3 =
  "За время существования было построено много важных и по своей конструкции уникальных объектов.";

const HistoryBlock = () => {
  return (
    <section id="about" className="py-4 sm:py-6 xl:py-8 app-layout">
      <SectionTitle
        className="mb-8 xl:mb-10"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Наша история
      </SectionTitle>

      <div className="flex flex-col-reverse gap-6 xl:flex-row xl:gap-10">

        <div className="hidden xl:flex xl:h-[393px] xl:w-1/2">
          <img
            src={IMAGE_SRC}
            alt={IMAGE_ALT}
            className="h-full w-full rounded-md object-cover"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="w-full xl:h-[393px] xl:w-1/2">
          <div
            className="flex h-full items-center rounded-md bg-white px-6 py-6 sm:px-8 sm:py-8 xl:px-10 xl:py-10"
            style={{
              fontFamily: "Roboto, sans-serif",
              boxShadow:
                "inset 80px 0 80px -60px rgba(0,0,0,0.08), inset -80px 0 80px -60px rgba(0,0,0,0.08)",
            }}
          >
            <div className="text-[16px] font-normal leading-relaxed sm:text-[17px] xl:text-[15px]">
              {HISTORY_PARAGRAPH_1}
              <br /><br />
              {HISTORY_PARAGRAPH_2}
              <br /><br />
              {HISTORY_PARAGRAPH_3}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryBlock;
