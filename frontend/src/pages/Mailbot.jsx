import { useCallback, useRef, useState } from "react";

// UI
import { Container, Icon } from "../components";
// Icons
import { copyIcon, rightArrow, sparks } from "../assets";

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "../store/toastSlice";

// Service
import { generateEmail } from "../services/aiService";

const Mailbot = () => {
  // Redux
  const dispatch = useDispatch();
  // Local State
  const [prompt, setPrompt] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [emailBody, setEmailBody] = useState("");
  const [inGeneration, setInGeneration] = useState(false);
  const [loading, setLoading] = useState(false);

  const subjectRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    // API Call
    setInGeneration(true);
    setLoading(true);

    try {
      const res = await generateEmail(prompt);
      setSubjects(res.subjects);
      setEmailBody(res.body);
    } catch (error) {
      console.error(error);
      dispatch(
        showToast({
          message: "Failed to generate email. Please try again.",
          type: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const changeSubject = useCallback(() => {
    if (subjects.length > 0) {
      const randomSubject =
        subjects[Math.floor(Math.random() * subjects.length)];
      subjectRef.current.value = randomSubject;
    }
  }, [subjects]);

  return (
    <Container
      contentClassname={
        "flex min-h-[80vh] flex-col items-center justify-center gap-y-8"
      }
    >
      {/* Heading  */}
      <div className="text-center">
        <h1 className="font-primary text-xl font-bold md:text-2xl">MailBot</h1>
        <p className="text-sm font-light">
          Write Professional Emails in Minutes, Powered with{" "}
          <strong className="dark:text-primary font-semibold">
            Google Gemini
          </strong>
        </p>
      </div>

      <section className="flex w-full flex-col items-center justify-center gap-8 p-2 lg:flex-row lg:items-start">
        {/* MailBot Form */}
        <form
          onSubmit={handleSubmit}
          className="ring-primary shadow-primary relative w-full max-w-sm rounded-lg p-1.5 shadow-sm focus-within:shadow-md focus-within:ring-2 md:max-w-xl"
        >
          <textarea
            name="prompt"
            id="prompt"
            className="field-sizing-content h-full min-h-[200px] w-full p-1.5 outline-none"
            placeholder={`Elaborate specific details about your email...\n\nEg: Write a professional email to a client thanking them for their recent purchase and suggesting a related product they might like. Keep the tone friendly and include a call-to-action to explore the new product.`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            aria-label="Submit"
            type="submit"
            className="bg-primary absolute right-2 bottom-2 rounded-full p-1.5 text-white"
          >
            <Icon
              src={rightArrow}
              size={24}
              alt={"Submit"}
              tooltipContent={"Submit"}
            />
          </button>
          {loading && (
            <p className="font-primary absolute -bottom-10 left-0 w-full text-center text-xl font-bold">
              Generating...
            </p>
          )}
        </form>

        {inGeneration && !loading && (
          <>
            {/* MailBot Output */}
            <div className="flex min-w-sm flex-col gap-y-2.5 md:w-full md:max-w-xl lg:max-h-[60vh]">
              {/* Email Subject */}
              <label htmlFor="subject">
                <p className="text-sm font-semibold">Subject:</p>
                <div className="ring-primary shadow-primary flex w-full gap-2 rounded-lg p-0.5 px-2 shadow-sm focus-within:shadow-md focus-within:ring-2">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="field-sizing- w-full p-1.5 outline-none"
                    placeholder="Thank you for your recent purchase!"
                    ref={subjectRef}
                    defaultValue={subjects[0] || ""}
                  />
                  <button aria-label="Re-generate">
                    <Icon
                      src={sparks}
                      size={24}
                      alt={"Sparks"}
                      tooltipContent={"Re-generate"}
                      onClick={changeSubject}
                      invert
                    />
                  </button>
                </div>
              </label>

              {/* Email Body */}
              <div className="ring-primary shadow-primary relative flex w-full gap-2 rounded-lg p-0.5 px-2 shadow-sm focus-within:shadow-md focus-within:ring-2">
                <textarea
                  name="emailBody"
                  id="emailBody"
                  className="hide-scrollbar min-h-[500px] w-full p-1.5 outline-none"
                  placeholder={`Dear [Client's Name],\n\nThank you for choosing [Your Company Name] for your recent purchase. We are thrilled to have you as part of our community. We have a new product that we think you might like. Click the link below to explore it!\n\nBest,\n[Your Name]`}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                ></textarea>
                <button
                  aria-label="Copy Text"
                  className="hover:bg-primary/15 absolute top-2 right-2 rounded-full p-1.5"
                >
                  <Icon
                    src={copyIcon}
                    size={24}
                    alt={"Copy"}
                    tooltipContent={"Copy"}
                    invert
                    onClick={() => {
                      navigator.clipboard.writeText(emailBody);
                      dispatch(
                        showToast({
                          message: "Copied to clipboard!",
                          type: "success",
                        }),
                      );
                    }}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </Container>
  );
};

export default Mailbot;
