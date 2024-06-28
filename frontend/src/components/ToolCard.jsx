/* eslint-disable react/prop-types */
export default function ToolCard({ name, description, image, href }) {
  return (
    <a href={href}>
      <div
        className="flex gap-x-10 bg-accent-2  p-10 rounded-lg shadow-xl 
       hover:bg-primary text-black hover:text-white scale-transition ease-out border-b-4 border-primary border-l-4 border"
        style={{ maxHeight: 220 }}
      >
        <div className="flex flex-col gap-y-2 basis-2/3 ">
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-sm font-light italic">{description}</p>
        </div>
        <img
          src={image}
          alt="Ai Chat"
          width={120}
          height={300}
          className="object- border-2 border-primary hover:border-white"
          loading="lazy"
        />
      </div>
    </a>
  );
}
