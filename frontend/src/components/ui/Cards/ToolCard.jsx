import { useRef } from "react";
import { Link } from "react-router-dom";

// UI
import Icon from "../Icon";

const ToolCard = ({ title, description, cover, icon, link }) => {
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    if (cover) imageRef.current.hidden = !imageRef.current.hidden;
  };

  return (
    <article
      className="dark:bg-primary shadow-primary dark:shadow-light hover:bg-primary group/item h-auto max-w-[500px] min-w-[400px] space-y-2 rounded-3xl shadow-md"
      onClick={handleImageLoad}
    >
      {/* Image  */}
      <figure ref={imageRef} hidden>
        <img
          src={cover}
          alt="preview"
          className="aspect-square h-[300px] w-full rounded-t-3xl"
        />
      </figure>

      {/* Main Content  */}
      <section className="px-8 py-4">
        {/* Header  */}
        <header className="font-primary dark:text-dark text-lg font-bold md:text-xl">
          {title}
        </header>

        {/* Description  */}
        <p className="dark:text-dark text-sm font-light text-ellipsis">
          {description}
        </p>

        {/* Footer (Actions) */}
        <footer className="mt-4 flex w-full items-center justify-between">
          <a href="" className="dark:text-dark text-xs">
            Learn More
          </a>
          <Link
            to={link}
            className="group/btn hover:bg-light rounded-3xl p-1.5 transition-all group-hover/item:visible group-hover/item:shadow-md active:scale-95 max-sm:shadow-md lg:invisible"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              src={icon}
              size={32}
              className={"group-hover/btn:scale-105"}
              alt={"icon"}
            />
          </Link>
        </footer>
      </section>
    </article>
  );
};

export default ToolCard;
