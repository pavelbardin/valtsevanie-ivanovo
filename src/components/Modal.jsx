import { useState } from "react";

const MODAL_TITLE = "Оставьте заявку";
const BUTTON_SUBMIT_TEXT = "Отправить";
const BUTTON_CLOSE_LABEL = "Закрыть";
const PLACEHOLDER_NAME = "Ваше имя";
const PLACEHOLDER_PHONE = "Телефон";
const PLACEHOLDER_EMAIL = "Email";
const STATUS_SENDING = "Отправка...";
const STATUS_SUCCESS = "Заявка отправлена";
const STATUS_ERROR = "Ошибка отправки";
const STATUS_CONNECTION_ERROR = "Ошибка соединения";
const FORM_SUBJECT = "Новая заявка с модального окна";

const Modal = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [status, setStatus] = useState("");

  if (!open) return null;

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(STATUS_SENDING);

    const formData = new FormData();
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
    formData.append("name", formValues.name);
    formData.append("phone", formValues.phone);
    formData.append("email", formValues.email);
    formData.append("subject", FORM_SUBJECT);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus(STATUS_SUCCESS);
        setFormValues({ name: "", phone: "", email: "" });

        setTimeout(() => {
          setStatus("");
          onClose();
        }, 1200);
      } else {
        setStatus(STATUS_ERROR);
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
            required
            value={formValues.email}
            onChange={handleChange("email")}
            className="w-full rounded-md border px-4 py-3 text-[16px] sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          />

          <button
            type="submit"
            className="mt-2 rounded-md border border-[color:var(--c-primary)] bg-[color:var(--c-primary)] px-6 py-3 text-[16px] text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)] sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {BUTTON_SUBMIT_TEXT}
          </button>

          {status && (
            <p className="text-center text-sm text-[color:var(--c-text)]">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
