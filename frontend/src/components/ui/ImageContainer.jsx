import { downloadIcon } from "../../assets";
import Icon from "./Icon";

const ImageContainer = ({ image, prompt }) => {
  return (
    <figure className="group relative min-h-[400px] max-w-[600px] min-w-[400px] overflow-hidden rounded-md">
      <img
        src={image}
        alt="image"
        className="aspect-square w-fit rounded-md"
        loading="lazy"
      />
      <figcaption className="invisible absolute bottom-0 left-0 line-clamp-[10] max-h-full min-h-0 max-w-[500px] rounded-b-md bg-linear-to-t from-black/85 to-transparent px-2 text-sm leading-tight text-ellipsis text-white group-hover:visible">
        {prompt}
      </figcaption>
      <button
        aria-label="Download Image"
        className="invisible absolute top-0 right-0 p-2 group-hover:visible"
      >
        <Icon src={downloadIcon} size={32} alt={"Download Image"} />
      </button>
    </figure>
  );
};

export default ImageContainer;
