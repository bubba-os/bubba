// src/defaultPolicies/index.ts

import { type JSONContent } from "@tiptap/core";
import { type PolicyType } from "@prisma/client";
import { createPolicyHeader } from "./policyHeader";
import { securityPolicyContent } from "./securityPolicy";
import { privacyPolicyContent } from "./privacyPolicy";
import { dataRetentionPolicyContent } from "./dataRetentionPolicy";

interface PolicyDetails {
  version: string;
  effectiveDate: string;
  approvedBy: string;
}

export function createPolicyContent(
  policyType: PolicyType,
  details: PolicyDetails,
): JSONContent {
  const header = createPolicyHeader({
    policyName: formatPolicyTitle(policyType),
    version: details.version,
    effectiveDate: details.effectiveDate,
    approvedBy: details.approvedBy,
  });

  let bodyContent: JSONContent[];

  switch (policyType) {
    case "SECURITY_POLICY":
      bodyContent = securityPolicyContent;
      break;
    case "PRIVACY_POLICY":
      bodyContent = privacyPolicyContent;
      break;
    case "DATA_RETENTION_POLICY":
      bodyContent = dataRetentionPolicyContent;
      break;
    default:
      bodyContent = [];
  }

  return {
    type: "doc",
    content: [header, { type: "horizontalRule" }, ...bodyContent],
  };
}

function formatPolicyTitle(policyType: string): string {
  return policyType
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
