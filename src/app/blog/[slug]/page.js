// // app/blog/[slug]/page.js - Individual Blog Post Page
// 'use client';

// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { generateBlogPostBySlug } from '@/utils/blog-data';
// import Link from 'next/link';
// import { Calendar, Clock, ChevronLeft } from 'lucide-react';

// export default function BlogPost({ params }) {
//   const post = generateBlogPostBySlug(params.slug);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
//       {/* Hero */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
//         <div className="absolute inset-0 bg-black/30" />
//         {post.image && (
//           <Image
//             src={post.image}
//             alt={post.title}
//             width={1400}
//             height={600}
//             className="absolute inset-0 h-96 w-full object-cover object-center opacity-50"
//             priority
//           />
//         )}
//         <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-32">
//           <div className="max-w-3xl mx-auto text-center">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-8">
//               <Calendar className="w-4 h-4" />
//               {new Date(post.date).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
//               {post.title}
//             </h1>
//             <div className="flex flex-wrap justify-center items-center gap-6 text-indigo-100 text-lg">
//               <div className="flex items-center gap-2">
//                 <Clock className="w-5 h-5" />
//                 <span>{post.readTime}</span>
//               </div>
//               <span>by {post.author.name}</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="relative pb-24">
//         <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-50" />
//         <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20">
//           <div className="max-w-3xl mx-auto">
//             {/* Back Button */}
//             <Link
//               href="/blog"
//               className="group inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-12"
//             >
//               <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//               Back to blog
//             </Link>

//             {/* Article Content */}
//             <div className="prose prose-lg prose-indigo max-w-none">
//               <div dangerouslySetInnerHTML={{ __html: post.content }} />
//             </div>

//             {/* Tags */}
//             {post.tags.length > 0 && (
//               <div className="mt-16 pt-16 border-t border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {post.tags.map((tag) => (
//                     <Link
//                       key={tag}
//                       href={`/blog?tag=${tag}`}
//                       className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-200"
//                     >
//                       #{tag}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Author Bio */}
//             <div className="mt-24 pt-16 border-t border-gray-200">
//               <div className="flex items-start gap-6">
//                 <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex-shrink-0" />
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">{post.author.name}</h3>
//                   <p className="text-gray-600 mb-4">{post.author.bio}</p>
//                   <div className="flex gap-4">
//                     {post.author.twitter && (
//                       <a href={`https://twitter.com/${post.author.twitter}`} className="text-indigo-600 hover:text-indigo-500 font-medium">
//                         Twitter
//                       </a>
//                     )}
//                     {post.author.linkedin && (
//                       <a href={`https://linkedin.com/in/${post.author.linkedin}`} className="text-indigo-600 hover:text-indigo-500 font-medium">
//                         LinkedIn
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </article>
//   );
// }
