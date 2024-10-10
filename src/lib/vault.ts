import { env } from "@/env";
import {
  type DomainResponse,
  type DomainConfigResponse,
  type DomainVerificationResponse,
} from "./types";

/*
  Thanks to @steven-tey at Vercel for making this easy.
  https://github.com/vercel/platforms/tree/main/
*/

export const addVaultDomain = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v10/projects/${
      process.env.PROJECT_ID_VERCEL
    }/domains${
      process.env.TEAM_ID_VERCEL ? `?teamId=${process.env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.API_VERCEL}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: domain,
      }),
    },
  ).then((res) => res.json());
};

export const removeVaultDomain = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${
      env.PROJECT_ID_VERCEL
    }/domains/${domain}${
      env.TEAM_ID_VERCEL ? `?teamId=${env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${env.API_VERCEL}`,
      },
      method: "DELETE",
    },
  ).then((res) => res.json());
};

export const removeVaultDomainFromVercelTeam = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v6/domains/${domain}${
      env.TEAM_ID_VERCEL ? `?teamId=${env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      headers: {
        Authorization: `Bearer ${env.API_VERCEL}`,
      },
      method: "DELETE",
    },
  ).then((res) => res.json());
};

export const getVaultDomainResponse = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${
      env.PROJECT_ID_VERCEL
    }/domains/${domain}${
      env.TEAM_ID_VERCEL ? `?teamId=${env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.API_VERCEL}`,
        "Content-Type": "application/json",
      },
    },
  ).then((res) => {
    return res.json() as Promise<
      DomainResponse & { error: { code: string; message: string } }
    >;
  });
};

export const getVaultConfigResponse = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v6/domains/${domain}/config${
      env.TEAM_ID_VERCEL ? `?teamId=${env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.API_VERCEL}`,
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json() as Promise<DomainConfigResponse>);
};

export const verifyVaultDomain = async (domain: string) => {
  return await fetch(
    `https://api.vercel.com/v9/projects/${
      env.PROJECT_ID_VERCEL
    }/domains/${domain}/verify${
      env.TEAM_ID_VERCEL ? `?teamId=${env.TEAM_ID_VERCEL}` : ""
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.API_VERCEL}`,
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json() as Promise<DomainVerificationResponse>);
};

export const getSubdomain = (name: string, apexName: string) => {
  if (name === apexName) return null;
  return name.slice(0, name.length - apexName.length - 1);
};

export const getApexDomain = (url: string) => {
  let domain;

  try {
    domain = new URL(url).hostname;
  } catch (e) {
    return "";
  }

  const parts = domain.split(".");

  if (parts.length > 2) {
    // if it's a subdomain, return the last two parts
    return parts.slice(-2).join(".");
  }

  // if it's a normal domain (e.g. bubba.ai), return the domain
  return domain;
};

export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
);
