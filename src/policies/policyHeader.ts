// src/defaultPolicies/policyHeader.ts

import { type JSONContent } from "@tiptap/core";

interface PolicyHeaderProps {
  policyName: string;
  version: string;
  effectiveDate: string;
  approvedBy: string;
}

export function createPolicyHeader({
  policyName,
  version,
  effectiveDate,
  approvedBy,
}: PolicyHeaderProps): JSONContent {
  return {
    type: "table",
    attrs: {
      class: "w-full border-collapse mb-4",
    },
    content: [
      {
        type: "tableRow",
        content: [
          {
            type: "tableHeader",
            attrs: {
              colspan: 2,
              class: "text-center text-xl p-2 bg-gray-100",
            },
            content: [
              {
                type: "heading",
                attrs: { level: 1 },
                content: [
                  {
                    type: "text",
                    text: policyName,
                    marks: [{ type: "bold" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Version Row
      {
        type: "tableRow",
        content: [
          {
            type: "tableCell",
            attrs: {
              class: "bg-gray-50 font-bold p-2 w-1/3 align-top",
            },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Version" }],
              },
            ],
          },
          {
            type: "tableCell",
            attrs: {
              class: "p-2 align-top",
            },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: version }],
              },
            ],
          },
        ],
      },
      // Effective Date Row
      {
        type: "tableRow",
        content: [
          {
            type: "tableCell",
            attrs: {
              class: "bg-gray-50 font-bold p-2 w-1/3 align-top",
            },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Effective Date" }],
              },
            ],
          },
          {
            type: "tableCell",
            attrs: {
              class: "p-2 align-top",
            },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: effectiveDate }],
              },
            ],
          },
        ],
      },
      // Approved By Row
      {
        type: "tableRow",
        content: [
          {
            type: "tableCell",
            attrs: {
              class: "bg-gray-50 font-bold p-2 w-1/3 align-top",
            },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Approved By" }],
              },
            ],
          },
          {
            type: "tableCell",
            attrs: {
              class: "p-2 align-top",
            },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: approvedBy }],
              },
            ],
          },
        ],
      },
    ],
  };
}
