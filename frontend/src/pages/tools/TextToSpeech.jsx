import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getVoices } from "../../../utils/data";
import { textToSpeech } from "../../../utils/ai-services";
import { useState, useRef } from "react";

export default function TextToSpeech() {
  const voices = getVoices;

  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const loadingRef = useRef(null);

  const generateSpeech = async () => {
    loadingRef.current.hidden = false;

    if (text && selectedVoice) {
      try {
        const audio = await textToSpeech(text, selectedVoice);
        setAudioUrl(URL.createObjectURL(audio));
        loadingRef.current.hidden = true;
      } catch (error) {
        console.error(error);
        alert("An error occurred while generating the speech", error);
        loadingRef.current.hidden = true;
      }
    } else {
      alert("Please select a voice and enter some text to generate speech");
      loadingRef.current.hidden = true;
    }
  };

  return (
    <>
      <div className="bg-primary w-3/4 mx-auto p-10 rounded flex flex-col gap-10 border-r-4 border-l-4">
        <div className="flex gap-x-2 justify-center items-center border-b-2">
          <p className="text-2xl font-semibold">AI Text To Speech</p>
          <img
            src="/media/text2speech-logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          <p className="text-xs font-semibold">
            Type.
            <br />
            Convert.
            <br />
            Communicate...
          </p>
        </div>

        {/* INTERFACE  */}
        <div className="flex flex-row gap-x-10 p-5">
          <div className="basis-1/3 flex flex-col gap-y-5 p-3 items-center">
            <FormControl className="w-full">
              <InputLabel id="label">Select Voice: </InputLabel>
              <Select
                label="Select Voice: "
                labelId="label"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
              >
                {voices.map((voice, index) => (
                  <MenuItem key={index} value={Object.values(voice)[0]}>
                    {Object.keys(voice)[0]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <button
              className=" mt-16 bg-secondary w-3/5 font-semibold rounded-md px-3 py-2 ring-transition text-white tracking-wide"
              onClick={generateSpeech}
            >
              Generate Speech
            </button>
            <div className="animate-spin" hidden ref={loadingRef}>
              <img src="/media/reload.png" alt="load" width={32} height={32} />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 items-center">
            <textarea
              name="text"
              rows={8}
              className="w-full rounded-md p-2 text-xl tracking-wide bg-white focus:outline-none focus:ring-2 focus:ring-black "
              placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <p className="text-sm font-extralight">
              Supported languages: English, Hindi, Tamil, German, Korean.
            </p>
          </div>
        </div>

        {/* AUDIO PLAYER */}

        {audioUrl && (
          <>
            <hr />
            <div className="flex flex-col gap-5 items-center">
              <p className="text-xl font-semibold">Audio Preview</p>
              <audio src={audioUrl} controls className="w-full"></audio>
            </div>
          </>
        )}

        <hr />
      </div>
    </>
  );
}
