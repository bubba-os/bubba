"use client";

import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

export type UploadProps = {
  endpoint: TEndpoint;
};

type TEndpoint = "documentUploader";

export default function Upload({ endpoint }: UploadProps) {
  return (
    <UploadButton
      endpoint={endpoint}
      className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-button:rounded-md ut-button:px-3 ut-button:py-1 ut-button:text-sm ut-button:font-medium ut-button:transition-colors ut-button:focus-visible:ring-2 ut-button:focus-visible:ring-ring ut-button:focus-visible:ring-offset-2 ut-allowed-content:text-muted-foreground ut-uploading:ut-button:opacity-50 ut-uploading:ut-button:cursor-not-allowed"
      onClientUploadComplete={(res) => {
        toast.success("Upload complete.");
      }}
      onUploadError={(error: Error) => {
        toast.error(`Error uploading file, try again later.`);
      }}
    />
  );
}
