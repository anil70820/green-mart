// lib/blog-data.js - Mock Data & Utilities
export const tags = ["nextjs", "react", "tailwind", "typescript", "design"];
export const categories = [
  "JavaScript",
  "React",
  "Next.js",
  "Design",
  "Performance",
];

export function generateBlogPosts() {
  return [
    {
      id: 1,
      slug: "nextjs-15-app-router-complete-guide",
      title: "Next.js 15 App Router: Complete Guide",
      excerpt:
        "Master the new App Router in Next.js 15 with advanced patterns, layouts, and server components.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      date: "2025-12-10",
      readTime: "12 min read",
      category: "Next.js",
      tags: ["nextjs", "react", "typescript"],
      author: {
        name: "Jane Doe",
        bio: "Full-stack developer specializing in React ecosystems",
        twitter: "janedev",
        linkedin: "janedoe",
      },
    },
    {
      id: 2,
      slug: "tailwind-v4-design-systems",
      title: "Tailwind CSS v4: Building Design Systems",
      excerpt:
        "Create scalable, maintainable design systems with Tailwind CSS v4 new configuration system.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      date: "2025-12-08",
      readTime: "8 min read",
      category: "Design",
      tags: ["tailwind", "design", "css"],
      author: {
        name: "John Smith",
        bio: "UI/UX designer and Tailwind CSS advocate",
        twitter: "johnsmithui",
        linkedin: "johnsmith",
      },
    },
    {
      id: 3,
      slug: "react-server-components-deep-dive",
      title: "React Server Components: Deep Dive",
      excerpt:
        "Understand React Server Components architecture, streaming, and performance optimizations.",
      image:
        "https://images.unsplash.com/photo-1517433456452-df4d4d7b3df1?w=800&h=400&fit=crop",
      date: "2025-12-05",
      readTime: "15 min read",
      category: "React",
      tags: ["react", "nextjs", "performance"],
      author: {
        name: "Sarah Johnson",
        bio: "React core team contributor and performance expert",
        twitter: "sarahreact",
        linkedin: "sarahjohnson",
      },
    },
  ];
}

export function generateBlogPostBySlug(slug) {
  return generateBlogPosts().find((post) => post.slug === slug);
}
