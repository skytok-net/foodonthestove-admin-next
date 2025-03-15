'use client';

import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';
import { Value } from '@udecode/plate';
import { serializeMd } from '@udecode/plate-markdown';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { MarkdownPlugin } from '@udecode/plate-markdown';

interface PlateEditorProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function PlateEditor({ 
  id, 
  name, 
  value = '', 
  onChange,
  placeholder
}: PlateEditorProps) {
  // Create editor with markdown support
  const editor = useCreateEditor({
    markdown: value, // Pass markdown directly to the editor
  });
  
  // Handle editor changes
  const handleChange = (newValue: Value) => {
    if (onChange) {
      // Convert editor value to markdown
      const markdown = editor.getApi(MarkdownPlugin).markdown.serialize();
      onChange(markdown);
    }
  };

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== undefined) {
      // Only update if the serialized value is different from current value
      const currentMarkdown = editor.getApi(MarkdownPlugin).markdown.serialize();
      if (value !== currentMarkdown) {
        // This will trigger a re-render with the new markdown
        editor.getApi(MarkdownPlugin).markdown.deserialize(value);
      }
    }
    
    // Return cleanup function to prevent callbacks after unmount
    return () => {
      // Empty cleanup function to ensure React doesn't try to run 
      // any callbacks related to this effect after unmount
    };
  }, [editor, value]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate 
        editor={editor} 
        onChange={({ value }) => handleChange(value)}
      >
        <EditorContainer>
          <Editor 
            variant="demo" 
            id={id}
            name={name}
            placeholder={placeholder}
          />
        </EditorContainer>

        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
