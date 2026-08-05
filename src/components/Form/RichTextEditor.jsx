import {
  RichTextEditor as BaseRichTextEditor,
  RichTextEditorToolbar,
  RichTextEditorContent,
  RichTextEditorLinkBubble,
} from "@/components/ui/rich-text-editor";
import { cn } from "@/lib/utils";

const minHeightClasses = {
  "min-h-24": "[&_.ProseMirror]:!min-h-24",
  "min-h-28": "[&_.ProseMirror]:!min-h-28",
  "min-h-32": "[&_.ProseMirror]:!min-h-32",
  "min-h-40": "[&_.ProseMirror]:!min-h-40",
};

const RichTextEditor = ({
  value,
  onChange,
  id,
  ariaLabel,
  className,
  error,
  minHeight = "min-h-32",
}) => {
  return (
    <div
      className={cn(
        error &&
          "[&_[data-slot=rich-text-editor]]:border-destructive [&_[data-slot=rich-text-editor]]:ring-3 [&_[data-slot=rich-text-editor]]:ring-destructive/20",
      )}
    >
      <BaseRichTextEditor value={value} onChange={onChange} className={className}>
        <RichTextEditorToolbar />
        <RichTextEditorContent
          id={id}
          aria-label={ariaLabel}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={minHeightClasses[minHeight] || minHeightClasses["min-h-32"]}
        />
        <RichTextEditorLinkBubble />
      </BaseRichTextEditor>
    </div>
  );
};

export default RichTextEditor;
