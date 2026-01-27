import { useState } from "react";
import { useModal } from "./useModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

const HEADING = "Вальцевание металла под ключ в Иваново и области за 2 дня";
const SUBTEXT = "Изготавливаем конструкции по чертежам заказчика или разрабатываем их с нуля";
const BUTTONS = [
  { label: "Получить расчет стоимости" },
  { label: "Перезвоните мне" },
];

const SLIDES = [
  {
    src: "https://picsum.photos/seed/metal-1/1200/800",
    alt: "Производство металлоконструкций 1",
  },
  {
    src: "https://picsum.photos/seed/metal-2/1200/800",
    alt: "Производство металлоконструкций 2",
  },
  {
    src: "https://picsum.photos/seed/metal-3/1200/800",
    alt: "Производство металлоконструкций 3",
  },
  {
    src: "https://picsum.photos/seed/metal-4/1200/800",
    alt: "Производство металлоконструкций 4",
  },
  {
    src: "https://picsum.photos/seed/metal-5/1200/800",
    alt: "Производство металлоконструкций 5",
  },
];

const WelcomeBlock = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { open } = useModal();

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section className="py-3 sm:py-6 xl:py-8">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
        <div className="flex w-full flex-col xl:w-1/2">
          <h1
            className="mb-4 text-[26px] font-semibold leading-snug sm:text-[28px] md:text-[30px] lg:text-[32px] xl:mb-6 xl:text-[34px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {HEADING}
          </h1>
          <p
            className="mb-6 text-[16px] font-normal sm:text-[18px] xl:mb-8 xl:text-[20px]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {SUBTEXT}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-[10px]">
            {BUTTONS.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={open}
                className="w-full cursor-pointer select-none bg-[color:var(--c-primary)] px-5 py-3 text-[14px] font-normal text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)] sm:w-auto sm:text-[15px] xl:px-6 xl:text-[16px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full select-none xl:w-1/2">
          <Swiper
            modules={[Navigation]}
            navigation
            loop
            spaceBetween={16}
            slidesPerView={1}
            className="h-[220px] rounded-sm sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px]"
            style={{
              "--swiper-navigation-color": "var(--c-surface)",
              "--swiper-navigation-size": "22px",
            }}
          >
            {SLIDES.map((slide, index) => (
              <SwiperSlide key={slide.src}>
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative h-[220px] w-full overflow-hidden rounded-sm bg-[color:var(--c-border)] select-none sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px]"
                  draggable={false}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    loading="lazy"
                    className="pointer-events-none h-full w-full select-none object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
          <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            index={lightboxIndex}
            slides={SLIDES}
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeBlock;

