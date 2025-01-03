export const ComplianceStatuses = {
  COMPLIANT: "compliant",
  NON_COMPLIANT: "non_compliant",
  PARTIALLY_COMPLIANT: "partially_compliant",
  NOT_APPLICABLE: "not_applicable",
  IN_PROGRESS: "in_progress",
} as const;

export type ComplianceStatusType =
  (typeof ComplianceStatuses)[keyof typeof ComplianceStatuses];
