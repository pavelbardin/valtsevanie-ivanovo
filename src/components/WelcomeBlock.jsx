import { useModal } from "./useModal";
import heroImage from "../assets/welcomePage.webp";

const HEADING =
  "Вальцевание металла под ключ в Иваново и области за 2 дня";

const SUBTEXT =
  "Изготавливаем конструкции по  чертежам заказчика или разрабатываем их с нуля";

const BUTTONS = [
  { label: "Получить расчет стоимости" },
  { label: "Перезвоните мне" },
];

const WelcomeBlock = () => {
  const { open } = useModal();

  return (
    <section
      className="
        relative
        flex
        min-h-[420px]
        w-full
        items-center
        bg-cover
        bg-center
        bg-no-repeat
        min-h-[420px]
        py-3
        sm:min-h-[520px]
        lg:min-h-[620px]
        xl:min-h-[700px]
      "
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div
        className="
          absolute
          inset-0
          bg-black/55
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1280px]
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div className="max-w-[900px]">
          <h1
            className="
              mb-6
              text-[26px]
              font-semibold
              leading-snug
              text-white
              sm:text-[32px]
              md:text-[36px]
              lg:text-[40px]
              xl:text-[44px]
            "
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {HEADING}
          </h1>

          <p
            className="
              mb-8
              text-[16px]
              leading-relaxed
              text-white/90
              sm:text-[18px]
              lg:text-[20px]
            "
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {SUBTEXT}
          </p>

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:gap-4
            "
          >
            {BUTTONS.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={open}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-sm
                  bg-[color:var(--c-primary)]
                  px-6
                  py-3
                  text-[14px]
                  font-normal
                  text-white
                  transition
                  hover:bg-[color:var(--c-primary-soft)]
                  sm:text-[15px]
                  lg:text-[16px]
                "
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBlock;
