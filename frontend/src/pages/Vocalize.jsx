import { useState } from "react";

// UI
import { Badge, Container, Icon } from "../components";

// Icons
import {
  audioWave,
  closeIcon,
  playIcon,
  settingsIcon,
  downloadDarkIcon,
} from "../assets";

// Audio Player
import AudioPlayer from "react-h5-audio-player";

const Vocalize = () => {
  const [voice, setVoice] = useState("Aria");
  const [audio, setAudio] = useState(null);
  const [voiceMenu, setVoiceMenu] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call
  };

  const playPreviewAudio = () => {};

  return (
    <Container
      contentClassname={
        "flex h-[80vh] flex-col items-center justify-center gap-y-8"
      }
      disableFooter
    >
      {/* Heading  */}
      <div className="text-center">
        <h1 className="font-primary text-xl font-bold md:text-2xl">Vocalize</h1>
        <p className="text-sm font-light">
          Turn Text into Natural-Sounding Speech, Powered with{" "}
          <strong className="dark:text-primary font-semibold">
            {" "}
            ElevenLabs AI
          </strong>
        </p>
      </div>

      {/* Vocalize Form */}
      <section className="flex w-full flex-col items-center justify-center gap-8 p-2 lg:flex-row">
        {/* Text Area (Prompt) */}
        <form
          onSubmit={handleSubmit}
          className="shadow-primary ring-primary w-full max-w-sm rounded-lg p-2.5 shadow-sm focus-within:shadow-md focus-within:ring-2 md:max-w-xl"
        >
          <textarea
            name="prompt"
            id="prompt"
            placeholder="Type your text here..."
            className="field-sizing-content max-h-[600px] min-h-[200px] w-full p-1.5 outline-none"
          ></textarea>
          <button
            aria-label="Submit"
            className="bg-primary float-end rounded-full p-1.5"
          >
            <Icon
              src={audioWave}
              alt="audio-wave"
              size={24}
              tooltipContent={"Submit"}
            />
          </button>
        </form>

        {/* Audio Player */}
        <div className="bg-primary/25 shadow-primary relative w-full max-w-sm rounded-lg p-4 shadow-sm">
          {/* Voice Selection Menu */}
          <div
            className={`dark:bg-light absolute top-0 right-0 z-10 flex h-auto min-w-sm flex-col gap-2 rounded-lg bg-white p-4 shadow-lg ${voiceMenu ? "block" : "hidden"}`}
          >
            <div className="flex items-center justify-between">
              <p className="dark:text-dark text-sm font-semibold">
                Select a Voice -
              </p>
              <button
                aria-label="Close"
                className="self-end"
                onClick={() => setVoiceMenu(false)}
              >
                <Icon src={closeIcon} size={24} alt={"Close"} />
              </button>
            </div>
            <div className="grid grid-cols-6 justify-items-center gap-2"></div>
          </div>

          {/* Voice Settings */}
          <div className="space-y-4 px-2 py-4">
            <header className="flex items-center justify-between">
              {/* Icon + Name + Age */}
              <div className="flex items-center gap-2">
                <Icon
                  src={"/media/vocalize/Sarah.png"}
                  size={48}
                  className={
                    "bg-primary/50 dark:border-primary rounded-full border-2 border-white p-0.5 shadow-md"
                  }
                  alt={voice || "Voice"}
                />
                <div>
                  <h2 className="font-primary text-base font-bold">
                    Voice Name
                  </h2>
                  <p className="text-sm font-light">Young Female</p>
                </div>
              </div>
              {/* Actions */}
              <div className="space-x-2">
                <button
                  aria-label="Preview"
                  className="hover:bg-primary/25 rounded-lg p-1.5"
                >
                  <Icon
                    src={playIcon}
                    size={24}
                    invert
                    alt={"Play"}
                    tooltipContent={"Voice Preview"}
                  />
                </button>
                <button
                  aria-label="Change Voice"
                  className="hover:bg-primary/25 rounded-lg p-1.5"
                  onClick={() => setVoiceMenu(true)}
                >
                  <Icon
                    src={settingsIcon}
                    size={24}
                    invert
                    alt={"Settings"}
                    tooltipContent={"Change Voice"}
                  />
                </button>
              </div>
            </header>
            {/* Voice Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge text={"American"} />
              <Badge text={"Upbeat"} />
              <Badge text={"Social Media"} />
            </div>
          </div>
          <AudioPlayer
            customAdditionalControls={[]}
            customVolumeControls={[
              <Icon
                key={"download"}
                src={downloadDarkIcon}
                size={24}
                alt={"Download"}
                className={"absolute cursor-pointer"}
                tooltipContent={"Download"}
                tooltipPosition="bottom"
              />,
            ]}
            className="border-primary rounded-lg border-2 shadow-sm"
          />
        </div>
      </section>
    </Container>
  );
};

export default Vocalize;
