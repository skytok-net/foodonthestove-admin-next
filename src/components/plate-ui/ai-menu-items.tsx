'use client';

import { useEffect, useMemo } from 'react';

import { type SlateEditor, NodeApi } from '@udecode/plate';
import { AIChatPlugin, AIPlugin } from '@udecode/plate-ai/react';
import { useIsSelecting } from '@udecode/plate-selection/react';
import {
  type PlateEditor,
  useEditorRef,
  usePluginOption,
} from '@udecode/plate/react';
import {
  Album,
  BadgeHelp,
  Check,
  CornerUpLeft,
  FeatherIcon,
  ListEnd,
  ListMinus,
  ListPlus,
  PenLine,
  SmileIcon,
  Wand,
  X,
} from 'lucide-react';

import { CommandGroup, CommandItem } from './command';

export type EditorChatState =
  | 'cursorCommand'
  | 'cursorSuggestion'
  | 'selectionCommand'
  | 'selectionSuggestion';

export const aiChatItems = {
  accept: {
    icon: <Check />,
    label: 'Accept',
    value: 'accept',
    onSelect: ({ editor }) => {
      try {
        // Get the transforms API
        const transforms = editor.getTransforms(AIChatPlugin);
        if (!transforms || !transforms.aiChat) {
          console.error('AI chat transforms not available');
          return;
        }
        
        // Get the AI chat API
        const api = editor.getApi(AIChatPlugin);
        if (!api || !api.aiChat) {
          console.error('AI chat API not available');
          return;
        }
        
        // Focus the editor at the end first
        editor.tf.focus({ edge: 'end' });
        
        // Accept the AI content
        transforms.aiChat.accept();
        
        // Give time for accept to complete before hiding
        setTimeout(() => {
          try {
            api.aiChat.hide();
          } catch (e) {
            console.warn('Error hiding AI chat menu:', e);
          }
        }, 300); // Longer delay to prevent race conditions
        
        // Log for debugging
        console.log('Accepted AI content');
      } catch (error) {
        console.error('Error accepting AI content:', error);
      }
    },
  },
  continueWrite: {
    icon: <PenLine />,
    label: 'Continue writing',
    value: 'continueWrite',
    onSelect: ({ editor }) => {
      const ancestorNode = editor.api.block({ highest: true });

      if (!ancestorNode) return;

      const isEmpty = NodeApi.string(ancestorNode[0]).trim().length === 0;

      void editor.getApi(AIChatPlugin).aiChat.submit({
        mode: 'insert',
        prompt: isEmpty
          ? `<Document>
{editor}
</Document>
Start writing a new paragraph AFTER <Document> ONLY ONE SENTENCE`
          : 'Continue writing AFTER <Block> ONLY ONE SENTENCE. DONT REPEAT THE TEXT.',
      });
    },
  },
  discard: {
    icon: <X />,
    label: 'Discard',
    shortcut: 'Escape',
    value: 'discard',
    onSelect: ({ editor }) => {
      editor.getTransforms(AIPlugin).ai.undo();
      editor.getApi(AIChatPlugin).aiChat.hide();
    },
  },
  emojify: {
    icon: <SmileIcon />,
    label: 'Emojify',
    value: 'emojify',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Emojify',
      });
    },
  },
  explain: {
    icon: <BadgeHelp />,
    label: 'Explain',
    value: 'explain',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: {
          default: 'Explain {editor}',
          selecting: 'Explain',
        },
      });
    },
  },
  fixSpelling: {
    icon: <Check />,
    label: 'Fix spelling & grammar',
    value: 'fixSpelling',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Fix spelling and grammar',
      });
    },
  },
  improveWriting: {
    icon: <Wand />,
    label: 'Improve writing',
    value: 'improveWriting',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Improve the writing',
      });
    },
  },
  insertBelow: {
    icon: <ListEnd />,
    label: 'Insert below',
    value: 'insertBelow',
    onSelect: ({ aiEditor, editor }) => {
      if (!editor) {
        console.error('Editor is undefined');
        return;
      }
      
      try {
        // Get the AI chat API
        const api = editor.getApi(AIChatPlugin);
        
        if (!api || !api.aiChat) {
          console.error('AI chat API not available');
          return;
        }
        
        // If we have aiEditor, DO NOT use the transforms API as it's causing issues
        // Instead, use a more manual approach
        if (aiEditor) {
          // Focus the editor first
          editor.tf.focus();
          
          // Insert a line break to create a new paragraph
          editor.tf.insertBreak();
          
          // Now submit with insert mode explicitly set
          api.aiChat.submit({ 
            mode: 'insert',
            prompt: 'Insert the previously generated content at the current position. DO NOT replace any text above. Only add content below the current cursor position.'
          });
          
          // Do NOT hide the menu - this is causing the AbortError
          // Let the user accept or discard the suggestion
          return;
        }
        
        // If we don't have aiEditor, just create a new paragraph and submit
        // Focus the editor first
        editor.tf.focus();
        
        // Insert a line break to create a new paragraph
        editor.tf.insertBreak();
        
        // Now submit with insert mode explicitly set
        api.aiChat.submit({ 
          mode: 'insert',
          prompt: 'Insert previously generated content at the current position. DO NOT replace any text above. Only add content below the current cursor position.'
        });
        
        // Log for debugging
        console.log('Submitted insert request');
        
      } catch (error) {
        console.error('Error inserting below:', error);
      }
    },
  },
  makeLonger: {
    icon: <ListPlus />,
    label: 'Make longer',
    value: 'makeLonger',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Make longer',
      });
    },
  },
  makeShorter: {
    icon: <ListMinus />,
    label: 'Make shorter',
    value: 'makeShorter',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Make shorter',
      });
    },
  },
  replace: {
    icon: <Check />,
    label: 'Replace selection',
    value: 'replace',
    onSelect: ({ aiEditor, editor }) => {
      if (!editor) {
        console.error('Editor is undefined');
        return;
      }
      
      try {
        // Get the AI chat API
        const api = editor.getApi(AIChatPlugin);
        
        if (!api || !api.aiChat) {
          console.error('AI chat API not available');
          return;
        }
        
        // If we have aiEditor, use the transforms API
        if (aiEditor) {
          const transforms = editor.getTransforms(AIChatPlugin);
          if (transforms?.aiChat?.replaceSelection) {
            // Focus the editor first
            editor.tf.focus();
            
            // Perform the replace operation
            transforms.aiChat.replaceSelection(aiEditor);
            
            // Return early after replacement is complete
            return;
          }
        }
        
        // Otherwise, use the AI chat API to replace the selection
        // This will use the last assistant message as the content
        api.aiChat.submit({ 
          mode: 'chat',
          prompt: 'Replace the selected text with the generated content. Only replace what is currently selected, do not modify other parts of the document.'
        });
        
        // Do NOT hide the menu immediately - may cause AbortError
        // Let it close naturally or after completion
        
      } catch (error) {
        console.error('Error replacing selection:', error);
      }
    },
  },
  simplifyLanguage: {
    icon: <FeatherIcon />,
    label: 'Simplify language',
    value: 'simplifyLanguage',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Simplify the language',
      });
    },
  },
  summarize: {
    icon: <Album />,
    label: 'Add a summary',
    value: 'summarize',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        mode: 'insert',
        prompt: {
          default: 'Summarize {editor}',
          selecting: 'Summarize',
        },
      });
    },
  },
  tryAgain: {
    icon: <CornerUpLeft />,
    label: 'Try again',
    value: 'tryAgain',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.reload();
    },
  },
} satisfies Record<
  string,
  {
    icon: React.ReactNode;
    label: string;
    value: string;
    component?: React.ComponentType<{ menuState: EditorChatState }>;
    filterItems?: boolean;
    items?: { label: string; value: string }[];
    shortcut?: string;
    onSelect?: ({
      aiEditor,
      editor,
    }: {
      aiEditor?: SlateEditor;
      editor: PlateEditor;
    }) => void;
  }
>;

const menuStateItems: Record<
  EditorChatState,
  {
    items: (typeof aiChatItems)[keyof typeof aiChatItems][];
    heading?: string;
  }[]
> = {
  cursorCommand: [
    {
      items: [
        aiChatItems.continueWrite,
        aiChatItems.summarize,
        aiChatItems.explain,
      ],
    },
  ],
  cursorSuggestion: [
    {
      items: [aiChatItems.accept, aiChatItems.discard, aiChatItems.tryAgain],
    },
  ],
  selectionCommand: [
    {
      items: [
        aiChatItems.improveWriting,
        aiChatItems.emojify,
        aiChatItems.makeLonger,
        aiChatItems.makeShorter,
        aiChatItems.fixSpelling,
        aiChatItems.simplifyLanguage,
      ],
    },
  ],
  selectionSuggestion: [
    {
      items: [
        aiChatItems.replace,
        aiChatItems.insertBelow,
        aiChatItems.discard,
        aiChatItems.tryAgain,
      ],
    },
  ],
};

export const AIMenuItems = ({
  setValue,
}: {
  setValue: (value: string) => void;
}) => {
  const editor = useEditorRef();
  const { messages } = usePluginOption(AIChatPlugin, 'chat');
  const aiEditorFromPlugin = usePluginOption(AIChatPlugin, 'aiEditor');
  // Convert null to undefined to match the expected type
  const aiEditor = aiEditorFromPlugin === null ? undefined : aiEditorFromPlugin;
  const isSelecting = useIsSelecting();

  const menuState = useMemo(() => {
    if (messages && messages.length > 0) {
      return isSelecting ? 'selectionSuggestion' : 'cursorSuggestion';
    }

    return isSelecting ? 'selectionCommand' : 'cursorCommand';
  }, [isSelecting, messages]);

  const menuGroups = useMemo(() => {
    const items = menuStateItems[menuState];

    return items;
  }, [menuState]);

  useEffect(() => {
    if (menuGroups.length > 0 && menuGroups[0].items.length > 0) {
      setValue(menuGroups[0].items[0].value);
    }
  }, [menuGroups, setValue]);

  return (
    <>
      {menuGroups.map((group, index) => (
        <CommandGroup key={index} heading={group.heading}>
          {group.items.map((menuItem) => (
            <CommandItem
              key={menuItem.value}
              className="[&_svg]:text-muted-foreground"
              value={menuItem.value}
              onSelect={() => {
                if (menuItem.onSelect) {
                    menuItem.onSelect({
                      aiEditor,
                      editor,
                    });
                  }
                }}
              >
                {menuItem.icon}
                <span>{menuItem.label}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      ))}
    </>
  );
};
