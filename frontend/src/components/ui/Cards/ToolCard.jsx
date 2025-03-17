import { Link, useNavigate } from "react-router-dom";

// UI
import Icon from "../Icon";

// Motion
import { motion } from "motion/react";
import { toolCardAnimation } from "../../../lib/motion";

const ToolCard = ({ title, description, icon, link }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      role="button"
      className="dark:bg-dark tool-card shadow-primary dark:shadow-light group/item h-[150px] w-[400px] space-y-2 rounded-3xl bg-white shadow-md"
      onClick={() => navigate(link)}
      variants={toolCardAnimation}
      {...toolCardAnimation}
    >
      {/* Main Content  */}
      <section className="px-8 py-4">
        {/* Header  */}
        <header className="font-primary dark:text-light text-lg font-bold md:text-xl">
          {title}
        </header>

        {/* Description  */}
        <p className="dark:text-light text-sm font-light text-ellipsis">
          {description}
        </p>

        {/* Footer (Actions) */}
        <footer className="mt-4 flex w-full items-center justify-between">
          <a href="#" className="dark:text-light text-xs">
            Learn More
          </a>
          <Link
            to={link}
            className="group/btn hover:bg-light rounded-3xl p-1.5 transition-all group-hover/item:visible group-hover/item:shadow-md active:scale-95 max-sm:shadow-md lg:invisible dark:hover:bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              src={icon}
              size={32}
              className={"group-hover/btn:scale-105"}
              alt={"icon"}
              invert
            />
          </Link>
        </footer>
      </section>
    </motion.article>
  );
};

export default ToolCard;
