import { useModal } from "./useModal";
import SectionTitle from "./ui/SectionTitle";
import order1 from "../assets/order/1.webp";
import order2 from "../assets/order/2.webp";
import order3 from "../assets/order/3.webp";

const SECTION_TITLE = "Проекты, которые мы уже реализовали";
const MATERIAL_LABEL = "Материал:";
const VOLUME_LABEL = "Объем работы:";
const TIME_LABEL = "Сроки:";
const CITY_LABEL = "Город доставки:";
const BUTTON_TEXT = "Хочу так же";
const IMAGE_ALT = "Проект";

const projects = [
  {
    img: order1,
    material: "",
    volume: "",
    time: "",
    city: "",
  },
  {
    img: order2,
    material: "",
    volume: "",
    time: "",
    city: "",
  },
  {
    img: order3,
    material: "",
    volume: "",
    time: "",
    city: "",
  },
];

const ProjectBlock = () => {
  const { open } = useModal();

  return (
    <section id="projects" className="py-6 sm:py-6 xl:py-6 app-layout" >
      <div className="flex flex-col items-center text-center">
        <SectionTitle
          className="mb-8 xl:mb-12"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {SECTION_TITLE}
        </SectionTitle>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="mx-auto flex w-full max-w-[360px] flex-col items-start text-left xl:mx-0"
            >
              <img
                src={project.img}
                alt={IMAGE_ALT}
                className="mb-4 h-[240px] w-full object-cover rounded-md sm:h-[280px] md:h-[320px] xl:h-[360px] xl:w-[360px]"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
              <div
                className="text-[16px] font-normal leading-relaxed sm:text-[18px] xl:text-[20px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span className="font-medium">{MATERIAL_LABEL}</span> {project.material} <br />
                <span className="font-medium">{VOLUME_LABEL}</span> {project.volume} <br />
                <span className="font-medium">{TIME_LABEL}</span> {project.time} <br />
                <span className="font-medium">{CITY_LABEL}</span> {project.city}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={open}
          className="mt-8 rounded-md border border-[color:var(--c-primary)] bg-[color:var(--c-primary)] px-8 py-3 text-[20px] text-[color:var(--c-surface)] transition hover:bg-[color:var(--c-primary-soft)] sm:px-10 sm:text-[24px] md:text-[26px] xl:mt-12 xl:px-30 xl:py-4 xl:text-[30px]"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          {BUTTON_TEXT}
        </button>
      </div>
    </section>
  );
};

export default ProjectBlock;
