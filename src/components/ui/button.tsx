"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-semibold whitespace-nowrap tracking-wide transition-all duration-300 ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_1px_0_rgba(255,255,255,0.12)_inset] hover:shadow-[0_6px_20px_-4px_var(--btn-glow),0_0_0_1px_rgba(255,255,255,0.12)_inset,0_1px_0_rgba(255,255,255,0.15)_inset] hover:-translate-y-0.5 hover:brightness-[1.15] active:translate-y-0 active:brightness-100 active:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.08)_inset] [--btn-glow:oklch(0.55_0.24_264_/_0.45)]",
        outline:
          "border border-border/80 bg-white/80 backdrop-blur-sm text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-primary/30 hover:bg-primary/[0.04] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-white text-foreground border border-border/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.8)_inset] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.8)_inset] hover:-translate-y-0.5 hover:border-primary/20 active:translate-y-0 active:shadow-[0_1px_2px_rgba(0,0,0,0.06)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] active:bg-foreground/[0.08] rounded-lg aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/15 hover:border-destructive/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-destructive/30 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-lg px-3.5 text-[0.8rem] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-7 text-[0.925rem] rounded-xl has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-9",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
