const MailBotPreview = () => {
  return (
    <div className="border-primary shadow-primary lg:w-1/ space-y-2.5 rounded-lg border-2 p-4 shadow-md">
      {/* Prompt */}
      <div className="shadow-primary bg-primary/30 rounded-md p-1.5 text-xs leading-tight font-normal shadow-sm md:text-sm">
        <span className="text-xs font-bold">Prompt</span>
        <p>
          Write a professional follow-up email to a client named John after a
          product demo. Mention that we’re excited to help them streamline their
          workflow with our AI tools and include a call-to-action to schedule a
          follow-up call.
        </p>
      </div>

      {/* Response Body */}
      <p className="bg-light/50 border-primary shadow-primary dark:bg-primary/15 rounded-md border-2 p-1.5 text-xs font-normal md:text-sm">
        Hi John, <br />
        It was great meeting with you earlier and demonstrating how our AI tools
        can help streamline your workflow. We’re excited about the potential to
        support your team in achieving greater efficiency and productivity.{" "}
        <br />
        If you have any further questions or would like to discuss next steps,
        I’d be happy to schedule a follow-up call at your convenience. Please
        let me know a time that works best for you. <br />
        Looking forward to hearing from you! <br />
        Best regards, <br />
        [Your Name] <br />
        [YourPosition] <br />
        AI Hub
      </p>
    </div>
  );
};

export default MailBotPreview;
