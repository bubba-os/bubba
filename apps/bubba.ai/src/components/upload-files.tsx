"use client";

import * as React from "react";

import { FileUploader } from "@/components/file-uploader";
import { Button } from "@bubba/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bubba/ui/dialog";

export function DialogUploaderDemo() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Upload files {files.length > 0 && `(${files.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          maxFileCount={8}
          maxSize={8 * 1024 * 1024}
          onValueChange={setFiles}
        />
      </DialogContent>
    </Dialog>
  );
}
