import * as React from 'react';

import type { OurFileRouter } from '../app/api/uploadthing/route';

import { generateReactHelpers } from '@uploadthing/react';
import { toast } from 'sonner';
import { z } from 'zod';

// Define a custom type for our uploaded file
export interface UploadedFile {
  key: string;
  url: string;
  name: string;
  size: number;
  type: string;
}

// Define the options for the upload function
type EditorUploaderOptions = {
  headers?: Record<string, string>;
  onUploadBegin?: (opts: { file: string }) => void;
  onUploadProgress?: (opts: { 
    file: File; 
    progress: number; 
    loaded: number; 
    delta: number; 
    totalLoaded: number; 
    totalProgress: number 
  }) => void;
};

interface UseUploadFileProps extends EditorUploaderOptions {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

export function useUploadFile({
  onUploadComplete,
  onUploadError,
  ...props
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile | undefined>();
  const [uploadingFile, setUploadingFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadThing(file: File) {
    setIsUploading(true);
    setUploadingFile(file);

    try {
      const res = await uploadFiles('editorUploader', {
        files: [file],
        onUploadProgress: (opts) => {
          setProgress(Math.min(opts.progress, 100));
          props.onUploadProgress?.(opts);
        },
        onUploadBegin: props.onUploadBegin,
        headers: props.headers,
      });

      // Create an UploadedFile from the API response
      const data = res[0];
      const uploadedFileData: UploadedFile = {
        key: data.key,
        url: data.url,
        name: data.name || '',
        size: data.size || 0,
        type: data.type || '',
      };

      setUploadedFile(uploadedFileData);
      onUploadComplete?.(uploadedFileData);

      return uploadedFileData;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      const message =
        errorMessage.length > 0
          ? errorMessage
          : 'Something went wrong, please try again later.';

      toast.error(message);

      onUploadError?.(error);

      // Mock upload for unauthenticated users
      // toast.info('User not logged in. Mocking upload process.');
      const fileUrl = URL.createObjectURL(file);
      const mockUploadedFile: UploadedFile = {
        key: 'mock-key-0',
        url: fileUrl,
        name: file.name,
        size: file.size,
        type: file.type
      };

      // Simulate upload progress
      let progress = 0;

      const simulateProgress = async () => {
        while (progress < 100) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          progress += 2;
          setProgress(Math.min(progress, 100));
        }
      };

      await simulateProgress();

      setUploadedFile(mockUploadedFile);

      return mockUploadedFile;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadThing,
    uploadingFile,
  };
}

// Generate the React helpers with the correct type
const { uploadFiles, useUploadThing } = generateReactHelpers<OurFileRouter>();
export { uploadFiles, useUploadThing };

export function getErrorMessage(err: unknown) {
  const unknownError = 'Something went wrong, please try again later.';

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });

    return errors.join('\n');
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);

  return toast.error(errorMessage);
}
