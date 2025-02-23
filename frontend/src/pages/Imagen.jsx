// UI
import { useMemo, useState } from "react";
import { Container, Icon, ImageContainer } from "../components";

// Assets
import { PREVIEW_IMAGES } from "../lib/constants";
import { sparks, reload } from "../assets";

const Imagen = () => {
  const [promptText, setPromptText] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Shuffle Images (on mount)
  const shuffledImages = useMemo(() => {
    const array = [...PREVIEW_IMAGES];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  // Handle Prompt Submission
  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!promptText) return;
    setCurrentPrompt(promptText);
    setPromptText("");
    setIsGenerating(true);
    // API Call
  };

  // Handle Enter Key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setPromptText((prev) => prev + "\n");
    } else if (e.key === "Enter") {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  return (
    <Container
      disableFooter
      contentClassname={"flex flex-col items-center gap-12 md:gap-6"}
    >
      <h1 className="text-xl font-bold">Create Stunning Visuals in Seconds!</h1>

      {/* Preview Images */}
      {!isGenerating && (
        <>
          {/* Preview Images Grid */}
          <section className="flex max-w-full gap-4 overflow-x-auto scroll-smooth px-2 md:grid md:grid-cols-2 lg:grid-cols-3">
            {shuffledImages.map((image) => (
              <ImageContainer
                key={image.src}
                image={image.src}
                prompt={image.prompt}
              />
            ))}
          </section>
          {/* Mobile Tooltip for swiping the images */}
          <p className="block text-center text-xs md:hidden">
            <strong>Tip:</strong> Swipe left or right to view more images!
          </p>
        </>
      )}

      {/* Image Generation Output */}
      {isGenerating && (
        <>
          <div className="flex max-w-full gap-4 overflow-x-auto scroll-smooth lg:grid lg:grid-cols-2 lg:gap-10">
            {/* Image PlaceHolders  */}
            <figure className="h-[400px] w-sm animate-pulse rounded-lg bg-gray-500/50 lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"></figure>
            <figure className="hidden h-[400px] w-[400px] animate-pulse rounded-lg bg-gray-500/50 md:block lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"></figure>
          </div>
          <p className="text-sm">{currentPrompt}</p>
        </>
      )}

      {/* Prompt Input */}
      <form onSubmit={handlePromptSubmit} className="flex justify-center">
        <div className="ring-primary shadow-primary bg-light fixed bottom-4 mx-auto flex max-w-sm min-w-sm gap-x-2 rounded-lg p-1.5 shadow-sm focus-within:shadow-md focus-within:ring-2 md:bottom-8 lg:max-w-[50%] lg:min-w-[50%]">
          <textarea
            name="prompt"
            id="prompt"
            placeholder="What's on your mind?"
            className="dark:text-dark field-sizing-content w-full p-1.5 outline-none"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          ></textarea>
          <button
            type="button"
            aria-label="Re-generate"
            onClick={handlePromptSubmit}
          >
            <Icon
              src={reload}
              size={24}
              alt={"Re-generate"}
              tooltipContent="Re-generate Image"
            />
          </button>
          <button
            type="submit"
            className="disabled:cursor-not-allowed"
            onClick={handlePromptSubmit}
            disabled={!promptText}
            aria-label="Submit"
          >
            <Icon
              src={sparks}
              size={24}
              alt={"Generate"}
              tooltipContent="Submit"
            />
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Imagen;
