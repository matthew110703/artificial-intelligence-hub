import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col gap-y-5 w-96 h-auto">
      <p className="text-2xl font-semibold">Contact Us</p>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Subject"
        variant="outlined"
        fullWidth
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <Button
        className="self-center"
        variant="contained"
        href={`mailto:email@example.com?subject=${subject}&body=${message}&cc=${name}&bcc=hello@`}
      >
        Submit
      </Button>
    </div>
  );
}
