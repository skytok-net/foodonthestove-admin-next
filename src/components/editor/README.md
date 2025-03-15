# Rich Text Editing Components

This directory contains components for handling rich text editing with markdown support across the application.

## Components

### `PlateEditor`

The base editor component that provides a rich text editing experience while handling markdown serialization/deserialization.

```tsx
import { PlateEditor } from '@/components/editor/plate-editor';

<PlateEditor
  id="editor-id"
  name="editor-name"
  value={markdownValue}
  onChange={(newMarkdown) => handleChange(newMarkdown)}
  placeholder="Type something..."
/>
```

### `MarkdownField`

A form field wrapper around the PlateEditor that provides consistent styling, labels, and error handling. This should be used for all long-form text fields throughout the application.

```tsx
import { MarkdownField } from '@/components/editor/markdown-field';

<MarkdownField
  id="description"
  name="description"
  value={formData.description}
  onChange={handleDescriptionChange}
  label="Description"
  placeholder="Enter description"
  error={errors.description}
  required
  minHeight="h-48"
  helpText="Use markdown formatting to style your description"
/>
```

## Related Components

These components work together with the editor components to create a consistent UI for entity management:

### `FloatingActionButton`

A reusable floating action button component that can be used to add new entities.

```tsx
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { Plus } from 'lucide-react';

<FloatingActionButton
  onClick={handleAddEntity}
  label="Add Entity"
  icon={Plus}
  size="lg"
  position="bottom-right" // Optional: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
/>
```

### `EntityDialog`

A standardized dialog component for entity creation and editing.

```tsx
import { EntityDialog } from '@/components/ui/entity-dialog';

<EntityDialog
  isOpen={isDialogOpen}
  onOpenChange={setIsDialogOpen}
  title="Add New Entity"
  description="Fill in the details to add a new entity"
  maxWidth="5xl" // Optional: 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'
>
  <EntityEditor 
    initialEntity={currentEntity}
    onClose={handleDialogClose}
  />
</EntityDialog>
```

## Best Practices

1. Use `MarkdownField` for all long-form text content that might benefit from formatting
2. Ensure consistent handling of markdown throughout the application
3. Use the `FloatingActionButton` and `EntityDialog` pattern for entity creation/editing 
4. Follow the established pattern for error handling and validation 