import { useEffect, useRef, useState } from "react";
import { useModal } from "./useModal";
import logo from "../../logo/logo.png";

const PHONE_NUMBER = "+7(903)-888-71-03";
const PHONE_HREF = "tel:+79038887103";

const EMAIL_ADDRESS = "dir.stal@mail.ru";
const EMAIL_HREF = "mailto:dir.stal@mail.ru";

const BUTTON_CALLBACK_TEXT = "Заказать звонок";
const MOBILE_MENU_TITLE = "Меню";
const MOBILE_MENU_CLOSE_TEXT = "Закрыть";
const MOBILE_MENU_CLOSE_ARIA = "Закрыть меню";
const MOBILE_MENU_OPEN_ARIA = "Открыть меню";

const NAV_LINKS = [
  { href: "#top", label: "Главная" },
  { href: "#about", label: "О компании" },
  { href: "#services", label: "Услуги" },
  { href: "#qa", label: "Вопросы" },
  { href: "#contacts", label: "Контакты" },
];

const Header = () => {
  const { open } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const topHeaderRef = useRef(null);
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const updateHeight = () => {
      if (!topHeaderRef.current) return;
      setTopHeaderHeight(topHeaderRef.current.offsetHeight || 0);
    };
    const handleScroll = () => setIsScrolled(window.scrollY >= topHeaderHeight);
    updateHeight();
    handleScroll();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topHeaderHeight]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        ref={topHeaderRef}
        className="sticky top-0 z-50 w-full bg-[color:var(--c-surface)] xl:static"
      >
        <div className="border-b-[0.5px] border-[color:var(--c-border)] xl:border-b-0">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 xl:px-0 py-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <img
                  src={logo}
                  alt="Логотип"
                  className="h-[56px] sm:h-[64px] md:h-[70px] lg:h-[76px] xl:h-[84px] w-auto object-contain select-none cursor-pointer"
                  draggable={false}
                  onClick={closeMenu}
                />
              </div>

              <div className="hidden xl:flex items-center gap-6 self-center">
                <div
                  className="flex flex-col items-start leading-tight text-[16px] font-medium xl:text-[18px]"
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
                  className="border-0 bg-[color:var(--c-primary)] px-6 py-2 text-[16px] font-normal text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)] xl:text-[17px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {BUTTON_CALLBACK_TEXT}
                </button>
              </div>

              <div className="xl:hidden flex items-center gap-4 self-center">
                <div
                  className="hidden min-[450px]:flex flex-col items-start leading-tight text-[12px] font-medium sm:text-[15px] md:text-[16px]"
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
                  className="border-0 bg-[color:var(--c-primary)] px-4 py-1.5 text-[12px] font-normal text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)] sm:px-5 sm:py-2 sm:text-[15px] md:text-[16px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {BUTTON_CALLBACK_TEXT}
                </button>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen((v) => !v)}
                  className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-md border border-[color:var(--c-border)] bg-white/60 transition hover:bg-white"
                  aria-label={
                    isMenuOpen ? MOBILE_MENU_CLOSE_ARIA : MOBILE_MENU_OPEN_ARIA
                  }
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
                      <div
                        className="flex flex-col leading-tight text-[15px] font-medium"
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

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="hidden xl:block sticky top-0 z-50 w-full bg-[color:var(--c-surface)]">
        <div className="border-t-[2px] border-b-[2px] border-[color:var(--c-border)] py-0.5">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={[
                  "flex items-center justify-center overflow-hidden transition-all duration-300",
                  isScrolled
                    ? "opacity-100 scale-100 w-[32px] h-[32px]"
                    : "opacity-0 scale-95 w-0 h-0",
                ].join(" ")}
              >
                <img
                  src={logo}
                  alt="Логотип"
                  className="h-[32px] w-auto select-none object-contain"
                  draggable={false}
                />
              </div>
              <nav
                className={[
                  "flex items-center justify-start gap-[40px] text-[16px] font-normal transition-all duration-300 py-2",
                  isScrolled ? "translate-x-0" : "translate-x-0",
                ].join(" ")}
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition duration-200 hover:text-[color:var(--c-primary)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <div
              className={[
                "transition-all duration-300",
                isScrolled
                  ? "opacity-100 translate-y-0 max-w-[220px]"
                  : "opacity-0 translate-y-0 max-w-0 pointer-events-none overflow-hidden",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={open}
                className="border-0 bg-[color:var(--c-primary)] px-5 py-1.5 text-[14px] font-normal text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {BUTTON_CALLBACK_TEXT}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
