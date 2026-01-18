import type {
  Article,
  BreadcrumbList,
  FAQPage,
  ItemList,
  Organization,
  Person,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";
import { socials, url } from "@/config";
import type { Post } from "@/lib/posts";

type JsonLdTypes =
  | Article
  | BreadcrumbList
  | Organization
  | Person
  | WebSite
  | WebPage
  | ItemList
  | FAQPage;

export function JsonLd<T extends JsonLdTypes>({
  data,
}: {
  data: WithContext<T>;
}) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Structured Data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getPersonJsonLd(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thunderbolt",
    url: url,
    image: `${url}/logo.webp`,
    jobTitle: "Web Developer",
    description:
      "Self taught web developer building beautiful websites one line of code at a time.",
    sameAs: [socials.twitter, socials.discord, socials.github],
  };
}

export function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "⚡ Thunderbolt",
    url: url,
    description:
      "I am a self taught web developer building beautiful websites one line of code at a time.",
    publisher: {
      "@type": "Person",
      name: "Thunderbolt",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/blog?search={query}`,
      query: "query",
    },
  };
}

export function getBlogPageJsonLd(recentPosts: Post[]): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blog | ⚡ Thunderbolt",
    description: "Latest articles and tutorials on web development",
    url: `${url}/blog`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${url}/blog`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: recentPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${url}/blog/${post.category}/${post.slug}`,
      })),
    },
  };
}

export function getBlogItemListJsonLd(
  posts: Post[],
  listName: string
): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${url}/blog/${post.category}/${post.slug}`,
      name: post.data.title,
    })),
  };
}

export function getCategoryPageJsonLd(
  category: string,
  posts: Post[],
  categoryDescription?: string
): WithContext<WebPage> {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${categoryName} | Blog | ⚡ Thunderbolt`,
    description:
      categoryDescription ||
      `Articles and tutorials about ${categoryName.toLowerCase()}`,
    url: `${url}/blog/${category}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${url}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `${url}/blog/${category}`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${url}/blog/${post.category}/${post.slug}`,
      })),
    },
  };
}

export function getBlogPostJsonLd(post: Post): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.date.toISOString(),
    dateModified:
      post.data.lastModified?.toISOString() || post.data.date.toISOString(),
    author: {
      "@type": "Person",
      name: "Thunderbolt",
      url: url,
    },
    publisher: {
      "@type": "Organization",
      name: "Thunderbolt",
      logo: {
        "@type": "ImageObject",
        url: `${url}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.category}/${post.slug}`,
    },
    image: `${url}/preview.webp`,
    articleSection: post.category,
    ...(post.data.tags && { keywords: post.data.tags.join(", ") }),
  };
}

export function getBlogPostBreadcrumbJsonLd(
  post: Post
): WithContext<BreadcrumbList> {
  const categoryName =
    post.category.charAt(0).toUpperCase() + post.category.slice(1);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `${url}/blog/${post.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.data.title,
        item: `${url}/blog/${post.category}/${post.slug}`,
      },
    ],
  };
}

export function getFAQJsonLd(
  faqs: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getOrganizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thunderbolt",
    url: url,
    logo: `${url}/logo.webp`,
    description:
      "Self taught web developer building beautiful websites one line of code at a time.",
    sameAs: [socials.twitter, socials.discord, socials.github],
  };
}
