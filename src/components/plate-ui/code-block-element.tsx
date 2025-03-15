'use client';

import React from 'react';

import type { Editor, TElement } from '@udecode/plate';

import { cn, withRef } from '@udecode/cn';
import { formatCodeBlock } from '@udecode/plate-code-block';
import { PlateElement } from '@udecode/plate/react';
import { BracesIcon } from 'lucide-react';

import { Button } from './button';
import { CodeBlockCombobox } from './code-block-combobox';

import './code-block-element.css';

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element, editor } = props;

    return (
      <PlateElement
        ref={ref}
        className={cn('relative my-4 rounded-md border', className)}
        {...props}
      >
        <div className="flex items-center justify-between px-3 py-2 text-sm">
          <div className="flex items-center gap-1">
            <BracesIcon className="h-4 w-4" />
            <span className="text-xs">Code Block</span>
          </div>
          <div className="flex items-center">
            <CodeBlockCombobox />
            <CodeBlockFormatButton editor={editor} element={element} />
          </div>
        </div>

        <div className="overflow-auto rounded-md bg-muted p-2">
          <pre className="text-sm">{children}</pre>
        </div>
      </PlateElement>
    );
  }
);

function CodeBlockFormatButton({
  editor,
  element,
}: {
  editor: Editor;
  element: TElement;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      onClick={() => formatCodeBlock(editor, { element })}
    >
      <BracesIcon className="h-4 w-4" />
    </Button>
  );
}
