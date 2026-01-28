import { useState } from "react";
import { sendForm } from "../api/forms";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const MODAL_TITLE = "Оставьте заявку";
const BUTTON_SUBMIT_TEXT = "Отправить";
const BUTTON_CLOSE_LABEL = "Закрыть";
const PLACEHOLDER_NAME = "Ваше имя *";
const PLACEHOLDER_PHONE = "Телефон *";
const PLACEHOLDER_EMAIL = "Email (необязательно)";
const PLACEHOLDER_QUESTION = "Ваш вопрос";
const STATUS_SENDING = "Отправка...";
const STATUS_SUCCESS = "Спасибо, ваша заявка отправлена. Скоро с вами свяжемся.";
const STATUS_ERROR = "Ошибка отправки";
const STATUS_CONNECTION_ERROR = "Ошибка соединения";
const FORM_SUBJECT = "Новая заявка с модального окна";
const FORM_MESSAGE_TEMPLATE = (values) => `Заявка с модального окна
Имя: ${values.name}
Телефон: ${values.phone}
Email: ${values.email}
Вопрос: ${values.question || "не указан"}
`;

const Modal = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    question: "",
  });
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const [status, setStatus] = useState("");

  if (!open) return null;

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPolicyAccepted) return;
    setStatus(STATUS_SENDING);

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("phone", formValues.phone);
    formData.append("email", formValues.email);
    formData.append("subject", FORM_SUBJECT);
    formData.append("question", formValues.question);
    formData.append("message", FORM_MESSAGE_TEMPLATE(formValues));

    try {
      const result = await sendForm(formData);
      if (result.ok) {
        setStatus(STATUS_SUCCESS);
        setFormValues({ name: "", phone: "", email: "", question: "" });

        setTimeout(() => {
          setStatus("");
          onClose();
        }, 1200);
      } else {
        setStatus(result.message || STATUS_ERROR);
      }
    } catch (error) {
      console.error(error);
      setStatus(STATUS_CONNECTION_ERROR);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--c-text-strong)]/40 p-4">
      <div className="relative w-full max-w-[520px] rounded-md bg-[color:var(--c-surface)] p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[16px] text-[color:var(--c-text-strong)] transition hover:opacity-70 sm:text-[18px]"
          aria-label={BUTTON_CLOSE_LABEL}
        >
          ✕
        </button>

        <h3
          className="mb-4 text-center text-[20px] font-bold text-[color:var(--c-text-strong)] sm:mb-6 sm:text-[22px] xl:text-[24px]"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {MODAL_TITLE}
        </h3>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={PLACEHOLDER_NAME}
            name="name"
            required
            value={formValues.name}
            onChange={handleChange("name")}
            className="w-full rounded-md border px-4 py-3 text-[16px] sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />

          <input
            type="tel"
            placeholder={PLACEHOLDER_PHONE}
            name="phone"
            required
            value={formValues.phone}
            onChange={handleChange("phone")}
            className="w-full rounded-md border px-4 py-3 text-[16px] sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />

          <input
            type="email"
            placeholder={PLACEHOLDER_EMAIL}
            name="email"
            value={formValues.email}
            onChange={handleChange("email")}
            className="w-full rounded-md border px-4 py-3 text-[16px] sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />

          <textarea
            placeholder={PLACEHOLDER_QUESTION}
            name="question"
            value={formValues.question}
            onChange={handleChange("question")}
            className="w-full min-h-[120px] rounded-md border px-4 py-3 text-[16px] sm:min-h-[140px] sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />

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

          <button
            type="submit"
            disabled={!isPolicyAccepted || status === STATUS_SENDING}
            className={[
              "mt-2 rounded-md border border-[color:var(--c-primary)] bg-[color:var(--c-primary)] px-6 py-3 text-[16px] text-[color:var(--c-surface)] transition sm:text-[17px] xl:text-[18px]",
              !isPolicyAccepted || status === STATUS_SENDING
                ? "cursor-not-allowed opacity-60"
                : "hover:bg-[color:var(--c-primary-soft)]",
            ].join(" ")}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {BUTTON_SUBMIT_TEXT}
          </button>

          {status && (
            <p className="text-center text-sm text-[color:var(--c-text)]">{status}</p>
          )}
        </form>
      </div>
      <PrivacyPolicyModal
        open={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />
    </div>
  );
};

export default Modal;
