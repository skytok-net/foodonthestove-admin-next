'use client';

import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import { BaseCodeBlockPlugin } from '@udecode/plate-code-block';
import { HEADING_LEVELS } from '@udecode/plate-heading';
import { BaseIndentListPlugin } from '@udecode/plate-indent-list';
import { BaseIndentPlugin } from '@udecode/plate-indent';
import { BaseParagraphPlugin } from '@udecode/plate';
import { BaseTogglePlugin } from '@udecode/plate-toggle';

import {
  FireLiComponent,
  FireMarker,
} from '@/components/plate-ui/indent-fire-marker';
import {
  TodoLi,
  TodoMarker,
} from '@/components/plate-ui/indent-todo-marker';

export const indentListPlugins = [
  BaseIndentPlugin.extend({
    inject: {
      targetPlugins: [
        BaseParagraphPlugin.key,
        ...HEADING_LEVELS,
        BaseBlockquotePlugin.key,
        BaseCodeBlockPlugin.key,
        BaseTogglePlugin.key,
      ],
    },
  }),
  BaseIndentListPlugin.extend({
    inject: {
      targetPlugins: [
        BaseParagraphPlugin.key,
        ...HEADING_LEVELS,
        BaseBlockquotePlugin.key,
        BaseCodeBlockPlugin.key,
        BaseTogglePlugin.key,
      ],
    },
    options: {
      listStyleTypes: {
        fire: {
          liComponent: FireLiComponent,
          markerComponent: FireMarker,
          type: 'fire',
        },
        todo: {
          liComponent: TodoLi,
          markerComponent: TodoMarker,
          type: 'todo',
        },
      },
    },
  }),
];
