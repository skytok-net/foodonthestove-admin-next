'use client';

import { useState } from "react"
import Image from "next/image"
import { ImageUpload } from "./image-upload"
import { Spinner } from "@/components/plate-ui/spinner"

interface ImagePreviewUploadProps {
  onFileSelect?: (file: File) => void;
  label?: string;
  isUploading?: boolean;
  acceptedFileTypes?: string;
  maxSizeInMB?: number;
}

export function ImagePreviewUpload({
  onFileSelect,
  label,
  isUploading = false,
  acceptedFileTypes,
  maxSizeInMB
}: ImagePreviewUploadProps) {
  const [preview, setPreview] = useState<string>()

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    
    // Pass the file to the parent component if onFileSelect is provided
    if (onFileSelect) {
      onFileSelect(file)
    }
  }

  return (
    <div className="relative">
      {preview && (
        <div className="relative mb-4 h-32 w-32 overflow-hidden rounded">
          <Image 
            src={preview} 
            alt="Preview" 
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 128px"
          />
        </div>
      )}
      <div className={isUploading ? 'opacity-50 pointer-events-none' : ''}>
        <ImageUpload 
          onFileSelect={handlePreview} 
          label={label}
          accept={acceptedFileTypes}
          maxSizeInMB={maxSizeInMB}
        />
      </div>
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
