'use client';

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EntityDialogProps {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;
  
  /**
   * Function to call when the dialog should be closed
   */
  onOpenChange: (open: boolean) => void;
  
  /**
   * Title of the dialog
   */
  title: string;
  
  /**
   * Description of the dialog
   */
  description?: string;
  
  /**
   * Children to render inside the dialog
   */
  children: ReactNode;
  
  /**
   * Maximum width of the dialog
   * @default 'md'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
}

export function EntityDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = 'md',
}: EntityDialogProps) {
  // Map maxWidth to specific max-width classes
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    'full': 'max-w-full',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
} 