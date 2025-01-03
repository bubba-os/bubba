import { auth } from "@/auth";
import { db } from "@bubba/db";
import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileUploader = {
  uploader: f(["image", "pdf", "text", "video"])
    .middleware(async ({ req }) => {
      const session = await auth();
      const headerList = await req.headers;

      if (!session) throw new UploadThingError("Unauthorized");

      if (!headerList) throw new UploadThingError("Task ID is required");

      const taskId = headerList.get("x-task-id");
      const riskId = headerList.get("x-risk-id");

      if (!taskId || !riskId) throw new UploadThingError("Task ID is required");

      console.log("taskId", taskId);
      console.log("riskId", riskId);

      return {
        userId: session.user.id,
        organizationId: session.user.organizationId,
        taskId,
        riskId,
      };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const taskAttachment = await db.taskAttachment.create({
        data: {
          name: file.name,
          fileUrl: file.url,
          ownerId: metadata.userId,
          organizationId: metadata.organizationId!,
          riskMitigationTaskId: metadata.taskId,
        },
      });

      return {
        uploadedBy: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileUploader;
