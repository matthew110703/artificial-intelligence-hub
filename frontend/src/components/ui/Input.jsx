import Icon from "./Icon";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  onClick,
  className,
  startAdornment,
  endAdornment,
  adornmentSize = 24,
  onStartAdornmentClick,
  onEndAdornmentClick,
  endAdornmentDescription,
  ...rest
}) => {
  return (
    <div
      className={`shadow-primary border-light focus-within:border-primary flex w-full items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm shadow-sm transition-shadow duration-150 ease-in-out focus-within:shadow-md dark:bg-white ${className}`}
      onClick={onClick}
    >
      {startAdornment && (
        <Icon
          src={startAdornment}
          alt={"icon"}
          size={adornmentSize}
          onClick={onStartAdornmentClick}
          tooltipId={name}
          tooltipContent={placeholder}
          tooltipPosition="left"
        />
      )}
      <input
        title={placeholder}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className} dark:text-dark w-full outline-none dark:bg-white`}
        {...rest}
      />
      {endAdornment && (
        <Icon
          src={endAdornment}
          alt={"icon"}
          size={adornmentSize}
          onClick={onEndAdornmentClick}
          tooltipContent={endAdornmentDescription}
        />
      )}
    </div>
  );
};

export default Input;
