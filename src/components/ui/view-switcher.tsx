'use client';

import { List, Grid } from 'lucide-react';

interface ViewSwitcherProps {
  view: 'list' | 'grid';
  onViewChange: (view: 'list' | 'grid') => void;
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg border p-1">
      <button
        onClick={() => onViewChange('list')}
        className={`p-1.5 rounded ${
          view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('grid')}
        className={`p-1.5 rounded ${
          view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
        aria-label="Grid view"
      >
        <Grid className="w-5 h-5" />
      </button>
    </div>
  );
} 