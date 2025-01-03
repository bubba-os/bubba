import type { ComplianceStatus, Control, FrameworkCategory } from "@bubba/db";

export interface TransformedControl
  extends Omit<Control, "organizationControls"> {
  status: ComplianceStatus;
  artifacts: Array<{
    id: string;
    organizationControlId: string;
    artifactId: string;
  }>;
}

export interface TransformedCategory
  extends Omit<FrameworkCategory, "controls"> {
  controls: TransformedControl[];
}
