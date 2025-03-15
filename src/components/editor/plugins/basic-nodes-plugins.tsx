'use client';

import { BaseBasicMarksPlugin } from '@udecode/plate-basic-marks';
import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import { BaseCodeBlockPlugin } from '@udecode/plate-code-block';
import { BaseHeadingPlugin } from '@udecode/plate-heading';
import { createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

// Create a lowlight instance with the languages we want to support
const lowlight = createLowlight();
lowlight.register('js', js);
lowlight.register('javascript', js);
lowlight.register('ts', typescript);
lowlight.register('typescript', typescript);
lowlight.register('html', html);
lowlight.register('css', css);

export const basicNodesPlugins = [
  BaseHeadingPlugin.configure({ options: { levels: 3 } }),
  BaseBlockquotePlugin,
  BaseCodeBlockPlugin.configure({ options: { lowlight } }),
  BaseBasicMarksPlugin,
] as const;
