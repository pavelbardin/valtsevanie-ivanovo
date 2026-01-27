import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";

const SECTION_TITLE = "Вопрос-ответ";
const ICON_CLOSED = "▼";

const qaItems = [
  {
    q: "Какие сроки выполнения работ?",
    a: "Сроки зависят от объема и сложности проекта. После изучения задачи мы даём точную оценку и фиксируем её в договоре.",
  },
  {
    q: "Вы работаете только с готовыми чертежами?",
    a: "Нет, мы можем работать как по готовым чертежам, так и помочь с их разработкой и доработкой под технологические требования.",
  },
  {
    q: "Есть ли ограничения по размерам и материалам?",
    a: "Мы работаем с широким диапазоном металлов и размеров. Точные ограничения зависят от типа обработки — уточняются на этапе оценки.",
  },
  {
    q: "Входит ли в стоимость обработка кромок, сварка или покраска?",
    a: "Базовая стоимость включает только оговоренные операции. Дополнительные услуги рассчитываются отдельно.",
  },
];

const QABlock = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      className="rounded-md bg-[#f3f3f8] py-8 sm:py-10 xl:py-5"
      style={{
        boxShadow:
          "inset 80px 0 80px -60px rgba(0,0,0,0.08), inset -80px 0 80px -60px rgba(0,0,0,0.08)",
      }}
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <SectionTitle
          className="mb-6 text-[color:var(--c-text-strong)]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {SECTION_TITLE}
        </SectionTitle>

        <div className="flex flex-col gap-4 sm:gap-6">
          {qaItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-md bg-[color:var(--c-surface)]/40 px-4 py-3 transition-shadow duration-200 hover:shadow-md sm:px-6 sm:py-2"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between text-left text-[18px] font-normal text-[color:var(--c-text-strong)] sm:text-[20px] xl:text-[22px]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <span>{item.q}</span>
                  <span
                    className={`ml-4 text-[16px] transition-transform duration-300 sm:ml-6 sm:text-[18px] ${isOpen ? "rotate-180" : ""}`}
                  >
                    {ICON_CLOSED}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="text-[16px] font-normal leading-relaxed text-[color:var(--c-text-strong)] sm:text-[18px] xl:text-[22px]"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QABlock;
