import React from "react";

export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-4">{children}</div>;
}
