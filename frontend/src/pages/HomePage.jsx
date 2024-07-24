/* eslint-disable react/no-unescaped-entities */
import HeroBanner from "../components/homepage/HeroBanner";
import InfoElement from "../components/homepage/InfoElement";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <hr style={{ width: "70%" }} className="m-auto my-10 border-black" />

      <section id="help">
        <div className="flex flex-col bg-secondary w-4/5 m-auto mt-20 rounded p-10 leading-loose">
          <InfoElement label="What is AI Hub for?" img="/media/ai.gif">
            AI Toolbox is your go-to platform for leveraging the latest in
            artificial intelligence to boost productivity and creativity. Our
            collection of powerful AI tools is designed to help you accomplish a
            wide range of tasks quickly and efficiently.
            <ul className="mt-2 list-disc ml-3 text-normal font-normal space-y-2">
              <li>
                <span className="font-semibold">Create stunning visuals:</span>{" "}
                Convert your text into beautiful images.
              </li>
              <li>
                <span className="font-semibold">
                  Generate realistic speech:
                </span>{" "}
                Turn written content into high-quality audio.
              </li>
              <li>
                <span className="font-semibold">Write flawless emails:</span>{" "}
                Get AI-assisted email drafts that save you time and effort.
              </li>
              <li>
                <span className="font-semibold">
                  Engage with intelligent chatbots:
                </span>{" "}
                Improve customer service with responsive, AI-driven
                interactions.
              </li>
            </ul>
          </InfoElement>
          <InfoElement
            label="How to use AI Hub?"
            img="/media/bot-assistant.gif"
            reverse
          >
            Whether you're a professional seeking to streamline your workflow or
            an enthusiast exploring the possibilities of AI, we have everything
            you need to accomplish your goals. Here's how to get started on your
            AI-powered journey:
            <ul className="mt-3 ml-3 list-decimal space-y-2 font-normal">
              <li>
                <span className="font-semibold">Sign Up:</span> Create an
                account to access our full suite of AI tools.
              </li>
              <li>
                <span className="font-semibold">Select a Tool:</span> Choose the
                tool you need from our easy-to-navigate dashboard.
              </li>
              <li>
                <span className="font-semibold">Input Your Data:</span> Enter
                your text, commands, or other necessary inputs.
              </li>
              <li>
                <span className="font-semibold">Customize Settings:</span>{" "}
                Adjust settings to tailor the output to your preferences.
              </li>
              <li>
                <span className="font-semibold">Generate Results:</span> Click
                the generate button and watch the AI work its magic.
              </li>
              <li>
                <span className="font-semibold">Download or Share:</span> Save
                your results or share them directly from the platform.
              </li>
            </ul>
          </InfoElement>
        </div>
      </section>

      <hr style={{ width: "70%" }} className="m-auto my-10 border-black" />
    </>
  );
}
