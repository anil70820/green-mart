"use client";
import RetrunDetails from "@/components/seller/retrun/RetrunDetails";
import RetrunList from "@/components/seller/retrun/RetrunList";
import RetrunSearch from "@/components/seller/retrun/RetrunSearch";
import RetrunTabs from "@/components/seller/retrun/RetrunTabs";
import { useMemo, useState } from "react";
const RETURNS = [
  {
    id: "8493-21",
    title: "Organic Avocados",
    customer: "Sarah Jenning",
    status: "Pending",
    price: 12.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSWkYxD7Jeemhyvul_MzRdrw_IpMviIqSObz1rUKCELNh7eYf3XThf5nf9IwY3rZIAU0zWDb_55OPVRvldQaB_yO20zLCA91OLaxN4qImz_9oWiB3I9Omz_vqPCRWtPpSkxnFsXz4fvFAqEekDOQwmmRCFafPjUY1HVMG3FuoOxZfNaVFh-LgsshraYSyEb2Ghxv5ANAtV59fFzoFNYLeL2oMIRejZl_1vYEQirpROl4ecQbZXvlAtiKPvKlqVXACwjcN14_CtR_Dc",
    reason:
      "The avocados arrived completely bruised and inedible. I've attached photos.",
  },
  {
    id: "8455-90",
    title: "Ceramic Vase - Blue",
    customer: "Michael Chen",
    status: "Rejected",
    price: 22,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAt1UxO5vTcM644hW4N1EpjpDJfRIhBU1mZIgxoERa4vOD0XTBV6Vv1mW8K8NBv5JdY5YnmiGwqZzp5YGcd7z2eKBiDSYOSc2fquYFnNUYcW_URsvWbcyd1NfV2yh1rLjUKNgeZW4hkf9MHO4oyUFfdPxx9CqGt4XI0MmyCXnBgW3SdwltNsGBupeqKaIHnAIayOmcMO7_y1o4ccIu2kQjFkjWHqAnZntQVFNmS9vSV1fXGlGnMWShpl1FM331umLYwTuK3KnWyD97U",
    reason: "Changed my mind",
  },

  {
    id: "8422-11",
    title: "Nike Air Zoom Pegasus",
    customer: "Jessica Lowe",
    status: "Pending",
    price: 89,
    // image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
    reason: "Size was smaller than expected",
  },
  {
    id: "8422-12",
    title: "Adidas Ultraboost",
    customer: "Robert Johnson",
    status: "Approved",
    price: 120,
    // image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    reason: "Comfort not as expected",
  },
  {
    id: "8422-13",
    title: "New Balance Fresh Foam",
    customer: "Lisa Green",
    status: "Pending",
    price: 110,
    // image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    reason: "Wrong color delivered",
  },
  {
    id: "8399-01",
    title: "Organic Apples (Pack of 6)",
    customer: "Emily White",
    status: "Pending",
    price: 8.5,
    // image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    reason: "Some apples were rotten",
  },
  {
    id: "8399-02",
    title: "Bananas (1 Dozen)",
    customer: "David Brown",
    status: "Approved",
    price: 5,
    // image: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e",
    reason: "Overripe on delivery",
  },
  {
    id: "8399-03",
    title: "Broccoli Fresh Pack",
    customer: "Sophia Wilson",
    status: "Rejected",
    price: 4.2,
    // image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c",
    reason: "Ordered by mistake",
  },
  {
    id: "8399-04",
    title: "Almond Milk (1L)",
    customer: "Daniel Harris",
    status: "Pending",
    price: 3.5,
    // image: "https://images.unsplash.com/photo-1585238342028-4bbc8b6c7f59",
    reason: "Package leaking",
  },
  {
    id: "8399-05",
    title: "Cold Drink Combo",
    customer: "Olivia Martin",
    status: "Approved",
    price: 15,
    // image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
    reason: "Expired product received",
  },
  {
    id: "8399-06",
    title: "Decorative Plate",
    customer: "James Anderson",
    status: "Pending",
    price: 18,
    // image: "https://images.unsplash.com/photo-1582582429416-5f76b9e33d1c",
    reason: "Cracked on arrival",
  },
  {
    id: "8399-07",
    title: "Carrots Fresh Pack",
    customer: "Ava Thompson",
    status: "Approved",
    price: 3,
    // image: "https://images.unsplash.com/photo-1582515073490-dc84e58f41b9",
    reason: "Quality not fresh",
  },
  {
    id: "8399-08",
    title: "Cauliflower",
    customer: "William Moore",
    status: "Pending",
    price: 2.8,
    // image: "https://images.unsplash.com/photo-1604908177522-4020c4c4a0fa",
    reason: "Damaged during transport",
  },
  {
    id: "8399-09",
    title: "Apple Juice Bottle",
    customer: "Isabella Clark",
    status: "Rejected",
    price: 6,
    // image: "https://images.unsplash.com/photo-1571073162147-42e6f0c4c6b9",
    reason: "No longer needed",
  },
  {
    id: "8399-10",
    title: "Organic Tomatoes",
    customer: "Benjamin Lewis",
    status: "Approved",
    price: 4,
    // image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    reason: "Too soft on delivery",
  },
];

export default function page() {
  const [tab, setTab] = useState("All Requests");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(RETURNS[0]);
  const [returnSidebar, setReturnSidebar] = useState();
  const filtered = useMemo(() => {
    return RETURNS.filter((item) => {
      const matchTab = tab === "All Requests" || item.status === tab;
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.id.includes(search);
      return matchTab && matchSearch;
    });
  }, [tab, search]);
  const counts = useMemo(() => {
    return {
      "All Requests": RETURNS.length,
      Pending: RETURNS.filter((i) => i.status === "Pending").length,
      Approved: RETURNS.filter((i) => i.status === "Approved").length,
      Rejected: RETURNS.filter((i) => i.status === "Rejected").length,
    };
  }, []);

  return (
    <div className="grid xl:grid-cols-12 px-5 bg-[#f6f8f6] gap-5 h-[calc(100vh-75px)]">
      <div className="flex flex-col h-full overflow-hidden xl:col-span-5 2xl:col-span-6">
        <div className="sticky top-0 bg-[#f6f8f6] pb-5 z-20 pt-5">
          <RetrunTabs tab={tab} setTab={setTab} counts={counts} />
          <RetrunSearch search={search} setSearch={setSearch} />
        </div>
        <RetrunList
          setReturnSidebar={setReturnSidebar}
          data={filtered}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {/* RIGHT */}
      <div
        className={`xl:col-span-7 2xl:col-span-6 xl:static fixed max-xl:h-screen max-xl:shadow-2xl max-xl:px-5 max-xl:z-30 top-0 max-xl:bg-[#f6f8f6] max-xl:max-w-150 w-full transition-all duration-300 ${
          returnSidebar ? "right-0 top-0" : "-right-full"
        }`}
      >
        <RetrunDetails data={selected} setReturnSidebar={setReturnSidebar} />
      </div>
    </div>
  );
}
