'use client';

import { cn } from '@udecode/cn';
import {
  PreviewImage,
  useImagePreview,
  useImagePreviewValue,
  useScaleInput,
} from '@udecode/plate-media/react';
import { useEditorRef } from '@udecode/plate/react';
import { cva } from 'class-variance-authority';
import { ArrowLeft, ArrowRight, Download, Minus, Plus, X } from 'lucide-react';

const toolButtonVariants = cva('rounded bg-[rgba(0,0,0,0.5)] px-1', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'text-white',
      disabled: 'cursor-not-allowed text-gray-400',
    },
  },
});

const SCROLL_SPEED = 4;

export const ImagePreview = () => {
  const editor = useEditorRef();
  const isOpen = useImagePreviewValue('isOpen', editor.id);
  const scale = useImagePreviewValue('scale');
  const isEditingScale = useImagePreviewValue('isEditingScale');
  const {
    closeProps,
    currentUrlIndex,
    maskLayerProps,
    nextDisabled,
    nextProps,
    prevDisabled,
    prevProps,
    scaleTextProps,
    zommOutProps,
    zoomInDisabled,
    zoomInProps,
    zoomOutDisabled,
  } = useImagePreview({ scrollSpeed: SCROLL_SPEED });

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-50 h-screen w-screen select-none',
        !isOpen && 'hidden'
      )}
      onContextMenu={(e) => e.stopPropagation()}
      {...maskLayerProps}
    >
      <div className="absolute inset-0 size-full bg-black opacity-30"></div>
      <div className="absolute inset-0 size-full bg-black opacity-30"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex max-h-screen w-full items-center">
          <PreviewImage
            className={cn(
              'mx-auto block max-h-[calc(100vh-4rem)] w-auto object-contain transition-transform'
            )}
          />
          <div
            className="absolute bottom-0 left-1/2 z-40 flex w-fit -translate-x-1/2 justify-center gap-4 p-2 text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-1">
              <button
                {...prevProps}
                className={cn(
                  toolButtonVariants({
                    variant: prevDisabled ? 'disabled' : 'default',
                  })
                )}
                type="button"
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>
              {(currentUrlIndex ?? 0) + 1}
              <button
                {...nextProps}
                className={cn(
                  toolButtonVariants({
                    variant: nextDisabled ? 'disabled' : 'default',
                  })
                )}
                type="button"
                aria-label="Next image"
              >
                <ArrowRight />
              </button>
            </div>
            <div className="flex">
              <button
                className={cn(
                  toolButtonVariants({
                    variant: zoomOutDisabled ? 'disabled' : 'default',
                  })
                )}
                {...zommOutProps}
                type="button"
                aria-label="Zoom out"
              >
                <Minus className="size-4" />
              </button>
              <div className="mx-px">
                {isEditingScale ? (
                  <div className="flex items-center" role="group" aria-labelledby="scale-label">
                    <span id="scale-label" className="sr-only">Image zoom percentage</span>
                    <ScaleInput className="w-10 rounded px-1 text-slate-500 outline" />
                    <span aria-hidden="true">%</span>
                  </div>
                ) : (
                  <span {...scaleTextProps} aria-label={`Zoom level: ${scale * 100}%`}>{scale * 100 + '%'}</span>
                )}
              </div>
              <button
                className={cn(
                  toolButtonVariants({
                    variant: zoomInDisabled ? 'disabled' : 'default',
                  })
                )}
                {...zoomInProps}
                type="button"
                aria-label="Zoom in"
              >
                <Plus className="size-4" />
              </button>
            </div>
            {/* TODO: downLoad the image */}
            <button
              className={cn(toolButtonVariants())}
              type="button"
              aria-label="Download image"
            >
              <Download className="size-4" />
            </button>
            <button
              {...closeProps}
              className={cn(toolButtonVariants())}
              type="button"
              aria-label="Close image preview"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ScaleInput(props: React.ComponentProps<'input'>) {
  const { props: scaleInputProps, ref } = useScaleInput();

  return (
    <input 
      {...scaleInputProps} 
      {...props} 
      ref={ref} 
      aria-label="Image zoom percentage" 
      title="Image zoom percentage"
    />
  );
}
