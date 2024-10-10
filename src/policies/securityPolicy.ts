// src/defaultPolicies/dataRetentionPolicy.ts

import { type JSONContent } from "@tiptap/core";

export const securityPolicyContent: JSONContent[] = [
  {
    type: "heading",
    attrs: { level: 1 },
    content: [{ type: "text", text: "Security Policy" }],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "This is the default security policy. Please customize it according to your organization's needs.",
      },
    ],
  },
  // Add more nodes as needed
];
