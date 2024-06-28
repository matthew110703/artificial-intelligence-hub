/* eslint-disable react/no-unescaped-entities */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { getEmailSubjects, stripMarkdown } from "../../../utils/data";
import { emailWriter } from "../../../utils/ai-services";

export default function EmailWriter() {
  const emailSubjects = getEmailSubjects();

  const [emailSubject, setEmailSubject] = useState("");
  const [emailPrompt, setEmailPrompt] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientOrganization, setRecipientOrganization] = useState("");

  const loadingRef = useRef(null);

  const [generatedEmail, setGeneratedEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    loadingRef.current.hidden = false;

    const prompt = {
      subject: emailSubject,
      prompt: emailPrompt,
      recipient: recipientName,
      recipientOrg: recipientOrganization,
    };

    try {
      const email = await emailWriter(prompt);
      setGeneratedEmail(email);
      loadingRef.current.hidden = true;
    } catch (error) {
      alert("An error occurred while generating the email", error);
      loadingRef.current.hidden = true;
    }
  };

  const handleCopyButton = () => {
    navigator.clipboard.writeText(stripMarkdown(generatedEmail));
    alert("Email copied to clipboard");
  };

  return (
    <>
      <div className="bg-primary w-4/5 m-auto flex flex-row rounded-lg">
        {/* EMAIL WRITER INSTRUCTIONS FORM */}
        <form onSubmit={handleSubmit} className="basis-1/3">
          <div className="flex flex-col gap-y-10 p-5 justify-center border-4 border-white rounded-lg shadow-xl">
            <div className="flex mx-auto items-center gap-x-3 border-b-2 pb-2">
              <p className="text-2xl font-semibold">AI Email Writer</p>
              <img
                className=" overflow-visible"
                src="/media/email-logo.png"
                alt="email-logo"
                width={80}
                height={80}
              />
              <p className="text-xs font-semibold">
                Effortless,
                <br />
                Efficient,
                <br />
                Email excellence.
              </p>
            </div>

            <div className=" space-y-2 font-semibold">
              <span>Purpose of the email:</span>
              <FormControl className="w-full border border-black">
                <InputLabel id="label">Select an Option:</InputLabel>
                <Select
                  labelId="label"
                  label="select an option: "
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                >
                  {emailSubjects.map((subject, index) => (
                    <MenuItem key={index} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className=" space-y-2 font-semibold">
              <span>Instruction for the AI Email Writer</span>
              <TextField
                type="text"
                multiline
                rows={4}
                value={emailPrompt}
                onChange={(e) => setEmailPrompt(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2 font-semibold">
              <span>Reciever / Recipient's Name</span>
              <TextField
                type="text"
                helperText="(optional)"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2 font-semibold">
              <span>Recipient's Organization</span>
              <TextField
                type="text"
                helperText="(optional)"
                value={recipientOrganization}
                onChange={(e) => setRecipientOrganization(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex justify-center items-center gap-x-5">
              <button
                type="submit"
                className="bg-secondary  font-semibold rounded-md px-3 py-2 ring-transition text-white tracking-wide"
              >
                Generate
              </button>
              <div className="animate-spin" hidden ref={loadingRef}>
                <img
                  src="/media/reload.png"
                  alt="load"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>
        </form>

        {/* EMAIL PREVIEW */}
        <div
          className="flex flex-col p-5 gap-y-5 justify-center "
          style={{ width: "1020px" }}
        >
          <div className="flex justify-end">
            <button
              className="flex gap-2 items-center bg-accent-1 px-3 py-2 rounded-md hover:ring-2 hover:ring-white"
              onClick={handleCopyButton}
            >
              Copy
              <MdContentCopy />
            </button>
          </div>

          <div
            className="basis-11/12 bg-accent-1 w-full h-96 p-10 text-2xl tracking-normal leading-relaxed rounded-md shadow-lg border-4 border-secondary text-gray-500 
          overflow-y-scroll scroll-smooth overflow-contain"
          >
            {/* GENERATED EMAIL PREVIEW*/}
            {generatedEmail === "" && (
              <p className="text-center text-2xl font-semibold">
                Generate an email to preview...
              </p>
            )}
            <ReactMarkdown>{generatedEmail}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
