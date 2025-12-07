import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
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
        ghost: "hover:bg-accent hover:text-accent-foreground",
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

const styles = (
  <style jsx global>{`
    @keyframes button-glow {
      0%,
      100% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
    }

    [data-slot="button"]::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background: radial-gradient(
        circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%),
        oklch(1 0 0 / 10%),
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    [data-slot="button"]:hover::before {
      opacity: 1;
    }

    [data-slot="button"]::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: oklch(1 0 0 / 10%);
      transform: translate(-50%, -50%);
      transition: width 0.6s ease, height 0.6s ease;
      pointer-events: none;
    }

    [data-slot="button"] {
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    [data-slot="button"]:disabled {
      transform: none !important;
    }

    [data-slot="button"]:disabled::before,
    [data-slot="button"]:disabled::after {
      display: none;
    }
  `}</style>
);

function Button({
  className,
  children,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || props.disabled) return;

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
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0, 0) scale(1)";
  };

  return (
    <>
      {styles}
      <Comp
        ref={asChild ? undefined : buttonRef}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        onMouseMove={asChild ? undefined : handleMouseMove}
        onMouseLeave={asChild ? undefined : handleMouseLeave}
        {...props}
      >
        {children}
      </Comp>
    </>
  );
}

export { Button, buttonVariants };
