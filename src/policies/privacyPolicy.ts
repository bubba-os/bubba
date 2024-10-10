// src/defaultPolicies/dataRetentionPolicy.ts

import { type JSONContent } from "@tiptap/core";

export const privacyPolicyContent: JSONContent[] = [
  {
    type: "heading",
    attrs: { level: 1 },
    content: [{ type: "text", text: "Privacy Policy" }],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "This is the default privacy policy. Please customize it according to your organization's needs.",
      },
    ],
  },
  // Add more nodes as needed
];
