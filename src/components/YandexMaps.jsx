import SectionTitle from "./ui/SectionTitle";


const SECTION_TITLE = "Отзывы клиентов, которые нас уже выбрали";
const IFRAME_TITLE = "Yandex Map";
const IFRAME_SRC =
  "https://yandex.com/map-widget/v1/?text=%D0%B3.%20%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%BE%2C%20%D0%A2%D0%BE%D1%80%D1%84%D1%8F%D0%BD%D0%BE%D0%B9%20%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BE%D0%BA%2C%20%D0%B4.%2065";

const YandexMaps = () => {
  return (
    <section id="reviews" className="py-10 sm:py-12 xl:py-8">
      <SectionTitle
        className="mb-6 text-[color:var(--c-text-strong)]"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {SECTION_TITLE}
      </SectionTitle>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="w-full overflow-hidden rounded-md">
          <iframe
            title={IFRAME_TITLE}
            src={IFRAME_SRC}
            width="100%"
            height="522"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            className="block h-[320px] w-full sm:h-[400px] md:h-[460px] xl:h-[522px]"
          />
        </div>
      </div>
    </section>
  );
};

export default YandexMaps;
