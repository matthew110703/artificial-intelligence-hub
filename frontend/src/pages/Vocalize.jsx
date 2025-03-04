import { useState, useEffect, useCallback, useRef } from "react";

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

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";

// Services
import { getVoiceList, generateSpeech } from "../services/aiService";

const Vocalize = () => {
  const dispatch = useDispatch();

  // Local State
  const [text, setText] = useState("");
  const [voice, setVoice] = useState(null);
  const [output, setOutput] = useState(null);
  const [voiceList, setVoiceList] = useState([]);
  const [voiceMenu, setVoiceMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refs
  const previewRef = useRef(null);

  // Fetch Voices
  useEffect(() => {
    getVoiceList()
      .then((res) => {
        setVoiceList(res);
        setVoice(res[2]);
      })
      .catch((error) => {
        console.error(error);
        dispatch(showToast({ message: error.message, type: "error" }));
      });
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    setLoading(true);

    try {
      const res = await generateSpeech(text, voice.id);
      setOutput(URL.createObjectURL(res));
    } catch (error) {
      console.error(error);
      dispatch(showToast({ message: error.message, type: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const selectVoice = useCallback((voice) => {
    setVoice(voice);
    setVoiceMenu(false);
  }, []);

  // Play Preview Audio
  const playPreviewAudio = useCallback(() => {
    const audio = new Audio(voice?.preview_url);

    const handleEnd = () => {
      previewRef.current.blur();
    };

    audio.addEventListener("ended", handleEnd);
    audio.play();
    previewRef.current.focus();

    return () => {
      audio.removeEventListener("ended", handleEnd);
      audio.pause();
    };
  }, [voice]);

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
            aria-label="Prompt"
            placeholder={`Type or paste your text here...\n\nTip: Supports upto 29 languages. \n(English, Japanese, Chinese, German, Hindi, French, Korean, Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian & Russian.)`}
            className="field-sizing-content max-h-[600px] min-h-[200px] w-full p-1.5 outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            required
          ></textarea>
          <button
            aria-label="Submit"
            className="bg-primary float-end rounded-full p-1.5"
            disabled={loading}
          >
            <Icon
              src={audioWave}
              alt="audio-wave"
              size={24}
              tooltipId={"submit"}
              tooltipContent={loading ? "Loading..." : "Generate"}
            />
          </button>
        </form>

        {/* Audio Player */}
        <div className="bg-primary/25 shadow-primary relative w-full max-w-sm rounded-lg p-4 shadow-sm">
          {/* Voice Selection Menu */}
          <div
            className={`dark:bg-dark absolute top-0 right-0 z-10 flex h-auto min-w-sm flex-col gap-2 overflow-hidden rounded-lg bg-white p-4 shadow-lg ${voiceMenu ? "block" : "hidden"}`}
          >
            <div className="dark:bg-primary/25 absolute top-0 right-0 h-full w-full"></div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Select a Voice -</p>
              <button
                aria-label="Close"
                className="self-end"
                onClick={() => setVoiceMenu(false)}
              >
                <Icon src={closeIcon} size={24} alt={"Close"} invert />
              </button>
            </div>
            <div className="grid grid-cols-6 justify-items-center gap-2">
              {voiceList &&
                voiceList.map((voice) => (
                  <button
                    key={voice.id}
                    className="bg-primary/50 rounded-full p-1.5"
                    onClick={() => selectVoice(voice)}
                  >
                    <Icon
                      src={`/media/vocalize/${voice.name}.png`}
                      tooltipContent={voice.name}
                      tooltipId={voice.id}
                      size={48}
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Voice Settings */}
          <div className="space-y-4 px-2 py-4">
            <header className="flex items-center justify-between">
              {/* Icon + Name + Age */}
              <div className="flex items-center gap-2">
                <Icon
                  src={
                    // eslint-disable-next-line no-constant-binary-expression
                    `/media/vocalize/${voice?.name}.png` ||
                    "https://placehold.co/48"
                  }
                  size={48}
                  className={
                    "bg-primary/50 dark:border-primary rounded-full border-2 border-white p-0.5 shadow-md"
                  }
                  alt={voice?.id || "Voice"}
                />
                <div>
                  <h2 className="font-primary text-base font-bold">
                    {voice?.name || "Loading..."}
                  </h2>
                  {voice && (
                    <p className="text-sm font-light capitalize">{`${voice?.labels?.age} ${voice?.labels?.gender}`}</p>
                  )}
                </div>
              </div>
              {/* Actions */}
              <div className="space-x-2">
                <button
                  ref={previewRef}
                  aria-label="Preview"
                  className="hover:bg-primary/25 focus:bg-primary/25 rounded-lg p-1.5"
                >
                  <Icon
                    src={playIcon}
                    size={24}
                    invert
                    alt={"Play"}
                    tooltipId={"preview"}
                    tooltipContent={"Voice Preview"}
                    onClick={playPreviewAudio}
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
                    tooltipId={"settings"}
                    tooltipContent={"Change Voice"}
                  />
                </button>
              </div>
            </header>
            {/* Voice Tags */}
            {voice && (
              <div className="flex flex-wrap gap-2">
                <Badge text={voice?.labels?.accent} />
                <Badge text={voice?.labels?.description} />
                <Badge text={voice?.labels?.use_case} />
              </div>
            )}
          </div>
          <AudioPlayer
            autoPlayAfterSrcChange
            src={output}
            customAdditionalControls={[]}
            customVolumeControls={[
              <a
                key={"download"}
                role="button"
                href={output}
                download="speech.mp3"
                className="absolute"
                hidden={!output}
              >
                <Icon
                  src={downloadDarkIcon}
                  size={24}
                  alt={"Download"}
                  tooltipId={"download"}
                  tooltipContent={"Download"}
                  tooltipPosition="bottom"
                />
              </a>,
            ]}
            className="border-primary rounded-lg border-2 shadow-sm"
          />
        </div>
      </section>
    </Container>
  );
};

export default Vocalize;
