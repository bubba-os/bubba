"use client";

import Link from "next/link";
import React from "react";

export default function NavbarLogo({
  marginClass = "ml-3",
}: {
  width?: number;
  height?: number;
  marginClass?: string;
}) {
  return (
    <Link href="/dashboard/">
      <p className={`${marginClass} font-bold`}>Bubba</p>
    </Link>
  );
}
