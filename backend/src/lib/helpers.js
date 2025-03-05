import { SchemaType } from "@google/generative-ai";

/**
 * Email Generation Response Schema
 */
export const emailSchema = {
  description: "Email Generation",
  type: SchemaType.OBJECT,
  properties: {
    subjects: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        nullable: false,
        description: "Subject/Purpose of the email",
      },
    },
    body: {
      type: SchemaType.STRING,
      nullable: false,
      description: "Email Body/Content (Don't include the subject here)",
    },
  },
  required: ["subjects", "body"],
};
