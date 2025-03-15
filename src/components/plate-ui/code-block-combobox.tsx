'use client';

import React, { useState } from 'react';

import { cn } from '@udecode/cn';
import { createLowlight } from 'lowlight';
import { Check, ChevronsUpDown } from 'lucide-react';
import js from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import sql from 'highlight.js/lib/languages/sql';

import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

// Create a lowlight instance with the languages we want to support
const lowlight = createLowlight();
lowlight.register('js', js);
lowlight.register('javascript', js);
lowlight.register('ts', typescript);
lowlight.register('typescript', typescript);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('bash', bash);
lowlight.register('json', json);
lowlight.register('markdown', markdown);
lowlight.register('sql', sql);

export { lowlight };

const languages: { label: string; value: string }[] = [
  { label: 'Plain Text', value: 'text' },
  { label: 'Bash', value: 'bash' },
  { label: 'CSS', value: 'css' },
  { label: 'HTML', value: 'html' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSON', value: 'json' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'SQL', value: 'sql' },
  { label: 'TypeScript', value: 'typescript' },
];

export function CodeBlockCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState('');

  const filteredLanguages =
    search === ''
      ? languages
      : languages.filter((language) =>
          language.label.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="h-8 justify-between px-2 text-xs"
          size="sm"
        >
          {value
            ? languages.find((language) => language.value === value)?.label
            : 'Plain Text'}
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search language..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            {filteredLanguages.map((language) => (
              <CommandItem
                key={language.value}
                value={language.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === language.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
