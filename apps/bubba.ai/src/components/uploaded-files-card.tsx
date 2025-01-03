import type { UploadedFile } from "@/types";
import Image from "next/image";

import { EmptyCard } from "@bubba/ui/empty-card";
import { ScrollArea, ScrollBar } from "@bubba/ui/scroll-area";
import React from "react";

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[];
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <>
      {uploadedFiles.length > 0 ? (
        <ScrollArea className="pb-4">
          <div className="flex w-max space-x-2.5">
            {uploadedFiles.map((file) => (
              <div key={file.key} className="relative aspect-video w-64">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  sizes="(min-width: 640px) 640px, 100vw"
                  loading="lazy"
                  className="rounded-md object-cover"
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <EmptyCard
          title="No attachments"
          description="Upload an attachment or link to an external resource"
          className="w-full"
        />
      )}
    </>
  );
}
