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
        <figure className={dashboard ? "hidden lg:block" : "mx-auto lg:mx-0"}>
          <img
            src="/media/hero.webp"
            alt="hero-image"
            width={400}
            height={300}
            loading="eager"
          />
        </figure>

        {/* Text Content */}
        <main className="flex flex-col items-center gap-4 lg:w-1/2 lg:items-start">
          <header>
            <h1 className="dark:text-primary text-3xl font-bold lg:text-5xl">
              {dashboard ? "Dashboard" : "Unlock the Power of AI"}
            </h1>
          </header>

          <aside className="text-xs font-light">
            {dashboard
              ? "Your central hub for all AI things. "
              : "Transform your workflow with our suite of advanced AI tools."}
          </aside>

          {dashboard ? (
            <p className="text-center font-light lg:w-[90%] lg:text-start">
            Here, you can access <span className="dark:text-primary font-semibold">powerful</span> tools and explore new features to boost your
            <span className="dark:text-primary font-semibold"> productivity</span> and
            <span className="dark:text-primary font-semibold"> creativity</span>.
          </p>
          
          ) : (
            <p className="text-center font-light lg:w-[90%] lg:text-start">
  Whether you need to convert <span className="dark:text-primary font-semibold">text to stunning images</span>, generate 
  <span className="dark:text-primary font-semibold"> natural-sounding</span> speech, 
  <span className="dark:text-primary font-semibold"> craft perfect emails</span>, or engage with an 
  <span className="dark:text-primary font-semibold"> intelligent chatbot...</span>
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
