import { useMemo, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import { sendForm } from "../api/forms";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const TEXT_COLOR = "var(--c-text-strong)";

const SECTION_TITLE = "Рассчитаем стоимость работы по вашему техническому заданию";
const SECTION_DESCRIPTION =
  "Заполните квиз — можно переходить между шагами. В конце оставьте контакты и нажмите «Отправить».";
const BUTTON_BACK_TEXT = "Назад";
const BUTTON_NEXT_TEXT = "Далее";
const BUTTON_SUBMIT_TEXT = "Отправить";
const BUTTON_SENDING_TEXT = "Отправка...";
const STATUS_SENDING_TEXT = "Отправка...";
const STATUS_SUCCESS_TEXT = "Спасибо, ваша заявка отправлена. Скоро с вами свяжемся.";
const STATUS_ERROR_NO_KEY_TEXT =
  "Ошибка: ключ Web3Forms не найден (VITE_WEB3FORMS_KEY)";
const STATUS_ERROR_DEFAULT_TEXT = "Ошибка отправки. Попробуйте позже.";
const STATUS_ERROR_WITH_MESSAGE = (message) => `Ошибка: ${message}`;
const FORM_SUBJECT = "Новая заявка из квиза";
const FORM_MESSAGE_TEMPLATE = (values) => `
Заявка с квиза по вальцовке

Что требуется изготовить:
${values.whatToMake}

Размеры заготовки:
Толщина: ${values.thickness} мм
Длина: ${values.length} мм
Ширина: ${values.width} мм

Материал:
${values.material === "Другой (укажите)" ? values.materialOther : values.material}

Документация:
${values.docs}
`;

const QUIZ_STEPS = [
  {
    id: "whatToMake",
    title: "Что требуется изготовить?",
    type: "text",
    field: "whatToMake",
    placeholder: "Опишите изделие (например: цилиндр, конус, обечайка и т.д.)",
  },
  {
    id: "sizes",
    title: "Каковы основные размеры заготовки?",
    type: "dimensions",
    fields: [
      {
        name: "thickness",
        label: "Толщина металла (мм)",
        placeholder: "Например: 2",
      },
      { name: "length", label: "Длина (мм)", placeholder: "Например: 1200" },
      { name: "width", label: "Ширина (мм)", placeholder: "Например: 800" },
    ],
  },
  {
    id: "material",
    title: "Какой материал необходимо вальцевать?",
    type: "radio",
    field: "material",
    options: ["Титан", "Нержавеющая сталь", "Алюминий", "Другой (укажите)"],
    withOther: {
      trigger: "Другой (укажите)",
      field: "materialOther",
      placeholder: "Укажите материал",
    },
  },
  {
    id: "docs",
    title: "Есть ли у вас техническая документация?",
    type: "radio",
    field: "docs",
    options: [
      "Да, есть готовый чертеж",
      "Есть эскиз или набросок",
      "Нет, нужна помощь в разработке",
    ],
  },
  {
    id: "contact",
    title: "Оставьте контактные данные — мы свяжемся с вами",
    type: "contact",
    fields: [
      {
        name: "name",
        label: "Ваше имя *",
        type: "text",
        placeholder: "Ваше имя *",
      },
      {
        name: "phone",
        label: "Телефон *",
        type: "tel",
        placeholder: "Телефон *",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email (необязательно)",
      },
    ],
  },
];

const INITIAL_VALUES = {
  whatToMake: "",
  thickness: "",
  length: "",
  width: "",
  material: "",
  materialOther: "",
  docs: "",
  name: "",
  email: "",
  phone: "",
};

const inputBase =
  "w-full rounded-md border border-[color:var(--c-border)] bg-[color:var(--c-surface)] px-4 py-3 text-[18px] text-[color:var(--c-text-strong)] placeholder:text-[color:var(--c-text-muted)] focus:outline-none focus:border-[color:var(--c-primary)]";
const labelBase = "mb-2 text-[16px] text-[color:var(--c-text-strong)]";

function ProgressDots({ total, current }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <div
            key={i}
            className={[
              "h-[8px] w-[8px] rounded-full transition",
              active
                ? "bg-[color:var(--c-primary)]"
                : done
                ? "bg-[color:var(--c-border-strong)]"
                : "bg-[color:var(--c-border)]",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

function RadioGroup({ value, options, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const checked = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              "flex w-full items-center justify-between rounded-md border px-4 py-4 text-left transition",
              checked
                ? "border-[color:var(--c-primary)] bg-[color:var(--c-surface)] shadow-sm"
                : "border-[color:var(--c-border)] bg-[color:var(--c-surface)]/70 hover:shadow-sm hover:border-[color:var(--c-border-strong)]",
            ].join(" ")}
          >
            <span
              className="text-[18px] font-normal text-[color:var(--c-text-strong)]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {opt}
            </span>
            <span
              className={[
                "flex h-[18px] w-[18px] items-center justify-center rounded-full border transition",
                checked
                  ? "border-[color:var(--c-primary)]"
                  : "border-[color:var(--c-border-strong)]",
              ].join(" ")}
            >
              <span
                className={[
                  "h-[10px] w-[10px] rounded-full transition",
                  checked ? "bg-[color:var(--c-primary)]" : "bg-transparent",
                ].join(" ")}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}

const Kviz = () => {
  const steps = useMemo(() => QUIZ_STEPS, []);
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "idle", text: "" });
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const current = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const setField = (name, next) => {
    setValues((prev) => ({ ...prev, [name]: next }));
  };

  const goNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goPrev = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const isStepValid = () => {
    if (!current) return false;
    if (current.type === "text") {
      return values[current.field].trim().length > 0;
    }
    if (current.type === "dimensions") {
      return (
        String(values.thickness).trim() !== "" &&
        String(values.length).trim() !== "" &&
        String(values.width).trim() !== ""
      );
    }
    if (current.type === "radio") {
      if (!values[current.field]) return false;
      if (current.withOther && values[current.field] === current.withOther.trigger) {
        return values[current.withOther.field].trim().length > 0;
      }
      return true;
    }
    if (current.type === "contact") {
      return values.name.trim() && values.phone.trim();
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isPolicyAccepted) return;
    setIsSubmitting(true);
    setSubmitStatus({ type: "sending", text: STATUS_SENDING_TEXT });

    try {
      const formData = new FormData();
      formData.append("subject", FORM_SUBJECT);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("message", FORM_MESSAGE_TEMPLATE(values));
      formData.append("quiz_payload", JSON.stringify(values));

      const result = await sendForm(formData);

      if (result.ok) {
        setSubmitStatus({ type: "success", text: STATUS_SUCCESS_TEXT });
        setStepIndex(0);
        setValues(INITIAL_VALUES);
        window.setTimeout(() => setSubmitStatus({ type: "idle", text: "" }), 3500);
      } else {
        if (result.error === "missing_key") {
          setSubmitStatus({ type: "error", text: STATUS_ERROR_NO_KEY_TEXT });
          return;
        }
        setSubmitStatus({
          type: "error",
          text: result.error ? STATUS_ERROR_WITH_MESSAGE(result.error) : STATUS_ERROR_DEFAULT_TEXT,
        });
      }
    } catch {
      setSubmitStatus({ type: "error", text: STATUS_ERROR_DEFAULT_TEXT });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="rounded-md bg-[#f3f3f8] py-3 px-3 sm:py-6 xl:py-8"
      style={{
        color: TEXT_COLOR,
        boxShadow:
          "inset 80px 0 80px -60px rgba(0,0,0,0.08), inset -80px 0 80px -60px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex flex-col items-center text-center">
        <SectionTitle className="mb-2 xl:mb-2" style={{ fontFamily: "Roboto, sans-serif" }}>
          {SECTION_TITLE}
        </SectionTitle>
        <p
          className="mb-4 max-w-[720px] text-[16px] sm:text-[17px] xl:mb-4 xl:text-[18px] text-[color:var(--c-text-strong)]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {SECTION_DESCRIPTION}
        </p>
        <div className="flex w-full max-w-[900px] flex-col rounded-xl bg-[color:var(--c-bg)] p-6 sm:p-8 xl:p-10">
          <ProgressDots total={steps.length} current={stepIndex} />
          <div
            className="mb-6 text-center text-[18px] font-normal text-[color:var(--c-text-strong)] sm:text-[19px] xl:mb-8 xl:text-[20px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {current.title}
          </div>
          <div className="text-left">
            {current.type === "text" && (
              <textarea
                value={values[current.field]}
                onChange={(e) => setField(current.field, e.target.value)}
                placeholder={current.placeholder}
                className={[inputBase, "min-h-[140px] resize-none"].join(" ")}
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
            )}
            {current.type === "dimensions" && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {current.fields.map((f) => (
                  <div key={f.name} className="flex flex-col">
                    <div className={labelBase} style={{ fontFamily: "Roboto, sans-serif" }}>
                      {f.label}
                    </div>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={values[f.name]}
                      onChange={(e) => setField(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      className={inputBase}
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    />
                  </div>
                ))}
              </div>
            )}
            {current.type === "radio" && (
              <div>
                <RadioGroup
                  value={values[current.field]}
                  options={current.options}
                  onChange={(opt) => setField(current.field, opt)}
                />
                {current.withOther &&
                  values[current.field] === current.withOther.trigger && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={values[current.withOther.field]}
                        onChange={(e) => setField(current.withOther.field, e.target.value)}
                        placeholder={current.withOther.placeholder}
                        className={inputBase}
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      />
                    </div>
                  )}
              </div>
            )}
            {current.type === "contact" && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {current.fields.map((f) => (
                    <div key={f.name} className="flex flex-col">
                      <div className={labelBase} style={{ fontFamily: "Roboto, sans-serif" }}>
                        {f.label}
                      </div>
                      <input
                        type={f.type}
                        value={values[f.name]}
                        onChange={(e) => setField(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className={inputBase}
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      />
                    </div>
                  ))}
                </div>
                <label className="flex items-start gap-3 text-[14px] text-[color:var(--c-text-strong)] sm:text-[15px]">
                  <input
                    type="checkbox"
                    checked={isPolicyAccepted}
                    onChange={(e) => setIsPolicyAccepted(e.target.checked)}
                    className="mt-1 h-[18px] w-[18px] rounded border border-[color:var(--c-border-strong)] accent-[color:var(--c-primary)]"
                  />
                  <span style={{ fontFamily: "Roboto, sans-serif" }}>
                    Согласен с{" "}
                    <button
                      type="button"
                      onClick={() => setIsPolicyOpen(true)}
                      className="text-[color:var(--c-primary)] underline underline-offset-2 transition hover:opacity-70"
                    >
                      политикой конфиденциальности
                    </button>
                  </span>
                </label>
              </div>
            )}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={stepIndex === 0}
              className={[
                "rounded-md border border-[color:var(--c-primary)] px-6 py-3 text-[18px] transition",
                stepIndex === 0
                  ? "cursor-not-allowed opacity-40 bg-[color:var(--c-primary)] text-[color:var(--c-surface)]"
                  : "bg-[color:var(--c-primary)] text-[color:var(--c-surface)] hover:bg-[color:var(--c-primary-soft)]",
              ].join(" ")}
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {BUTTON_BACK_TEXT}
            </button>
            {!isLast ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!isStepValid()}
                className={[
                  "rounded-md border border-[color:var(--c-primary)] bg-[color:var(--c-primary)] px-6 py-3 text-[18px] text-[color:var(--c-surface)] transition",
                  !isStepValid() ? "cursor-not-allowed opacity-50" : "hover:bg-[color:var(--c-primary-soft)]",
                ].join(" ")}
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {BUTTON_NEXT_TEXT}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting || !isPolicyAccepted}
                className={[
                  "rounded-md border border-[color:var(--c-primary)] bg-[color:var(--c-primary)] px-6 py-3 text-[18px] text-[color:var(--c-surface)] transition",
                  !isStepValid() || isSubmitting || !isPolicyAccepted
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-[color:var(--c-primary-soft)]",
                ].join(" ")}
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {isSubmitting ? BUTTON_SENDING_TEXT : BUTTON_SUBMIT_TEXT}
              </button>
            )}
          </div>
          {submitStatus.text && (
            <div
              className={[
                "mt-4 text-center text-[14px] sm:text-[15px]",
                submitStatus.type === "success"
                  ? "text-[color:var(--c-primary)]"
                  : submitStatus.type === "error"
                  ? "text-red-600"
                  : "text-[color:var(--c-text-strong)]",
              ].join(" ")}
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {submitStatus.text}
            </div>
          )}
        </div>
      </div>
      <PrivacyPolicyModal
        open={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />
    </section>
  );
};

export default Kviz;
