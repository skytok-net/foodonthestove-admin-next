import type { FileRouter } from 'uploadthing/next';

import { createRouteHandler, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

const ourFileRouter = {
  editorUploader: f(['image', 'text', 'blob', 'pdf', 'video', 'audio'])
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      // Return a simple JSON object with primitive values
      return {
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
