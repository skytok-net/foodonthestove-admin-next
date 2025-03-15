'use client';

import { useState } from 'react';
import { supabase } from "@/lib/supabase"
import { ImagePreviewUpload } from "./image-preview-upload"
import { toast } from 'sonner';

interface SupabaseImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: Error) => void;
  bucket?: string;
  label?: string;
  maxSizeInMB?: number;
  allowedFileTypes?: string[];
}

export function SupabaseImageUpload({ 
  onUploadSuccess, 
  onUploadError,
  bucket = 'app-images',
  label = 'Upload Image',
  maxSizeInMB = 5,
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp']
}: SupabaseImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      throw new Error(`File type not allowed. Please upload: ${allowedFileTypes.join(', ')}`);
    }

    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new Error(`File size too large. Maximum size is ${maxSizeInMB}MB`);
    }

    return true;
  };

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      
      // Validate file
      validateFile(file);

      // Generate safe filename
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      // Upload file
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL for uploaded file');
      }

      // Call success callback
      onUploadSuccess(urlData.publicUrl);
      toast.success('Image uploaded successfully');

    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      toast.error(errorMessage);
      onUploadError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsUploading(false);
    }
  }

  return <ImagePreviewUpload onFileSelect={handleUpload} label={label} isUploading={isUploading} acceptedFileTypes={allowedFileTypes.join(',')} maxSizeInMB={maxSizeInMB} />
}
