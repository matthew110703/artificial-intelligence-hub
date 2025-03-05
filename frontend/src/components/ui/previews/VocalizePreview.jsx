import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Icon from "../Icon";

const VocalizePreview = () => {
  return (
    <div className="shadow-primary border-primary flex flex-col gap-4 rounded-lg border p-2 shadow-md lg:p-4">
      {/* Prompt */}
      <div className="shadow-primary dark:bg-primary/30 rounded-lg p-1 shadow-md">
        <span className="text-xs font-bold">Prompt</span>
        <p className="text-sm">
          Welcome to AI Hub, your one-stop platform for all things AI. Explore
          the future of innovation today!
        </p>
      </div>

      <section className="flex items-center gap-2 lg:gap-4">
        {/* Voice Details */}
        <div className="bg-primary text-dark flex min-w-[160px] flex-col gap-y-2 rounded-md p-2 lg:p-4">
          {/* Voice */}
          <div className="flex items-center gap-x-1 whitespace-nowrap">
            <Icon
              src={"/media/vocalize/Sarah.png"}
              size={48}
              className={"bg-primary/25 border-light rounded-full border-2"}
              alt={"Sarah"}
            />
            <div>
              <span className="text-sm font-semibold">Sarah</span>
              <p className="text-xs">Young Female</p>
            </div>
          </div>

          {/* Accent & Tone */}
          <div className="text-xs font-semibold">
            <p> - American accent</p>
            <p>- Soft</p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="w-full">
          <AudioPlayer
            src="/media/vocalize/sample.mp3"
            className="border-primary rounded-md border-4"
            header={<p className="text-dark text-sm">sample.mp3</p>}
            customAdditionalControls={[]}
            customProgressBarSection={[RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION]}
            customVolumeControls={[]}
          />
        </div>
      </section>
    </div>
  );
};

export default VocalizePreview;
