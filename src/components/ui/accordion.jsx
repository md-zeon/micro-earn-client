import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props} />
  );
}

function AccordionItem({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center gap-3 rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}>
        {children}
        <span
          data-slot="accordion-trigger-icon"
          aria-hidden="true"
          className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-muted-foreground transition-all duration-300 ease-out group-aria-expanded/accordion-trigger:rotate-180 group-aria-expanded/accordion-trigger:border-primary/40 group-aria-expanded/accordion-trigger:bg-primary/10 group-aria-expanded/accordion-trigger:text-primary">
          <ChevronDownIcon className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-300 ease-out data-starting-style:h-0 data-ending-style:h-0"
      {...props}>
      <div
        className={cn(
          "pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
