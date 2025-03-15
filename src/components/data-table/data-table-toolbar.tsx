'use client';

import * as React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';

// Define the option type for select filter fields
interface FilterOption {
  label: string;
  value: string;
}

// Define the DataTableFilterField type
export interface DataTableFilterField<TData> {
  id: keyof TData | string;
  label: string;
  placeholder?: string;
  options?: FilterOption[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterFields?: DataTableFilterField<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-4">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {filterFields
          .filter(field => !field.options)
          .map(field => (
            <div key={field.id as string} className="flex-1">
              <Input
                placeholder={field.placeholder || `Filter by ${field.label}...`}
                value={(table.getColumn(field.id as string)?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn(field.id as string)?.setFilterValue(event.target.value)
                }
                className="h-9 md:w-auto"
              />
            </div>
          ))}

        {filterFields
          .filter(field => field.options)
          .map(field => (
            <div key={field.id as string}>
              <Select
                value={(table.getColumn(field.id as string)?.getFilterValue() as string[])?.join(',') || ''}
                onValueChange={(value) => {
                  if (value) {
                    table.getColumn(field.id as string)?.setFilterValue(value.split(','));
                  } else {
                    table.getColumn(field.id as string)?.setFilterValue(undefined);
                  }
                }}
              >
                <SelectTrigger className="h-9 w-[200px]">
                  <SelectValue placeholder={`Filter by ${field.label}...`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {field.options?.map((option: FilterOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
} 