import { useNavigate } from "react-router-dom";

// UI
import { sparks, audioWave, envelope } from "../../assets";
import Button from "./Button";

// Previews
import ImagenPreview from "./previews/ImagenPreview";
import MailBotPreview from "./previews/MailBotPreview";
import VocalizePreview from "./previews/VocalizePreview";

import parse from "html-react-parser";

const Feature = ({
  name,
  headline,
  textContent,
  tagline,
  ctaLink,
  disableReverse,
}) => {
  const navigate = useNavigate();
  // Preview
  const preview = (name) => {
    switch (name) {
      case "Imagen AI":
        return <ImagenPreview />;
      case "Vocalize AI":
        return <VocalizePreview />;
      case "MailBot":
        return <MailBotPreview />;
      default:
        return null;
    }
  };

  // CTA Icon
  const ctaIcon = (name) => {
    switch (name) {
      case "Imagen AI":
        return sparks;
      case "Vocalize AI":
        return audioWave;
      case "MailBot":
        return envelope;
      default:
        return sparks;
    }
  };

  return (
    <section>
      <div
        className={`dark:bg-primary/5 flex flex-col items-center justify-center gap-8 rounded-lg p-4 shadow-gray-300 md:p-8 lg:min-h-[300px] lg:shadow-inner ${disableReverse ? "lg:flex-row" : "lg:flex-row-reverse"}`}
      >
        {/* Preview */}
        {preview(name)}

        {/* Content */}
        <main className="space-y-4 text-start">
          <header className="font-primary">
            <span className="dark:text-primary text-2xl font-bold drop-shadow-md lg:text-3xl">
              {name}
            </span>
            <p className="text-md lg:text-lg">{headline}</p>
          </header>

          {/* About / Description  */}
          <p className="text-start text-sm leading-tight font-light">
            {parse(textContent)}
          </p>

          {/* Tagline  */}
          <p className="dark:text-primary font-primary text-md font-semibold underline-offset-4 lg:underline">
            {tagline}
          </p>

          {/* CTA */}
          <Button
            text={"Try Now!"}
            startIcon={ctaIcon(name)}
            className={"mt-6"}
            onClick={() => navigate(ctaLink)}
          />
        </main>
      </div>
    </section>
  );
};

export default Feature;
