import { Tooltip } from "react-tooltip";

const Icon = ({
  src,
  alt,
  className,
  size = 24,
  loading = "priority",
  onClick,
  invert = false,
  tooltipId,
  tooltipContent,
  disableTooltip = !tooltipContent ? true : false,
  tooltipPosition = "top",
}) => {
  return (
    <>
      {!disableTooltip && <Tooltip id={tooltipId || "tooltip"} />}
      <img
        src={src}
        alt={alt}
        className={` ${invert ? "invert-0 dark:invert" : "invert-0"} ${className}`}
        loading={loading}
        onClick={onClick}
        width={size}
        height={size}
        data-tooltip-id={tooltipId || "tooltip"}
        data-tooltip-content={tooltipContent}
        data-tooltip-hidden={disableTooltip}
        data-tooltip-place={tooltipPosition}
        data-tooltip-delay-hide={100}
        data-tooltip-delay-show={100}
        data-tooltip-class-name="font-primary hidden lg:block px-1.5 py-1"
      />
    </>
  );
};

export default Icon;
