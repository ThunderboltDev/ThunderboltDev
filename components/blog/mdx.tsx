import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps, HTMLAttributes, ImgHTMLAttributes } from "react";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

interface MDXImageProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "width" | "height"
  > {
  src: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  alt?: string;
}

function MDXLink(props: ComponentProps<typeof Link>) {
  return (
    <Link
      className="link"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function MDXImage({
  src,
  alt = "Blog image",
  width = 800,
  height = 600,
  className,
  ...props
}: MDXImageProps) {
  if (!src)
    return <p className="text-muted-foreground">Missing image source</p>;

  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={false}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="rounded-md border bg-muted object-cover"
        {...props}
      />
      {alt && (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

const components: MDXComponents = {
  h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-2 scroll-m-10 text-4xl font-bold tracking-tight text-left"
      {...props}
    />
  ),
  h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 scroll-m-10 pb-1 text-3xl font-semibold tracking-tight first:mt-0 text-left"
      {...props}
    />
  ),
  h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 scroll-m-10 text-2xl font-semibold tracking-tight text-left"
      {...props}
    />
  ),
  h4: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-8 scroll-m-10 text-xl font-semibold tracking-tight text-left"
      {...props}
    />
  ),
  h5: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="mt-8 scroll-m-10 text-lg font-semibold tracking-tight text-left"
      {...props}
    />
  ),
  h6: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="mt-8 scroll-m-10 text-base font-semibold tracking-tight text-left"
      {...props}
    />
  ),
  a: MDXLink,
  img: MDXImage,
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="text-muted-foreground my-6 ml-6 list-disc [&>li]:mt-2"
      {...props}
    />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="text-muted-foreground my-6 ml-6 list-decimal [&>li]:mt-2"
      {...props}
    />
  ),
  li: ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className="mt-2" {...props} />
  ),
  blockquote: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-border pl-6 italic [&>*]:text-muted-foreground"
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="text-border my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0 even:bg-muted" {...props} />
  ),
  th: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
      {...props}
    />
  ),
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    />
  ),
  Image,
};

export function CustomMDX(props: ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug, rehypePrism],
        },
      }}
    />
  );
}
