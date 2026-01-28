import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SectionTitle from "./ui/SectionTitle";

const SECTION_TITLE = "Металлы с которыми мы работаем";
const SLIDE_IMAGES = ["/slider/1.png", "/slider/2.png", "/slider/3.png", "/slider/4.png","/slider/1.png", "/slider/2.png", "/slider/3.png", "/slider/4.png"];
const ALT_TEXT_PREFIX = "Работа";

const OurWorks = () => {
  const slides = useMemo(
    () =>
      SLIDE_IMAGES.map((src, i) => ({
        src,
        alt: `${ALT_TEXT_PREFIX} ${i + 1}`,
      })),
    []
  );

  return (
    <section className="py-12 sm:py-14 xl:py-16 px-4">
      <SectionTitle
        className="mb-8 xl:mb-10"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {SECTION_TITLE}
      </SectionTitle>

      <div className="w-full select-none">
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          slidesPerView="auto"
          spaceBetween={16}
          watchOverflow
          className="w-full"
          style={{
            "--swiper-navigation-color": '#ffffff',
            "--swiper-navigation-size": "22px",
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.src}
              className="!w-auto flex justify-center"
            >
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-sm
                  transition
                  duration-300
                "
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  loading="lazy"
                  className="
                    w-[192px] h-[192px]
                    object-cover
                    transition
                    duration-300
                    group-hover:scale-[1.03]
                    sm:w-[224px] sm:h-[224px]
                    md:w-[256px] md:h-[256px]
                    lg:w-[272px] lg:h-[272px]
                    xl:w-[288px] xl:h-[288px]
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurWorks;
