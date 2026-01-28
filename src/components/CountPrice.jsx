import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import { sendForm } from "../api/forms";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const SECTION_TITLE = "Рассчитаем стоимость изготовления по вашему чертежу";

const INPUT_NAME_PLACEHOLDER = "Ваше имя *";
const INPUT_PHONE_PLACEHOLDER = "Телефон *";
const FILE_UPLOAD_PLACEHOLDER = "Прикрепить чертёж";
const BUTTON_SUBMIT_TEXT = "Отправить";

const STATUS_SENDING_TEXT = "Отправка...";
const STATUS_SUCCESS_TEXT = "Спасибо, ваша заявка отправлена. Скоро с вами свяжемся.";
const STATUS_ERROR_NO_KEY_TEXT = "Ошибка: VITE_WEB3FORMS_KEY не найден в .env (перезапусти dev-сервер)";
const STATUS_NETWORK_ERROR_TEXT = "Ошибка соединения";
const STATUS_DEFAULT_ERROR_TEXT = "Ошибка отправки";
const STATUS_HTTP_ERROR_TEMPLATE = (code) => `Ошибка HTTP: ${code}`;
const STATUS_BACKEND_ERROR_TEMPLATE = (message) => `Ошибка: ${message}`;

const FORM_SUBJECT = "Заявка на расчет по чертежу";
const FORM_MESSAGE_TEMPLATE = (name, phone, fileName) => `Заявка на расчет по чертежу
Имя: ${name}
Телефон: ${phone}
Файл: ${fileName || "не прикреплён"}
`;

const CountPrice = () => {
  const [formValues, setFormValues] = useState({ name: "", phone: "" });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPolicyAccepted) return;

    setStatus(STATUS_SENDING_TEXT);

    try {
      const formData = new FormData();
      formData.append("subject", FORM_SUBJECT);

      formData.append("name", formValues.name);
      formData.append("phone", formValues.phone);
      formData.append(
        "message",
        FORM_MESSAGE_TEMPLATE(formValues.name, formValues.phone, file?.name)
      );

      if (file) {
        formData.append("file", file, file.name);
      }

      const result = await sendForm(formData);
      if (!result.ok) {
        if (result.error === "missing_key") {
          setStatus(STATUS_ERROR_NO_KEY_TEXT);
          return;
        }
        if (result.response && !result.response.ok) {
          setStatus(STATUS_HTTP_ERROR_TEMPLATE(result.response.status));
          return;
        }
        if (result.error) {
          setStatus(STATUS_BACKEND_ERROR_TEMPLATE(result.error));
          return;
        }
        setStatus(STATUS_DEFAULT_ERROR_TEXT);
        return;
      }

      setStatus(STATUS_SUCCESS_TEXT);
      setFormValues({ name: "", phone: "" });
      setFile(null);
      event.target.reset();
    } catch (error) {
      console.error(error);
      setStatus(STATUS_NETWORK_ERROR_TEXT);
    }
  };

  return (
    <section
      style={{
        fontFamily: "Roboto, sans-serif",
        boxShadow:
          "inset 80px 0 80px -60px rgba(0,0,0,0.08), inset -80px 0 80px -60px rgba(0,0,0,0.08)",
      }}
      className="rounded-md bg-[#f3f3f8] py-6 px-3 sm:py-8 xl:py-12"
    >
      <div className="flex flex-col items-center text-center">
        <SectionTitle className="mb-6 xl:mb-10" style={{ fontFamily: "Roboto, sans-serif" }}>
          {SECTION_TITLE}
        </SectionTitle>

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
            className="w-full rounded-md border px-4 py-3 text-[16px] sm:text-[17px] xl:w-[220px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
            required
          />

          <input
            type="tel"
            placeholder={INPUT_PHONE_PLACEHOLDER}
            name="phone"
            value={formValues.phone}
            onChange={handleChange("phone")}
            className="w-full rounded-md border px-4 py-3 text-[16px] sm:text-[17px] xl:w-[220px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
            required
          />

          <label
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[color:var(--c-primary)] px-4 py-3 text-[16px] transition bg-[color:var(--c-primary)] text-[color:var(--c-surface)] sm:text-[17px] xl:w-auto xl:px-5 xl:text-[18px] hover:bg-[color:var(--c-primary-soft)]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <input type="file" className="hidden" onChange={handleFileChange} />
            {file ? file.name : FILE_UPLOAD_PLACEHOLDER}
          </label>

          <button
            type="submit"
            disabled={!isPolicyAccepted}
            className={[
              "w-full rounded-md border border-[color:var(--c-primary)] bg-[color:var(--c-primary)] px-6 py-3 text-[16px] text-[color:var(--c-surface)] transition sm:text-[17px] xl:w-auto xl:text-[18px]",
              !isPolicyAccepted ? "cursor-not-allowed opacity-60" : "hover:bg-[color:var(--c-primary-soft)]",
            ].join(" ")}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {BUTTON_SUBMIT_TEXT}
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
            Согласен с
            <button
              type="button"
              onClick={() => setIsPolicyOpen(true)}
              className="text-[color:var(--c-primary)] underline underline-offset-2 transition hover:opacity-70"
            >
              политикой конфиденциальности
            </button>
          </span>
        </label>

        {status && (
          <p className="mt-4 text-sm text-[color:var(--c-text)]" style={{ fontFamily: "Roboto, sans-serif" }}>
            {status}
          </p>
        )}
      </div>
      <PrivacyPolicyModal
        open={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />
    </section>
  );
};

export default CountPrice;
