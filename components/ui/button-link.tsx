import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type ButtonLinkProps = ComponentProps<typeof Link> &
  ComponentProps<typeof Button> & {
    external?: boolean;
  };

function ButtonLink({
  className,
  variant,
  size,
  external = false,
  ...props
}: ButtonLinkProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link {...linkProps} {...props} />
    </Button>
  );
}

export { ButtonLink };
