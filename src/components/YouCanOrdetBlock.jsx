import { useModal } from "./useModal";
import SectionTitle from "./ui/SectionTitle";

const SECTION_TITLE = "У нас можно заказать";
const CARD_TITLE = "Продукт №1";
const CARD_TITLE2 = "Продукт №2";
const CARD_TITLE3 = "Продукт №3";
const CARD_PRICE_PLACEHOLDER = "Цена от ...";
const CARD_PRICE_PLACEHOLDER2= "Цена от ...";
const CARD_PRICE_PLACEHOLDER3 = "Цена от ...";
const BUTTON_CALCULATE_PRICE = "Рассчитать цену";
const BUTTON_ASK_QUESTION = "Задать вопрос";

const cards = [
  {
    title: CARD_TITLE,
    price: CARD_PRICE_PLACEHOLDER,
    img: "/Order/1.png",
  },
  {
    title: CARD_TITLE2,
    price: CARD_PRICE_PLACEHOLDER2,
    img: "/Order/2.png",
  },
  {
    title: CARD_TITLE3,
    price: CARD_PRICE_PLACEHOLDER3,
    img: "/Order/3.png",
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
                alt={card.title}
                className="mb-4 h-[280px] w-full object-cover sm:h-[320px] md:h-[360px] xl:h-[400px] xl:w-[360px]"
                draggable={false}
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
