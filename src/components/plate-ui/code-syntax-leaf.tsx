'use client';

import React from 'react';

import { withRef } from '@udecode/cn';
import { PlateLeaf } from '@udecode/plate/react';

export const CodeSyntaxLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    const { leaf } = props;
    const className = typeof leaf.className === 'string' ? leaf.className : '';

    return (
      <PlateLeaf ref={ref} {...props}>
        <span className={className}>{children}</span>
      </PlateLeaf>
    );
  }
);
