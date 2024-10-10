import {
  getVaultConfigResponse,
  getVaultDomainResponse,
  verifyVaultDomain,
} from "@/lib/vault";
import { type DomainVerificationStatusProps } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const domain = decodeURIComponent(params.slug);

  let status: DomainVerificationStatusProps = "Valid Configuration";

  const [domainJson, configJson] = await Promise.all([
    getVaultDomainResponse(domain),
    getVaultConfigResponse(domain),
  ]);

  if (domainJson?.error?.code === "not_found") {
    status = "Domain Not Found";

    // unknown error
  } else if (domainJson.error) {
    status = "Unknown Error";
  } else if (!domainJson.verified) {
    status = "Pending Verification";
    const verificationJson = await verifyVaultDomain(domain);

    if (verificationJson?.verified) {
      status = "Valid Configuration";
    }
  } else if (configJson.misconfigured) {
    status = "Invalid Configuration";
  } else {
    status = "Valid Configuration";
  }

  return NextResponse.json({
    status,
    domainJson,
  });
}
