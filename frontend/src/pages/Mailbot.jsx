// UI
import { Container, Icon } from "../components";

// Icons
import { copyIcon, rightArrow, sparks } from "../assets";

const Mailbot = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call
  };

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
        </form>

        {/* MailBot Output */}
        <div className="flex max-w-sm min-w-sm flex-col gap-y-2.5 md:max-w-xl md:min-w-md">
          {/* Email Subject */}
          <label htmlFor="subject">
            <p className="text-sm font-semibold">Subject:</p>
            <div className="ring-primary shadow-primary flex w-full gap-2 rounded-lg p-0.5 px-2 shadow-sm focus-within:shadow-md focus-within:ring-2">
              <input
                type="text"
                name="subject"
                id="subject"
                className="field-sizing-content w-full p-1.5 outline-none"
                placeholder="Thank you for your recent purchase!"
              />
              <button aria-label="Re-generate">
                <Icon
                  src={sparks}
                  size={24}
                  alt={"Sparks"}
                  tooltipContent={"Re-generate"}
                />
              </button>
            </div>
          </label>

          {/* Email Body */}
          <div className="ring-primary shadow-primary relative flex w-full gap-2 rounded-lg p-0.5 px-2 shadow-sm focus-within:shadow-md focus-within:ring-2">
            <textarea
              name="emailBody"
              id="emailBody"
              className="field-sizing-content min-h-[400px] w-full p-1.5 outline-none"
              placeholder={`Dear [Client's Name],\n\nThank you for choosing [Your Company Name] for your recent purchase. We are thrilled to have you as part of our community. We have a new product that we think you might like. Click the link below to explore it!\n\nBest,\n[Your Name]`}
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
              />
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Mailbot;
