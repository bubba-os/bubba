import { auth } from "@/auth";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileUploader = {
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 8 } })
    .middleware(async () => {
      const session = await auth();

      if (!session) throw new UploadThingError("Unauthorized");

      return {
        userId: session.user.id,
        organizationId: session.user.organizationId,
      };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileUploader;
