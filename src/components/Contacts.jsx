import {
  FaEnvelope,
  FaPhoneAlt,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

const PHONE_NUMBER = "8(4932)29-59-97";
const PHONE_HREF = "tel:+74932295997";

const EMAIL_ADDRESS = "stal-ivanovo@rambler.ru";
const EMAIL_HREF = "mailto:stal-ivanovo@rambler.ru";

const WHATSAPP_HREF = "https://wa.me/0000000000";
const WHATSAPP_ARIA_LABEL = "WhatsApp";

const TELEGRAM_HREF = "https://t.me/your_username";
const TELEGRAM_ARIA_LABEL = "Telegram";

const MAP_TITLE = "Map";
const MAP_SRC =
  "https://yandex.ru/map-widget/v1/?text=%D0%B3.%20%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%BE%2C%20%D0%A2%D0%BE%D1%80%D1%84%D1%8F%D0%BD%D0%BE%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BE%D0%BA%2C%20%D0%B4.%2065";

const Contacts = () => {
  return (
    <section id="contacts" className="py-12 sm:py-14 xl:py-16">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-4 sm:px-6 xl:grid-cols-2 xl:gap-12">
        <div className="flex flex-col justify-center gap-8 text-[color:var(--c-text-strong)] xl:gap-10">
          <div className="flex items-center gap-6">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[color:var(--c-surface-soft)] text-[20px] text-[color:var(--c-text)] sm:h-[60px] sm:w-[60px] sm:text-[22px] xl:h-[66px] xl:w-[66px] xl:text-[22px]">
              <FaPhoneAlt />
            </div>
            <a
              href={PHONE_HREF}
              className="text-[18px] transition hover:opacity-70 sm:text-[20px] xl:text-[22px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {PHONE_NUMBER}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[color:var(--c-surface-soft)] text-[20px] text-[color:var(--c-text)] sm:h-[60px] sm:w-[60px] sm:text-[22px] xl:h-[66px] xl:w-[66px] xl:text-[22px]">
              <FaEnvelope />
            </div>
            <a
              href={EMAIL_HREF}
              className="text-[18px] transition hover:opacity-70 sm:text-[20px] xl:text-[22px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {EMAIL_ADDRESS}
            </a>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[color:var(--c-surface-soft)] text-[22px] text-[color:var(--c-text)] transition hover:scale-105 sm:h-[60px] sm:w-[60px] sm:text-[24px] xl:h-[66px] xl:w-[66px] xl:text-[24px]"
              aria-label={WHATSAPP_ARIA_LABEL}
            >
              <FaWhatsapp />
            </a>
            <a
              href={TELEGRAM_HREF}
              target="_blank"
              rel="noreferrer"
              className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[color:var(--c-surface-soft)] text-[22px] text-[color:var(--c-text)] transition hover:scale-105 sm:h-[60px] sm:w-[60px] sm:text-[24px] xl:h-[66px] xl:w-[66px] xl:text-[24px]"
              aria-label={TELEGRAM_ARIA_LABEL}
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>
        <div className="h-[280px] w-full overflow-hidden rounded-md sm:h-[340px] md:h-[380px] xl:h-[420px]">
          <iframe
            title={MAP_TITLE}
            src={MAP_SRC}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            className="block"
          />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
