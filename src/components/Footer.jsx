import { FaMapMarkerAlt, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useModal } from "./useModal";
import logo from "../assets/logo.png";

const PHONE_NUMBER = "8(4932)29-59-97";
const PHONE_HREF = "tel:+74932295997";

const EMAIL_ADDRESS = "stal-ivanovo@rambler.ru";
const EMAIL_HREF = "mailto:stal-ivanovo@rambler.ru";

const BUTTON_TEXT = "Получить консультацию";

const NAV_LINKS = [
  { href: "#top", label: "Главная" },
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Услуги" },
  { href: "#projects", label: "Проекты" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

const MESSENGERS_LABEL = "Мессенджеры";

const TELEGRAM_HREF = "https://t.me/your_username";
const TELEGRAM_ARIA_LABEL = "Telegram";

const WHATSAPP_HREF = "https://wa.me/0000000000";
const WHATSAPP_ARIA_LABEL = "WhatsApp";

const ADDRESS_TEXT = "г. Иваново, Торфяной переулок, д. 65";

const Footer = () => {
  const { open } = useModal();
  return (
    <footer className="w-full border-t border-[color:var(--c-border)] py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <img
            src={logo}
            alt="Логотип"
            className="h-[112px] w-auto max-w-full cursor-pointer select-none object-contain sm:h-[128px] md:h-[140px] lg:h-[152px] xl:h-[168px]"
            draggable={false}
          />
          <div className="flex items-center gap-3 text-[color:var(--c-text-strong)]">
            <span className="h-2 w-2 rounded-full bg-[color:var(--c-primary)]" />
            <a
              href={PHONE_HREF}
              className="text-[18px] transition hover:opacity-70 sm:text-[20px] xl:text-[22px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {PHONE_NUMBER}
            </a>
          </div>
          <button
            type="button"
            onClick={open}
            className="w-full rounded-full border border-[color:var(--c-primary)] px-6 py-3 text-[16px] hover:bg-[color:var(--c-primary-soft)] transition bg-[color:var(--c-primary)] text-[color:var(--c-surface)] cursor-pointer sm:w-auto sm:text-[17px] xl:px-8 xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {BUTTON_TEXT}
          </button>
        </div>
        <div className="mt-8 flex items-center justify-between text-[color:var(--c-text-strong)] xl:mt-10">
          <nav
            className="flex flex-wrap gap-4 text-[16px] sm:gap-6 sm:text-[17px] xl:gap-10 xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {NAV_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="transition hover:text-[color:var(--c-primary)] hover:drop-shadow-[0_2px_6px_var(--c-shadow)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 text-[color:var(--c-text-strong)] sm:flex-row sm:items-center sm:justify-between xl:mt-10">
          <a
            href={EMAIL_HREF}
            className="text-[16px] transition hover:opacity-70 sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {EMAIL_ADDRESS}
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <span
              className="text-[16px] sm:text-[17px] xl:text-[18px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              {MESSENGERS_LABEL}
            </span>
            <div className="flex items-center gap-3 text-[18px] sm:text-[19px] xl:text-[20px]">
              <a
                href={TELEGRAM_HREF}
                target="_blank"
                rel="noreferrer"
                className="transition hover:opacity-70"
                aria-label={TELEGRAM_ARIA_LABEL}
              >
                <FaTelegramPlane />
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className="transition hover:opacity-70"
                aria-label={WHATSAPP_ARIA_LABEL}
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div
            className="flex items-center gap-2 text-[16px] sm:text-[17px] xl:text-[18px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <span>{ADDRESS_TEXT}</span>
            <span className="text-[16px] sm:text-[17px] xl:text-[18px]">
              <FaMapMarkerAlt />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
