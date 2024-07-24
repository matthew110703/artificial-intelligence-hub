import { MdExplore } from "react-icons/md";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section id="home">
      <div className="my-12 p-10 bg-primary w-4/5 rounded-lg flex flex-row gap-5 justify-evenly mx-auto border-b-4 border-white border-l-4 border-2">
        <div className="flex flex-col gap-10 w-3/5 gap-y-10">
          <p className="text-5xl font-semibold tracking-wide">
            Unlock the Power of AI
          </p>
          <p className="text-2xl italic tracking-wide w-4/5">
            Transform your workflow with our suite of advanced AI tools.
            <br /> Whether you need to convert text to stunning images, generate
            natural-sounding speech, <br />
            craft perfect emails, <br />
            or engage with intelligent chatbot,
            <br /> AI Hub has you covered.
          </p>

          <Link
            role="button"
            to={"/explore"}
            className="bg-secondary text-2xl text-white text-center p-3 rounded-lg w-1/3 italic tracking-widest shadow 
          hover:scale-105 transition ease-out duration-150 hover:ring hover:ring-current"
          >
            Explore{" "}
            <span>
              <MdExplore className="inline" size={32} />
            </span>
          </Link>
        </div>

        <div
          className="columns-2 space-x-10  border-4 "
          style={{ borderColor: "white" }}
        >
          <img
            className="w-full aspect-square scale-transition"
            src="/media/ai-bot.gif"
            alt="chatbot"
          />
          <img src="/media/chat.png" alt="" className="scale-transition" />
          <img
            src="/media/ai-bot-3d.png"
            alt=""
            className="w-full aspect-auto scale-transition"
          />
        </div>
      </div>
    </section>
  );
}
