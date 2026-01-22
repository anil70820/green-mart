"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "All Categories",
    slug: "all",
    bg: "bg-yellow-50 border-yellow-300",
  },
  {
    name: "Fresh Fruits & Vegetable",
    slug: "fruits-vegetables",
    values: ["fruits", "vegetables"], // 👈 IMPORTANT
    image: "/assets/images/png/fruits_categories.png",
    bg: "bg-green-50 border-green-300",
  },
  {
    name: "Cooking Oil & Ghee",
    slug: "oil-ghee",
    values: ["oil", "ghee"],
    image: "/assets/images/png/oil_categories.png",
    bg: "bg-orange-50 border-orange-300",
  },
  {
    name: "Bakery & Snacks",
    slug: "bakery-snackes",
    values: ["bakery", "snackes"],
    image: "/assets/images/png/snacks_categories.png",
    bg: "bg-purple-50 border-purple-300",
  },
  {
    name: "Beverages",
    slug: "beverages",
    values: ["beverages"],
    image: "/assets/images/png/cold_drinks.png",
    bg: "bg-blue-50 border-blue-300",
  },
];
const CategoryStrip = () => {
  const router = useRouter();

  return (
    <section className="mb-8 container xl:max-w-285 xl:px-0 px-5 mx-auto mt-10 scrollbar_hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Our Categories</h2>
        </div>
      </div>

      <div className="flex overflow-auto gap-5">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => router.push(`/products?category=${cat.slug}`)}
            className={`cursor-pointer rounded-2xl border p-5 text-center min-w-50 ${cat.bg} hover:shadow-md transition`}
          >
            {cat.image && (
              <Image
                src={cat.image}
                alt={cat.name}
                width={120}
                height={120}
                className="mx-auto"
              />
            )}
            <p className={`mt-4 font-semibold ${cat.slug === "all" ? "sm:text-2xl text-xl mt-16":""}`}>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;
