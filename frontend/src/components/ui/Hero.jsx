import { useNavigate } from "react-router-dom";

// UI
import Button from "./Button";

// Icons
import { botPrimary, getStarted } from "../../assets";

const Hero = ({ dashboard = false }) => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="container mx-auto flex flex-col justify-center gap-8 p-6 lg:flex-row-reverse lg:items-center">
        {/* Image */}
        <figure className={dashboard ? "hidden lg:block" : ""}>
          <img
            src="/media/hero.gif"
            alt="hero-image"
            width={400}
            height={300}
          />
        </figure>

        {/* Text Content */}
        <main className="flex flex-col gap-4 lg:w-1/2">
          <header>
            <h1 className="dark:text-primary text-3xl font-bold lg:text-5xl">
              {dashboard ? "Dashboard" : "Unlock the Power of AI"}
            </h1>
          </header>

          <aside className="text-xs font-extralight">
            {dashboard
              ? "Your central hub for all AI things. "
              : "Transform your workflow with our suite of advanced AI tools."}
          </aside>

          {dashboard ? (
            <p className="font-light lg:w-[90%]">
              Here, you can access{" "}
              <span className="dark:text-primary font-semibold">powerful</span>{" "}
              tools, and explore new features to boost your
              <span className="dark:text-primary font-semibold">
                {" "}
                productivity{" "}
              </span>{" "}
              and{" "}
              <span className="dark:text-primary font-semibold">
                {" "}
                creativity{" "}
              </span>
              .
            </p>
          ) : (
            <p className="font-light lg:w-[90%]">
              Whether you need to convert{" "}
              <span className="dark:text-primary font-semibold">
                text to stunning images
              </span>
              , generate{" "}
              <span className="dark:text-primary font-semibold">
                natural-sounding
              </span>{" "}
              speech,{" "}
              <span className="dark:text-primary font-semibold">
                craft perfect emails
              </span>
              , or engage with an{" "}
              <span className="dark:text-primary font-semibold">
                intelligent chatbot...
              </span>
            </p>
          )}

          {dashboard ? (
            <aside className="dark:text-primary text-lg font-semibold">
              Create. Innovate. Elevate.
            </aside>
          ) : (
            <aside className="text-sm font-extralight">
              AI Hub has you covered.
            </aside>
          )}

          {/* Call to Actions */}

          <div className="mt-4 flex justify-start gap-4">
            <Button
              text={"Get Started"}
              startIcon={getStarted}
              hidden={dashboard}
              onClick={() => navigate("/signup")}
            />
            <Button
              text={"Chat with AI"}
              startIcon={botPrimary}
              onClick={() => navigate("/chat")}
            />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Hero;
