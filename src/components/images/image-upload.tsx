'use client';

import { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImageUploadProps {
  onFileSelect?: (file: File) => void;
  label?: string;
  accept?: string;
  maxSizeInMB?: number;
}

export function ImageUpload({ 
  onFileSelect, 
  label = "Upload Image",
  accept = "image/*",
  maxSizeInMB
}: ImageUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onFileSelect) {
      onFileSelect(file)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">{label}</Label>
      <Input 
        id="picture" 
        type="file"
        accept={accept}
        className="file:text-primary"
        onChange={handleFileChange}
      />
      {maxSizeInMB && (
        <p className="text-xs text-gray-500">
          Maximum file size: {maxSizeInMB}MB
        </p>
      )}
    </div>
  )
}
