import { useState } from "react";

const SECTION_TITLE = "Этапы сотрудничества: 5 шагов к результату";

const STEPS = [
  {
    id: 1,
    titleLines: ["Получение заявки"],
    subtitleLines: ["Уточняем задачу с", "заказчиком"],
    position: "top",
  },
  {
    id: 2,
    titleLines: ["Оценка и расчет"],
    subtitleLines: ["Готовим коммерческое", "предложение"],
    position: "bottom",
  },
  {
    id: 3,
    titleLines: ["Заключение договора"],
    subtitleLines: ["Фиксируем сроки,", "стоимость работ"],
    position: "top",
  },
  {
    id: 4,
    titleLines: ["Производство"],
    subtitleLines: ["Обеспечиваем постоянный", "контроль геометрии"],
    position: "bottom",
  },
  {
    id: 5,
    titleLines: ["Отгрузка"],
    subtitleLines: ["Организуем доставку", "по адресу заказчика"],
    position: "top",
  },
];

// === STYLE CONSTANTS ===
const SLOT_H = 150;
const CIRCLE = 86;
const LINE_H = 2;

// === COMPONENTS ===
function StepText({ titleLines, subtitleLines, active }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="text-[36px] font-bold leading-[1.05]"
        style={{ color: active ? "var(--c-primary)" : "var(--c-text-strong)" }}
      >
        {titleLines.map((line, idx) => (
          <div key={idx} className="whitespace-nowrap">
            {line}
          </div>
        ))}
      </div>
      <div
        className="mt-6 text-[22px] font-medium leading-[1.1]"
        style={{ color: active ? "var(--c-primary)" : "var(--c-text)" }}
      >
        {subtitleLines.map((line, idx) => (
          <div key={idx} className="whitespace-nowrap">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCircle({ n, active }) {
  return (
    <div
      className="relative z-10 flex items-center justify-center rounded-full transition-colors"
      style={{ width: CIRCLE, height: CIRCLE }}
    >
      <div
        className="flex h-full w-full items-center justify-center rounded-full"
        style={{
          backgroundColor: active ? "var(--c-primary)" : "var(--c-border)",
          color: active ? "var(--c-surface)" : "var(--c-text)",
        }}
      >
        <span className="text-[18px] font-medium">{n}</span>
      </div>
    </div>
  );
}

function StepsRow({ children }) {
  return (
    <div className="relative mx-auto flex w-full items-center justify-between">
      {children}
    </div>
  );
}

function StepCell({ children }) {
  return (
    <div className="flex items-center justify-center" style={{ width: CIRCLE }}>
      {children}
    </div>
  );
}

// === MAIN COMPONENT ===
export default function CooperationSteps() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="w-full bg-white font-sans py-10 sm:py-12 xl:pt-[56px] xl:pb-[72px]">
      <div className="mx-auto w-full max-w-[1480px] px-[24px]">
        <h2
          className="mb-8 text-center text-[26px] font-bold text-[color:var(--c-text-strong)] sm:text-[32px] md:text-[36px] xl:mb-[56px] xl:text-[44px]"
          style={{ lineHeight: 1.1 }}
        >
          {SECTION_TITLE}
        </h2>

        {/* Desktop layout */}
        <div className="hidden xl:block">
          <StepsRow>
            {STEPS.map((s) => (
              <StepCell key={s.id}>
                <div
                  className="flex w-max items-end justify-center"
                  style={{ height: SLOT_H, paddingBottom: 40 }}
                >
                  {s.position === "top" ? (
                    <StepText
                      titleLines={s.titleLines}
                      subtitleLines={s.subtitleLines}
                      active={activeId === s.id}
                    />
                  ) : null}
                </div>
              </StepCell>
            ))}
          </StepsRow>

          <StepsRow>
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                height: LINE_H,
                left: CIRCLE / 2,
                right: CIRCLE / 2,
                backgroundColor: "var(--c-text-strong)",
              }}
            />
            {STEPS.map((s) => (
              <StepCell key={s.id}>
                <div
                  onMouseEnter={() => setActiveId(s.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className="cursor-pointer"
                >
                  <StepCircle n={s.id} active={activeId === s.id} />
                </div>
              </StepCell>
            ))}
          </StepsRow>

          <StepsRow>
            {STEPS.map((s) => (
              <StepCell key={s.id}>
                <div
                  className="flex w-max items-start justify-center"
                  style={{ height: SLOT_H, paddingTop: 40 }}
                >
                  {s.position === "bottom" ? (
                    <StepText
                      titleLines={s.titleLines}
                      subtitleLines={s.subtitleLines}
                      active={activeId === s.id}
                    />
                  ) : null}
                </div>
              </StepCell>
            ))}
          </StepsRow>
        </div>

        {/* Mobile layout */}
        <div className="xl:hidden">
          <div className="mx-auto w-full max-w-[680px] px-2 sm:px-6">
            <div className="relative">
              <div className="absolute left-[26px] top-0 h-full w-[2px] bg-[color:var(--c-text-strong)]" />
              <div className="flex flex-col gap-8">
                {STEPS.map((s) => (
                  <div key={s.id} className="relative flex gap-6">
                    <div className="relative z-10">
                      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[color:var(--c-border)]">
                        <span className="text-[18px] font-medium text-[color:var(--c-text)]">
                          {s.id}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="text-[20px] font-bold leading-snug text-[color:var(--c-text-strong)] sm:text-[22px]">
                        {s.titleLines.join(" ")}
                      </div>
                      <div className="mt-2 text-[16px] font-medium leading-snug text-[color:var(--c-text)] sm:text-[18px]">
                        {s.subtitleLines.join(" ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
