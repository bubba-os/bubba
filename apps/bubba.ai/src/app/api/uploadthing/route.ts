import { createRouteHandler } from "uploadthing/next";
import { fileUploader } from "./core";

export const { GET, POST } = createRouteHandler({
  router: fileUploader,
});
