import { useState } from "react";
import { downloadIcon } from "../../assets";
import Icon from "./Icon";

// Motion
import { AnimatePresence, motion } from "motion/react";
import { imageFullscreen } from "../../lib/motion";

const ImageContainer = ({ image, prompt }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <>
      <figure
        className="group relative min-h-[400px] max-w-[600px] min-w-[300px] overflow-hidden rounded-md"
        onClick={() => setIsFullScreen(!isFullScreen)}
      >
        <img
          src={image}
          alt="image"
          className="aspect-square w-fit rounded-md"
          loading="lazy"
        />
        <figcaption className="invisible absolute bottom-1 left-0 line-clamp-[10] max-h-full min-h-0 max-w-[500px] rounded-b-md bg-linear-to-t from-black/85 to-transparent px-2 text-sm leading-tight text-ellipsis text-white group-hover:visible">
          {prompt}
        </figcaption>
        <a
          role="button"
          aria-label="Download Image"
          className="invisible absolute top-0 right-0 p-2 group-hover:visible"
          href={image}
          download="image.webp"
        >
          <Icon src={downloadIcon} size={32} alt={"Download Image"} />
        </a>
      </figure>
      {/* Image Fullscreen Preview */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.img
            src={image}
            alt="Fullscreen Image"
            className="bg-opacity fixed inset-0 z-50 h-full w-full bg-black/50 object-contain object-center bg-blend-darken"
            onClick={() => setIsFullScreen(false)}
            variants={imageFullscreen}
            {...imageFullscreen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageContainer;
