import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  documentUploader: f({
    pdf: { maxFileSize: "4MB" },
    "text/markdown": { maxFileSize: "4MB" },
    "text/plain": { maxFileSize: "4MB" },
    "application/rtf": { maxFileSize: "4MB" },
    "application/msword": { maxFileSize: "4MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
    },
    "application/vnd.ms-powerpoint": { maxFileSize: "4MB" },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      {
        maxFileSize: "4MB",
      },
    "application/vnd.ms-excel": { maxFileSize: "4MB" },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "4MB",
    },
  })
    .middleware(async ({ req }) => {
      const user = auth(req);

      if (!user) throw new UploadThingError("Unauthorized") as Error;

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
