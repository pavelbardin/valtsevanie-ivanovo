import { useModal } from "./useModal";
import SectionTitle from "./ui/SectionTitle";
import order1_480 from "../assets/order/services/service-1-480.webp";
import order1_720 from "../assets/order/services/service-1-720.webp";
import order1_960 from "../assets/order/services/service-1-960.webp";
import order2_480 from "../assets/order/services/service-2-480.webp";
import order2_720 from "../assets/order/services/service-2-720.webp";
import order2_960 from "../assets/order/services/service-2-960.webp";
import order3_480 from "../assets/order/services/service-3-480.webp";
import order3_720 from "../assets/order/services/service-3-720.webp";
import order3_960 from "../assets/order/services/service-3-960.webp";
import order4_480 from "../assets/order/services/service-4-480.webp";
import order4_720 from "../assets/order/services/service-4-720.webp";
import order4_960 from "../assets/order/services/service-4-960.webp";

const SECTION_TITLE = "У нас можно заказать";
const CARD_TITLE = "Листовая гибка";
const CARD_TITLE2 = "Гибка труб и профиля";
const CARD_TITLE3 = "Радиусная гибка";
const CARD_TITLE4 = "Объемная гибка (формоизменение)";
const CARD_PRICE_PLACEHOLDER = "Цена от ...";
const CARD_PRICE_PLACEHOLDER2= "Цена от ...";
const CARD_PRICE_PLACEHOLDER3 = "Цена от ...";
const CARD_PRICE_PLACEHOLDER4 = "Цена от ...";
const BUTTON_CALCULATE_PRICE = "Рассчитать цену";
const BUTTON_ASK_QUESTION = "Задать вопрос";
const CARD_IMAGE_SIZES =
  "(min-width: 1280px) 360px, (min-width: 640px) 50vw, 100vw";

const cards = [
  {
    title: CARD_TITLE,
    price: CARD_PRICE_PLACEHOLDER,
    img: order1_720,
    srcSet: `${order1_480} 480w, ${order1_720} 720w, ${order1_960} 960w`,
  },
    {
    title: CARD_TITLE4,
    price: CARD_PRICE_PLACEHOLDER4,
    img: order4_720,
    srcSet: `${order4_480} 480w, ${order4_720} 720w, ${order4_960} 960w`,
  },
  {
    title: CARD_TITLE2,
    price: CARD_PRICE_PLACEHOLDER2,
    img: order2_720,
    srcSet: `${order2_480} 480w, ${order2_720} 720w, ${order2_960} 960w`,
  },
  {
    title: CARD_TITLE3,
    price: CARD_PRICE_PLACEHOLDER3,
    img: order3_720,
    srcSet: `${order3_480} 480w, ${order3_720} 720w, ${order3_960} 960w`,
  },

];

const YouCanOrdetBlock = () => {
  const { open } = useModal();

  return (
    <section id="services" className="py-6 sm:py-6 xl:py-6 app-layout" >
      <div className="flex flex-col">
        <SectionTitle
          className="mb-8 xl:mb-10"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {SECTION_TITLE}
        </SectionTitle>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[40px]">
          {cards.map((card, index) => (
            <div
              key={index}
              className="mx-auto flex w-full max-w-[360px] flex-col xl:mx-0"
            >
              <img
                src={card.img}
                srcSet={card.srcSet}
                sizes={CARD_IMAGE_SIZES}
                alt={card.title}
                width={720}
                height={1080}
                className="mb-4 h-[265px] w-full rounded-md object-cover sm:h-[302px] md:h-[340px] xl:h-[378px] xl:w-[340px]"
                draggable={false}
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
              <div
                className="mb-2 text-[18px] font-semibold sm:text-[19px] xl:text-[20px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {card.title}
              </div>
              <div
                className="mb-4 text-[16px] font-normal sm:text-[17px] xl:text-[18px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {card.price}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-[20px]">
                <button
                  type="button"
                  onClick={open}
                  className="w-full bg-[color:var(--c-primary)] px-4 py-2 text-[14px] text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)] sm:w-auto sm:text-[15px] xl:px-5 xl:text-[16px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {BUTTON_CALCULATE_PRICE}
                </button>
                <button
                  type="button"
                  onClick={open}
                  className="w-full border border-[color:var(--c-primary)] bg-transparent px-4 py-2 text-[14px] text-[color:var(--c-text)] transition hover:bg-[color:var(--c-primary)] hover:text-[color:var(--c-surface)] sm:w-auto sm:text-[15px] xl:px-5 xl:text-[16px]"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {BUTTON_ASK_QUESTION}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouCanOrdetBlock;
