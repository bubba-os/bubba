// src/defaultPolicies/dataRetentionPolicy.ts

import { type JSONContent } from "@tiptap/core";

export const dataRetentionPolicyContent: JSONContent[] = [
  {
    type: "heading",
    attrs: { level: 1 },
    content: [{ type: "text", text: "Data Retention Policy" }],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "This is the default data retention policy. Please customize it according to your organization's needs.",
      },
    ],
  },
];
