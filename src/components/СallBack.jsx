import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import { sendForm } from "../api/forms";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import { reachGoal } from "../utils/metrika";

const SECTION_TITLE = "Не нашли ответ на свой вопрос?";
const SECTION_DESCRIPTION =
  "Оставьте контактные данные, а мы свяжемся с вами и ответим на вопросы";
const INPUT_NAME_PLACEHOLDER = "Ваше имя *";
const INPUT_PHONE_PLACEHOLDER = "Телефон *";
const BUTTON_SUBMIT_TEXT = "Отправить";
const BUTTON_SENDING_TEXT = "Отправка...";
const STATUS_SENDING_TEXT = "Отправка...";
const STATUS_SUCCESS_TEXT = "Спасибо, ваша заявка отправлена. Скоро с вами свяжемся.";
const STATUS_ERROR_NO_KEY_TEXT =
  "Ошибка: ключ Web3Forms не найден (VITE_WEB3FORMS_KEY)";
const STATUS_ERROR_DEFAULT_TEXT = "Ошибка отправки. Попробуйте позже.";
const STATUS_NETWORK_ERROR_TEXT =
  "Ошибка соединения. Попробуйте позже.";

const FORM_SUBJECT = "Заявка на обратный звонок";
const FORM_MESSAGE_TEMPLATE = (name, phone) => `
Заявка на обратный звонок
Имя: ${name}
Телефон: ${phone}
`;
const FORM_ERROR_WITH_MESSAGE_TEMPLATE = (message) => `Ошибка: ${message}`;


const CallBack = () => {
  const [formValues, setFormValues] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPolicyAccepted) return;

    setStatus({ type: "sending", text: STATUS_SENDING_TEXT });

    try {
      const formData = new FormData();
      formData.append("subject", FORM_SUBJECT);

      formData.append("name", formValues.name);
      formData.append("phone", formValues.phone);
      formData.append(
        "message",
        FORM_MESSAGE_TEMPLATE(formValues.name, formValues.phone)
      );

      const result = await sendForm(formData);

      if (result.ok) {
        reachGoal("zvonok");
        reachGoal("all");
        setStatus({ type: "success", text: STATUS_SUCCESS_TEXT });
        setFormValues({ name: "", phone: "" });
        event.target.reset();

        window.setTimeout(() => {
          setStatus({ type: "idle", text: "" });
        }, 3500);
      } else {
        if (result.error === "missing_key") {
          setStatus({ type: "error", text: STATUS_ERROR_NO_KEY_TEXT });
          return;
        }
        setStatus({
          type: "error",
          text: result.error ? FORM_ERROR_WITH_MESSAGE_TEMPLATE(result.error) : STATUS_ERROR_DEFAULT_TEXT,
        });
      }
    } catch {
      setStatus({ type: "error", text: STATUS_NETWORK_ERROR_TEXT });
    }
  };

  return (
    <section className="py-12 px-3 sm:py-14 xl:py-16 border-t border-[color:var(--c-border)]" >
      <div className="flex flex-col items-center text-center">
        <SectionTitle
          className="mb-3 text-[color:var(--c-text-strong)] xl:mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {SECTION_TITLE}
        </SectionTitle>

        <p
          className="mb-6 text-[16px] text-[color:var(--c-text-strong)] sm:text-[17px] xl:mb-10 xl:text-[18px]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {SECTION_DESCRIPTION}
        </p>

        <form
          className="flex w-full flex-col items-center gap-4 sm:max-w-[520px] xl:max-w-none xl:flex-row xl:items-center xl:justify-center xl:gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder={INPUT_NAME_PLACEHOLDER}
            name="name"
            value={formValues.name}
            onChange={handleChange("name")}
            required
            className="w-full rounded-md border border-[color:var(--c-border)] px-4 py-3 text-[16px] text-[color:var(--c-text-strong)] placeholder:text-[color:var(--c-text-muted)] focus:outline-none focus:border-[color:var(--c-primary)] sm:text-[17px] xl:w-[220px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />

          <input
            type="tel"
            placeholder={INPUT_PHONE_PLACEHOLDER}
            name="phone"
            value={formValues.phone}
            onChange={handleChange("phone")}
            required
            className="w-full rounded-md border border-[color:var(--c-border)] px-4 py-3 text-[16px] text-[color:var(--c-text-strong)] placeholder:text-[color:var(--c-text-muted)] focus:outline-none focus:border-[color:var(--c-primary)] sm:text-[17px] xl:w-[220px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />

          <button
            type="submit"
            disabled={status.type === "sending" || !isPolicyAccepted}
            className={[
              "w-full rounded-md border border-[color:var(--c-primary)] bg-[color:var(--c-primary)] px-6 py-3 text-[16px] text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)] sm:text-[17px] xl:w-auto xl:text-[18px]",
              status.type === "sending" || !isPolicyAccepted ? "cursor-not-allowed opacity-70" : "",
            ].join(" ")}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {status.type === "sending"
              ? BUTTON_SENDING_TEXT
              : BUTTON_SUBMIT_TEXT}
          </button>
        </form>

        <label className="mt-4 flex items-start gap-3 text-[14px] text-[color:var(--c-text-strong)] sm:text-[15px]">
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

        {status.text ? (
          <div
            className={[
              "mt-4 text-center text-[14px] sm:text-[15px]",
              status.type === "success"
                ? "text-[color:var(--c-primary)]"
                : status.type === "error"
                ? "text-red-600"
                : "text-[color:var(--c-text-strong)]",
            ].join(" ")}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {status.text}
          </div>
        ) : null}
      </div>
      <PrivacyPolicyModal
        open={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />
    </section>
  );
};

export default CallBack;
