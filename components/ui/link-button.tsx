import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type ButtonLinkProps = ComponentProps<typeof Link> &
  ComponentProps<typeof Button> & {
    external?: boolean;
  };

function LinkButton({
  className,
  variant,
  size,
  disableAnimation,
  external = false,
  ...props
}: ButtonLinkProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Button
      nativeButton={false}
      render={<Link {...linkProps} {...props} />}
      size={size}
      variant={variant}
      className={className}
      disableAnimation={disableAnimation}
    />
  );
}

export { LinkButton };
