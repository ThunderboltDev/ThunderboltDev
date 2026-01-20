"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { type MouseEvent, useRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap rounded-md text-sm font-medium transition-all active:brightness-80 disabled:saturate-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/25 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground",
        outline: "border border-border bg-border/50 backdrop-blur-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:text-accent shadow-none hover:shadow-none",
      },
      size: {
        "default": "h-9 px-4 py-2 has-[>svg]:px-3",
        "lg": "h-10 rounded-md px-6 has-[>svg]:px-4",
        "icon": "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  disableAnimation?: boolean;
}

function Button({
  className,
  children,
  variant,
  size,
  render,
  disableAnimation = true,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || props.disabled || disableAnimation) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    const maxMove = 3;
    const moveX = deltaX * maxMove;
    const moveY = deltaY * maxMove;

    buttonRef.current.style.setProperty("--mouse-x", `${x}px`);
    buttonRef.current.style.setProperty("--mouse-y", `${y}px`);

    buttonRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || disableAnimation) return;
    buttonRef.current.style.transform = "translate(0, 0) scale(1)";
  };

  return (
    <ButtonPrimitive
      ref={buttonRef}
      render={render}
      data-slot="button"
      data-disable-animation={disableAnimation}
      className={cn(buttonVariants({ variant, size, className }))}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
