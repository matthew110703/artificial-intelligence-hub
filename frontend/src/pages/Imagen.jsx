// UI
import { useMemo, useState } from "react";
import { Container, Icon, ImageContainer, ImageCarousel } from "../components";

// Assets
import { PREVIEW_IMAGES } from "../lib/constants";
import { sparks, reload } from "../assets";

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";

// Service
import { generateImage } from "../services/aiService";

// Motion
import { AnimatePresence, motion } from "motion/react";
import { miniSpinner, fadeInUp, imageFullscreen } from "../lib/motion";

const Imagen = () => {
  // Hooks
  const dispatch = useDispatch();

  // Local State
  const [promptText, setPromptText] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [inGeneration, setInGeneration] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Shuffle Images Preview (on mount)
  const shuffledImages = useMemo(() => {
    const array = [...PREVIEW_IMAGES];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  // Handle Prompt Submission
  const handlePromptSubmit = async () => {
    // e.preventDefault();
    if (!promptText) return;
    setCurrentPrompt(promptText);
    setPromptText("");
    setInGeneration(true);
    setGeneratedImages([]);

    setTimeout(() => {}, 1000);

    // API Call
    setLoading(true);
    try {
      const res = await generateImage(promptText);
      setGeneratedImages(res.images);
    } catch (error) {
      console.error(error);
      dispatch(showToast({ message: error, type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  // Regenerate Images
  const handleRegeneration = async () => {
    setLoading(true);
    setGeneratedImages([]);

    try {
      const res = await generateImage(currentPrompt);
      setGeneratedImages(res.images);
    } catch (error) {
      console.error(error);
      dispatch(showToast({ message: error, type: "error" }));
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter Key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      setPromptText((prev) => prev + "\n");
    } else if (e.key === "Enter") {
      handlePromptSubmit();
    }
  };

  return (
    <Container
      disableFooter
      contentClassname={"flex flex-col items-center gap-8 md:gap-6"}
    >
      <h1 className="text-xl font-bold">
        {loading ? (
          <span>Generating Images...</span>
        ) : (
          "Create Stunning Visuals in Seconds!"
        )}
      </h1>

      {/* Preview Images */}
      {!inGeneration && (
        <>
          {/* Preview Images Grid */}
          <section className="hidden max-w-full gap-4 px-2 md:mb-8 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
            {shuffledImages.map((image, idx) => (
              <ImageContainer
                key={idx}
                image={image.src}
                prompt={image.prompt}
              />
            ))}
          </section>
          <div className="lg:hidden">
            <ImageCarousel images={shuffledImages} />
          </div>
          {/* Mobile Tooltip for swiping the images */}
          <p className="block text-center text-xs md:hidden">
            <strong>Tip:</strong> Swipe left or right to view more images!
          </p>
        </>
      )}

      {/* Image Generation Output */}
      {inGeneration && (
        <>
          <div className="flex max-w-full gap-4 overflow-x-auto scroll-smooth lg:grid lg:grid-cols-2 lg:gap-10">
            {/* Image PlaceHolders */}
            {!generatedImages.length && (
              <>
                <figure className="h-[400px] w-sm animate-pulse rounded-lg bg-gray-500/50 lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"></figure>
                <figure className="hidden h-[400px] w-[400px] animate-pulse rounded-lg bg-gray-500/50 md:block lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"></figure>
              </>
            )}

            {/* Generated Images */}
            {generatedImages.map((image, index) => (
              <div key={image.index} className="flex flex-col items-center">
                {/* Desktop View */}
                <figure className="hidden h-[400px] rounded-lg md:block lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]">
                  <img
                    src={image.origin}
                    alt={`Generated Image ${index + 1}`}
                    className="h-full w-fit rounded-lg"
                    onError={(e) => (e.target.style.display = "none")} // Hide broken images
                    loading="lazy"
                    onClick={() => setIsFullScreen(true)}
                  />
                  <AnimatePresence>
                    {isFullScreen && (
                      <motion.img
                        src={image.origin}
                        alt="FullScreen Image"
                        className="fixed inset-0 z-50 h-full w-full bg-black/50 object-contain object-center bg-blend-darken"
                        onClick={() => setIsFullScreen(false)}
                        variants={imageFullscreen}
                        {...imageFullscreen}
                      />
                    )}
                  </AnimatePresence>
                </figure>

                {/* Mobile View */}
                {index === 0 && (
                  <div className="w-full md:hidden">
                    <ImageCarousel images={generatedImages} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Tooltip for swiping the images */}
          <p className="block text-center text-xs md:hidden">
            <strong>Tip:</strong> Swipe left or right to view more images!
          </p>
          <p className="text-sm font-semibold">{currentPrompt}</p>
        </>
      )}

      {/* Prompt Input */}
      <form onSubmit={handlePromptSubmit} className="mt-8 flex justify-center">
        <motion.div
          className="ring-primary shadow-primary bg-light static bottom-4 mx-auto flex max-w-sm min-w-sm gap-x-2 rounded-lg p-1.5 shadow-sm focus-within:shadow-md focus-within:ring-2 md:fixed md:bottom-8 lg:max-w-[50%] lg:min-w-[50%]"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
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
            onClick={handleRegeneration}
            hidden={!generatedImages.length}
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
            {loading ? (
              <motion.div
                variants={miniSpinner}
                initial="initial"
                animate="animate"
              ></motion.div>
            ) : (
              <Icon
                src={sparks}
                size={24}
                alt={"Generate"}
                tooltipContent="Submit"
              />
            )}
          </button>
        </motion.div>
      </form>
    </Container>
  );
};

export default Imagen;
