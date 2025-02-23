import Icon from "../Icon";

const PurposeCard = ({ title, icon, onClick, value }) => {
  return (
    <>
      <button
        type="button"
        className={`shadow-primary hover:bg-primary flex h-[100px] w-[100px] flex-col items-center justify-center gap-y-2 rounded-xl shadow-sm transition-all ${value === title ? "bg-primary ring-primary ring-4" : "bg-light"}`}
        onClick={onClick}
      >
        <Icon
          src={icon}
          alt={"For " + title}
          size={50}
          className={"saturate-200"}
        />
        <h3 className="text-md font-primary text-dark font-semibold">
          {title}
        </h3>
      </button>
      <input type="hidden" value={value} />
    </>
  );
};

export default PurposeCard;
