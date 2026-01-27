import { useEffect, useState } from "react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { useModal } from "./useModal";
import logo from "../assets/logo.png";

const TELEGRAM_HREF = "https://t.me/your_username";
const TELEGRAM_ARIA_LABEL = "Telegram";

const WHATSAPP_HREF = "https://wa.me/0000000000";
const WHATSAPP_ARIA_LABEL = "WhatsApp";

const PHONE_NUMBER = "8(4932)29-59-97";
const PHONE_HREF = "tel:+74932295997";

const EMAIL_ADDRESS = "stal-ivanovo@rambler.ru";
const EMAIL_HREF = "mailto:stal-ivanovo@rambler.ru";

const BUTTON_CALLBACK_TEXT = "Заказать звонок";
const MOBILE_MENU_TITLE = "Меню";
const MOBILE_MENU_CLOSE_TEXT = "Закрыть";
const MOBILE_MENU_CLOSE_ARIA = "Закрыть меню";
const MOBILE_MENU_OPEN_ARIA = "Открыть меню";

const NAV_LINKS = [
  { href: "#top", label: "Главная" },
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Услуги" },
  { href: "#projects", label: "Проекты" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

const Header = () => {
  const { open } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[color:var(--c-surface)] xl:static">
        <div className="border-b-[0.5px] border-[color:var(--c-border)] xl:border-b-0">
          <div className="mx-auto max-w-[1200px] py-2 xl:py-0">
            <div className="flex items-center justify-between">
              <img
                src={logo}
                alt="Логотип"
                className="h-[112px] w-auto max-w-full cursor-pointer select-none object-contain sm:h-[128px] md:h-[140px] lg:h-[152px] xl:h-[168px]"
                draggable={false}
                onClick={closeMenu}
              />
              <div className="hidden xl:flex items-center gap-6">
                <div className="flex items-center gap-5 text-[24px]">
                  <a
                    href={TELEGRAM_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-[color:var(--c-primary)] hover:drop-shadow-[0_2px_6px_var(--c-shadow)]"
                    aria-label={TELEGRAM_ARIA_LABEL}
                  >
                    <FaTelegramPlane />
                  </a>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-[color:var(--c-primary)] hover:drop-shadow-[0_2px_6px_var(--c-shadow)]"
                    aria-label={WHATSAPP_ARIA_LABEL}
                  >
                    <FaWhatsapp />
                  </a>
                </div>
                <div
                  className="flex flex-col items-start leading-tight text-[14px] font-medium"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <a
                    href={PHONE_HREF}
                    className="transition hover:text-[color:var(--c-primary)]"
                  >
                    {PHONE_NUMBER}
                  </a>
                  <a
                    href={EMAIL_HREF}
                    className="mt-0.5 transition hover:text-[color:var(--c-primary)]"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={open}
                  className="border-0 bg-[color:var(--c-primary)] px-5 py-1.5 text-[14px] font-normal text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {BUTTON_CALLBACK_TEXT}
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen((v) => !v)}
                className="xl:hidden inline-flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[color:var(--c-border)] bg-white/60 transition hover:bg-white"
                aria-label={isMenuOpen ? MOBILE_MENU_CLOSE_ARIA : MOBILE_MENU_OPEN_ARIA}
                aria-expanded={isMenuOpen}
              >
                <div className="relative h-[16px] w-[20px]">
                  <span
                    className={[
                      "absolute left-0 top-0 h-[2px] w-full bg-[color:var(--c-text-strong)] transition",
                      isMenuOpen ? "translate-y-[7px] rotate-45" : "",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 top-[7px] h-[2px] w-full bg-[color:var(--c-text-strong)] transition",
                      isMenuOpen ? "opacity-0" : "",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-0 top-[14px] h-[2px] w-full bg-[color:var(--c-text-strong)] transition",
                      isMenuOpen ? "translate-y-[-7px] -rotate-45" : "",
                    ].join(" ")}
                  />
                </div>
              </button>
            </div>

            {isMenuOpen && (
              <div className="xl:hidden">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="fixed inset-0 z-40 bg-black/30"
                  aria-label={MOBILE_MENU_CLOSE_ARIA}
                />
                <div className="fixed right-0 top-0 z-50 h-full w-[300px] max-w-[90vw] bg-[color:var(--c-surface)] shadow-xl">
                  <div className="flex h-full flex-col p-5">
                    <div className="flex items-center justify-between">
                      <div
                        className="text-[17px] font-bold text-[color:var(--c-text-strong)]"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {MOBILE_MENU_TITLE}
                      </div>
                      <button
                        type="button"
                        onClick={closeMenu}
                        className="rounded-md border border-[color:var(--c-border)] px-3 py-2 text-[14px] transition hover:bg-white"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {MOBILE_MENU_CLOSE_TEXT}
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      {NAV_LINKS.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={closeMenu}
                          className="rounded-md border border-[color:var(--c-border)] bg-white/60 px-4 py-3 text-[17px] transition hover:bg-white hover:text-[color:var(--c-primary)]"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 border-t border-[color:var(--c-border)] pt-4">
                      <div className="flex items-center gap-5 text-[26px]">
                        <a
                          href={TELEGRAM_HREF}
                          target="_blank"
                          rel="noreferrer"
                          className="transition hover:text-[color:var(--c-primary)]"
                          aria-label={TELEGRAM_ARIA_LABEL}
                        >
                          <FaTelegramPlane />
                        </a>
                        <a
                          href={WHATSAPP_HREF}
                          target="_blank"
                          rel="noreferrer"
                          className="transition hover:text-[color:var(--c-primary)]"
                          aria-label={WHATSAPP_ARIA_LABEL}
                        >
                          <FaWhatsapp />
                        </a>
                      </div>
                      <div
                        className="mt-3 flex flex-col leading-tight text-[15px] font-medium"
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        <a
                          href={PHONE_HREF}
                          className="transition hover:text-[color:var(--c-primary)]"
                        >
                          {PHONE_NUMBER}
                        </a>
                        <a
                          href={EMAIL_HREF}
                          className="mt-2 transition hover:text-[color:var(--c-primary)]"
                        >
                          {EMAIL_ADDRESS}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          closeMenu();
                          open();
                        }}
                        className="mt-4 w-full border-0 bg-[color:var(--c-primary)] px-6 py-3 text-[16px] font-normal text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)]"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {BUTTON_CALLBACK_TEXT}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="hidden xl:block sticky top-0 z-50 w-full bg-[color:var(--c-surface)]">
        <div className="border-t-[2px] border-b-[2px] border-[color:var(--c-border)] py-2">
          <nav
            className="mx-auto flex max-w-[1200px] items-center justify-center gap-[40px] text-[18px] font-normal"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition duration-200 hover:text-[color:var(--c-primary)] hover:drop-shadow-[0_2px_6px_var(--c-shadow)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
