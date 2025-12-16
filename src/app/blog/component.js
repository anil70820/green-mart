// // Components (app/blog/components.js)
// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';

// export function BlogCard({ post }) {
//   return (
//     <Link href={`/blog/${post.slug}`} className="group">
//       <article className="group relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-indigo-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-2 h-full flex flex-col">
//         <div className="overflow-hidden bg-indigo-50 aspect-[3/2] relative">
//           <Image
//             src={post.image}
//             alt={post.title}
//             fill
//             className="object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//           <div className="absolute top-4 left-4">
//             <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-xs font-semibold text-indigo-600 rounded-full">
//               {post.category}
//             </span>
//           </div>
//         </div>
//         <div className="p-8 flex flex-col flex-1">
//           <div className="flex items-center gap-x-2 text-xs text-gray-500 mb-4">
//             <time dateTime={post.date}>
//               {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//             </time>
//             <span>•</span>
//             <span>{post.readTime}</span>
//           </div>
//           <h3 className="text-xl font-semibold leading-6 text-gray-900 group-hover:text-indigo-600 transition-colors mb-4 line-clamp-2 flex-1">
//             {post.title}
//           </h3>
//           <p className="text-sm leading-6 text-gray-600 line-clamp-2 mb-6 flex-1">
//             {post.excerpt}
//           </p>
//           <div className="flex items-center pt-4 border-t border-gray-200">
//             <div className="text-sm text-gray-900">{post.author.name}</div>
//             <svg viewBox="0 0 2 2" className="mx-2 h-0.5 w-0.5 fill-current text-gray-300">
//               <circle cx={1} cy={1} r={1} />
//             </svg>
//             <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-500">
//               Read more <span aria-hidden="true">→</span>
//             </span>
//           </div>
//         </div>
//       </article>
//     </Link>
//   );
// }

// export function FilterGroup({ title, options, selected, onChange }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="text-sm font-medium text-gray-700 min-w-[80px]">{title}:</span>
//       <div className="flex flex-wrap gap-2">
//         {options.map((option) => (
//           <button
//             key={option}
//             onClick={() => onChange(option === selected ? '' : option)}
//             className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
//               selected === option
//                 ? 'bg-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
//             }`}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-32 pb-20">
//       <div className="absolute inset-0 bg-black/20" />
//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl text-center">
//           <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
//             Engineering
//             <span className="block bg-gradient-to-r from-white/20 bg-clip-text text-transparent drop-shadow-lg">
//               Insights
//             </span>
//           </h1>
//           <p className="mt-6 max-w-xl mx-auto text-xl text-indigo-100">
//             Latest articles on modern web development, React, Next.js, and design systems.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export function NewsletterSection() {
//   return (
//     <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl text-center">
//           <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//             Get the best insights weekly
//           </h2>
//           <p className="mx-auto mt-6 max-w-xl text-lg text-indigo-100">
//             Subscribe to receive new articles and exclusive content straight to your inbox.
//           </p>
//           <form className="mt-10 flex max-w-md mx-auto gap-x-4">
//             <input
//               type="email"
//               required
//               className="min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white placeholder:text-indigo-200 backdrop-blur focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm"
//               placeholder="Enter your email"
//             />
//             <button
//               type="submit"
//               className="flex-none rounded-md bg-white px-6 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors duration-200"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export function BlogSkeleton() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-24">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded-lg w-64 mb-8"></div>
//           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
//                 <div className="aspect-[3/2] bg-gray-200 rounded-xl mb-6"></div>
//                 <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
//                 <div className="h-10 bg-gray-200 rounded-lg"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
