/* eslint-disable react/prop-types */

export default function InfoElement({ children, label, img, reverse = false }) {
  return (
    <div
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } gap-10 my-10`}
    >
      <div
        className={`border-4 shadow-xl ${reverse ? "w-3/5" : ""}`}
        style={{ borderColor: "white" }}
      >
        <img
          src={img}
          alt="chatbot"
          className="w-full aspect-square scale-transition"
        />
      </div>
      <div className={`space-y-10 ${reverse ? "" : "w-4/5"}`}>
        <p className="text-5xl font-semibold">{label}</p>
        <div className="text-2xl font-normal">{children}</div>
      </div>
    </div>
  );
}
