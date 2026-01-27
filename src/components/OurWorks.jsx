import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import SectionTitle from "./ui/SectionTitle";

const TEXT_COLOR = "var(--c-text-strong)";
const SECTION_TITLE = "Наши работы";
const SLIDE_IMAGE_URL = "https://picsum.photos/seed/works-"; 
const SLIDE_COUNT = 10;
const ALT_TEXT_PREFIX = "Работа";

const OurWorks = () => {
  const slides = useMemo(
    () =>
      Array.from({ length: SLIDE_COUNT }, (_, i) => ({
        src: `${SLIDE_IMAGE_URL}${i + 1}/720/900`,
        alt: `${ALT_TEXT_PREFIX} ${i + 1}`,
      })),
    []
  );

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <section className="py-12 sm:py-14 xl:py-16">
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
          centeredSlides
          centeredSlidesBounds
          slidesPerView={1}
          spaceBetween={16}
          watchOverflow
          className="w-full px-14 sm:px-0"
          style={{
            "--swiper-navigation-color": TEXT_COLOR,
            "--swiper-navigation-size": "22px",
          }}
          breakpoints={{
            0: {
              slidesPerView: "auto",
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.2,
              spaceBetween: 16,
              slidesOffsetBefore: 16,
              slidesOffsetAfter: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
              slidesOffsetBefore: 20,
              slidesOffsetAfter: 20,
            },
            1024: {
              slidesPerView: 2.4,
              spaceBetween: 22,
              slidesOffsetBefore: 22,
              slidesOffsetAfter: 22,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24,
              slidesOffsetBefore: 24,
              slidesOffsetAfter: 24,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={slide.src}
              className="flex justify-center max-[639px]:!w-auto"
            >
              {({ isActive }) => (
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(index);
                    setIsLightboxOpen(true);
                  }}
                  className={[
                    "group relative block overflow-hidden rounded-sm bg-[color:var(--c-border)] transition-all duration-300",
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-70",
                  ].join(" ")}
                  draggable={false}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    loading="lazy"
                    className="h-[260px] w-[240px] object-cover transition duration-300 group-hover:scale-[1.03] sm:h-[300px] sm:w-[280px] md:h-[340px] md:w-[320px] lg:h-[360px] lg:w-[340px] xl:h-[400px] xl:w-[360px]"
                  />
                </button>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
        />
      </div>
    </section>
  );
};

export default OurWorks;
