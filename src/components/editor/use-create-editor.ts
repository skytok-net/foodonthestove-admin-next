'use client';

import type { Value } from '@udecode/plate';
import type { AnyPluginConfig } from '@udecode/plate-core';
import type { CreatePlateEditorOptions, PlatePlugin } from '@udecode/plate/react';

import { withProps } from '@udecode/cn';
import { BaseAIPlugin as AIPlugin } from '@udecode/plate-ai';
import {
  BaseBoldPlugin as BoldPlugin,
  BaseCodePlugin as CodePlugin,
  BaseItalicPlugin as ItalicPlugin,
  BaseStrikethroughPlugin as StrikethroughPlugin,
  BaseSubscriptPlugin as SubscriptPlugin,
  BaseSuperscriptPlugin as SuperscriptPlugin,
  BaseUnderlinePlugin as UnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import {
  BaseCodeBlockPlugin,
  BaseCodeLinePlugin as CodeLinePlugin,
  BaseCodeSyntaxPlugin as CodeSyntaxPlugin,
} from '@udecode/plate-code-block';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { EmojiInputPlugin } from '@udecode/plate-emoji/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { MarkdownPlugin, deserializeMd } from '@udecode/plate-markdown';
import {
  EquationPlugin,
  InlineEquationPlugin,
} from '@udecode/plate-math/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import {
  MentionInputPlugin,
  MentionPlugin,
} from '@udecode/plate-mention/react';
import { SlashInputPlugin } from '@udecode/plate-slash-command/react';
import { SuggestionPlugin } from '@udecode/plate-suggestion/react';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react';
import { BaseTogglePlugin as TogglePlugin } from '@udecode/plate-toggle';
import {
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';

import { copilotPlugins } from '@/components/editor/plugins/copilot-plugins';
import { editorPlugins } from '@/components/editor/plugins/editor-plugins';
import { FixedToolbarPlugin } from '@/components/editor/plugins/fixed-toolbar-plugin';
import { FloatingToolbarPlugin } from '@/components/editor/plugins/floating-toolbar-plugin';
import { AILeaf } from '@/components/plate-ui/ai-leaf';
import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { ColumnElement } from '@/components/plate-ui/column-element';
import { ColumnGroupElement } from '@/components/plate-ui/column-group-element';
import { CommentLeaf } from '@/components/plate-ui/comment-leaf';
import { DateElement } from '@/components/plate-ui/date-element';
import { EmojiInputElement } from '@/components/plate-ui/emoji-input-element';
import { EquationElement } from '@/components/plate-ui/equation-element';
import { ExcalidrawElement } from '@/components/plate-ui/excalidraw-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { HrElement } from '@/components/plate-ui/hr-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import { InlineEquationElement } from '@/components/plate-ui/inline-equation-element';
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf';
import { LinkElement } from '@/components/plate-ui/link-element';
import { MediaAudioElement } from '@/components/plate-ui/media-audio-element';
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { MediaFileElement } from '@/components/plate-ui/media-file-element';
import { MediaPlaceholderElement } from '@/components/plate-ui/media-placeholder-element';
import { MediaVideoElement } from '@/components/plate-ui/media-video-element';
import { MentionElement } from '@/components/plate-ui/mention-element';
import { MentionInputElement } from '@/components/plate-ui/mention-input-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { SlashInputElement } from '@/components/plate-ui/slash-input-element';
import { SuggestionLeaf } from '@/components/plate-ui/suggestion-leaf';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/plate-ui/table-cell-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { TocElement } from '@/components/plate-ui/toc-element';
import { ToggleElement } from '@/components/plate-ui/toggle-element';

export const viewComponents = {
  [AudioPlugin.key]: MediaAudioElement,
  [BaseBlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
  [BaseCodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  [CommentsPlugin.key]: CommentLeaf,
  [DatePlugin.key]: DateElement,
  [EquationPlugin.key]: EquationElement,
  [ExcalidrawPlugin.key]: ExcalidrawElement,
  [FilePlugin.key]: MediaFileElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
  [HighlightPlugin.key]: HighlightLeaf,
  [HorizontalRulePlugin.key]: HrElement,
  [ImagePlugin.key]: ImageElement,
  [InlineEquationPlugin.key]: InlineEquationElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [MediaEmbedPlugin.key]: MediaEmbedElement,
  [MentionPlugin.key]: MentionElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [PlaceholderPlugin.key]: MediaPlaceholderElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
  [SuggestionPlugin.key]: SuggestionLeaf,
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [TocPlugin.key]: TocElement,
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
  [VideoPlugin.key]: MediaVideoElement,
};

export const editorComponents = {
  ...viewComponents,
  [AIPlugin.key]: AILeaf,
  [EmojiInputPlugin.key]: EmojiInputElement,
  [MentionInputPlugin.key]: MentionInputElement,
  [SlashInputPlugin.key]: SlashInputElement,
};

export const useCreateEditor = (
  {
    components,
    plugins,
    override,
    readOnly,
    initialValue,
    markdown,
    ...restOptions
  }: Partial<{
    components?: Record<string, React.ComponentType<unknown>>;
    plugins?: PlatePlugin[];
    readOnly?: boolean;
    initialValue?: Value;
    markdown?: string;
    override?: Partial<CreatePlateEditorOptions<Value>['override']>;
  }> = {},
  deps: unknown[] = []
) => {
  // Use type assertion with unknown to avoid compatibility issues while maintaining type safety
  type PlateEditorFunction = typeof usePlateEditor;
  
  // Include MarkdownPlugin in the plugins list
  const markdownPlugin = MarkdownPlugin.configure({ options: { indentList: true } });
  
  // Determine the initial value based on inputs
  const editorValue = markdown 
    ? undefined // Will be set by deserializeMd below
    : initialValue || [{ type: 'p', children: [{ text: '' }] }];
  
  return (usePlateEditor as PlateEditorFunction)(
    {
      override: {
        components: {
          ...(readOnly ? viewComponents : withPlaceholders(editorComponents as unknown as Record<string, React.ComponentType>)),
          ...components,
        },
        ...override,
      },
      plugins: [
        ...([...copilotPlugins] as AnyPluginConfig[]),
        ...([...editorPlugins] as AnyPluginConfig[]),
        markdownPlugin as unknown as AnyPluginConfig,
        ...(plugins || []).map(plugin => plugin as unknown as AnyPluginConfig),
        FixedToolbarPlugin as unknown as AnyPluginConfig,
        FloatingToolbarPlugin as unknown as AnyPluginConfig,
      ],
      value: (editor) => {
        if (markdown) {
          return deserializeMd(editor, markdown);
        }
        return editorValue;
      },
      ...restOptions,
    },
    deps
  );
};
