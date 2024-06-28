/* eslint-disable no-useless-escape */
export const getEmailSubjects = () => {
  return [
    "Business",
    "Personal",
    "Marketing",
    "Sales",
    "Networking",
    "Job Application",
    "Interview",
    "Meeting",
    "Thank You",
    "Feedback",
    "Request",
    "Complaint",
    "Apology",
    "Invitation",
    "Announcement",
    "Confirmation",
    "Congratulation",
    "Welcome",
    "Promotional",
  ];
};

export const emailPrompt = `You're an expert email writer with a knack for crafting the perfect message tailored to various subjects, recipients, and purposes. 
  Your specialty lies in creating emails that are engaging, concise, and effective in conveying the intended message, 
  whether formal or informal.Your specialization lies in tailoring emails to specific audiences, ensuring high open rates and click-through rates. 
    Your task is to write engaging emails for a given set of information: 
    - Subject line/Topic: 
    - Recipient's Name and Orgarnization: 
    - Specific Prompt: 
    Your task is to write a series of emails for given info scenarios. For the provided subject/topic for each email, recipient, purpose of the email, 
    and fill the email body. 
    When crafting these emails, keep in mind the tone of the email, the call to action, personalization elements, and the overall objective of the communication.  
    Remember to maintain professionalism, clarity, and empathy in your email content. Tailor the tone, language, and style according to the recipient and purpose of each message.
    Your goal is to create emails that are engaging, persuasive, and effective in achieving the desired outcome. Ensure that each email is well-structured, concise, and free of errors. 
    Response should be in markdown format neatly structured with spaces, newlines, paragraphs,etc. And the respone must only contain the email subject and body.`;

export const stripMarkdown = (mdtext) => {
  return mdtext
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // Italics
    .replace(/~~(.*?)~~/g, "$1") // Strikethrough
    .replace(/`([^`]+)`/g, "$1") // Inline code
    .replace(/#+\s+(.*)/g, "$1") // Headers
    .replace(/!\[.*?\]\(.*?\)/g, "") // Images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Links
    .replace(/^\s*[\d+\-]\.\s+/gm, "") // Ordered lists
    .replace(/^\s*[\*\+\-]\s+/gm, "") // Unordered lists
    .replace(/^\s*>\s+/gm, "") // Blockquotes
    .replace(/\n{2,}/g, "\n\n") // Multiple newlines
    .replace(/\s{2,}/g, " ") // Multiple spaces
    .trim();
};

export const getVoices = [
  { Kid: "jBpfuIE2acCO8z3wKNLl" },
  { Boy: "yoZ06aMxZJJ28mfd3POQ" },
  { Girl: "21m00Tcm4TlvDq8ikWAM" },
  { Man: "pNInz6obpgDQGcFmaJgB" },
  { Woman: "pMsXgVXv3BLzUgSXRplE" },
  { "Old man": "t0jbNlBVZ17f02VDIeMI" },
];

export const getAvailableTools = () => {
  return [
    {
      name: "Chat with AI",
      description:
        "Your new AI Buddy, here to keep you entertained and informed. It's like texting with a clever friend who's always there when you need them.",
      image: "/media/ai-chatbot-logo.png",
      href: "/explore/chat-with-ai",
    },
    {
      name: "Email Writer",
      description:
        "Generate personalized emails for various subjects, recipients, and purposes. Craft engaging, concise, and effective messages tailored to your needs.",
      image: "/media/email-logo.png",
      href: "/explore/email-writer",
    },
    {
      name: "Text to Speech",
      description:
        "Convert text into natural-sounding speech with customizable voices and accents. Create voiceovers, audiobooks, and more with ease.",
      image: "/media/text2speech-logo.png",
      href: "/explore/text-to-speech",
    },
    {
      name: "Text to Image",
      description:
        "Generate images from text using advanced AI models. Transform your words into stunning visuals for social media, presentations, and more.",
      image: "/media/ai-text2image-logo.png",
      href: "/explore/text-to-image",
    },
  ];
};
