// app/blog/page.js - Main Blog Listing Page
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { BlogCard, BlogSkeleton, FilterGroup, HeroSection, NewsletterSection } from "@/app/blog/component";
import { categories, generateBlogPosts, tags } from "@/utils/blog-data";

const BlogPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const data = generateBlogPosts();
    setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedTag) params.set("tag", selectedTag);
    else params.delete("tag");
    if (selectedCategory) params.set("category", selectedCategory);
    else params.delete("category");

    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedTag, selectedCategory]);

  const filteredPosts = posts.filter((post) => {
    const tagMatch = !selectedTag || post.tags.includes(selectedTag);
    const categoryMatch =
      !selectedCategory || post.category === selectedCategory;
    return tagMatch && categoryMatch;
  });

  if (loading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Filters */}
      <section className="py-16 bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "Article" : "Articles"}
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Discover insights on modern web development
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:min-w-[500px]">
              <FilterGroup
                title="Categories"
                options={categories}
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
              <FilterGroup
                title="Tags"
                options={tags}
                selected={selectedTag}
                onChange={setSelectedTag}
              />
              <button
                onClick={() => {
                  setSelectedTag("");
                  setSelectedCategory("");
                }}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-32">
              <div className="mx-auto h-24 w-24 text-gray-300 mb-8">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your filters or check back later
              </p>
              <button
                onClick={() => {
                  setSelectedTag("");
                  setSelectedCategory("");
                }}
                className="px-6 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default BlogPage;
