'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { PlateEditor } from '@/components/editor/plate-editor';
import { cn } from '@/lib/utils';

interface MarkdownFieldProps {
  /**
   * Unique identifier for the field
   */
  id: string;
  
  /**
   * Name of the field, used for form submission
   */
  name: string;
  
  /**
   * Current markdown value
   */
  value: string;
  
  /**
   * Function called when content changes
   */
  onChange: (value: string) => void;
  
  /**
   * Label text to display above the editor
   */
  label: string;
  
  /**
   * Placeholder text for the empty editor
   */
  placeholder?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Help text to display below the editor
   */
  helpText?: string;
  
  /**
   * Minimum height of the editor
   * @default 'h-32'
   */
  minHeight?: string;
}

export function MarkdownField({
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  error,
  required = false,
  className,
  helpText,
  minHeight = 'h-32',
}: MarkdownFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between">
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            required && "after:content-['*'] after:ml-0.5 after:text-red-500"
          )}
        >
          {label}
        </Label>
      </div>
      
      <div className={cn("rounded-md border", error ? "border-red-500" : "border-input", minHeight)}>
        <PlateEditor
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      
      {helpText && !error && (
        <p className="text-sm text-muted-foreground">
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
} 