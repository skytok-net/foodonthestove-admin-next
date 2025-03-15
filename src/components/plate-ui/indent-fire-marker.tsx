import React from 'react';

import type { SlateRenderElementProps } from '@udecode/plate';
import type { TIndentElement } from '@udecode/plate-indent';
import { cn } from '@udecode/cn';

import './indent-fire-marker.css';

export const FireMarker = (
  props: Omit<SlateRenderElementProps, 'children'>
) => {
  const { element } = props;

  return (
    <div contentEditable={false}>
      <span
        className={cn("select-none fire-marker")}
        data-plate-prevent-deserialization
        contentEditable={false}
      >
        {(element as TIndentElement).indent % 2 === 0 ? '🔥' : '🚀'}
      </span>
    </div>
  );
};

export const FireLiComponent = (props: SlateRenderElementProps) => {
  const { children } = props;

  return <li className="list-none">{children}</li>;
};
