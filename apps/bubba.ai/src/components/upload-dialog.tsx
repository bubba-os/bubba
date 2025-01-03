"use client";

import * as React from "react";

import { revalidateUpload } from "@/actions/risk/task/revalidate-upload";
import { FileUploader } from "@/components/file-uploader";
import { useUploadFile } from "@/hooks/use-upload-file";
import { Button } from "@bubba/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bubba/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface UploadDialogProps {
  taskId: string;
  riskId: string;
}

export function UploadDialog({ taskId, riskId }: UploadDialogProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [open, setOpen] = React.useState(false);

  const revalidateTask = useAction(revalidateUpload, {
    onSuccess: () => {
      toast.success("File attached to task successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong, please try again.");
    },
  });

  const { onUpload, progresses, isUploading } = useUploadFile("uploader", {
    defaultUploadedFiles: [],
    headers: {
      "x-risk-id": riskId,
      "x-task-id": taskId,
    },
    onClientUploadComplete: async () => {
      await revalidateTask.execute({ riskId, taskId });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Upload files {files.length > 0 && `(${files.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload an attachment</DialogTitle>
          <DialogDescription>
            Upload an attachment or add a link to an external resource.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          progresses={progresses}
          onUpload={onUpload}
          disabled={isUploading}
          maxFileCount={10}
          maxSize={20 * 1024 * 1024}
          onValueChange={setFiles}
        />
      </DialogContent>
    </Dialog>
  );
}
