"use client";
import { addToCart, fetchCart } from "@/redux/slice/cartSlice";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "@/redux/slice/wishlistSlice";
import api from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cta from "./common/Cta";
import Icons from "./common/Icons";
import { toast } from "react-toastify";
import Link from "next/link";

const FeaturedProducts = () => {
  const [product, setProduct] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const dispatch = useDispatch();
  const  wishlist = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = (productId) =>
    cartItems.some((item) => item.product?._id === productId);

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.productId === productId);

  const toggleShowAllProducts = () => {
    setShowAllProducts((prev) => !prev);
  };
  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/all-products");
      console.log("products:", res);
      setProduct(Array.isArray(res.data.products) ? res.data.products : []);
    } catch (err) {
      console.log(err);
      setProduct([]);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    );
    toast.success("Product added to your Cart.");
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    dispatch(fetchWishlist());
     dispatch(fetchCart());
  }, [dispatch]);

  const handleWishlistToggle = (productId) => {
    if (isInWishlist(productId)) {
      dispatch(removeFromWishlist(productId));
      toast.success("Product removed from your wishlist.");
    } else {
      dispatch(addToWishlist(productId));
      toast.success("Product added to your wishlist.");
    }
  };

  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6 relative">
      <Image
        className="absolute -left-12 -bottom-5 pointer-events-none -z-10 max-md:hidden"
        src="/assets/images/png/strawberries_ellipses.png"
        alt="straberries"
        width={124}
        height={117}
      />
      <div className="container xl:max-w-285 mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold text-off-black text-center xl:text-[54px] lg:text-5xl md:text-4xl text-3xl leading-[130%] md:mb-6 mb-5">
          Featured Products
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-3">
          {(Array.isArray(product)
            ? showAllProducts
              ? product
              : product.slice(0, 4)
            : []
          ).map((product, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer flex flex-col justify-between border hover:border-light-green/50 border-white shadow-[4px_4px_14px_0px_#3F8A3114] hover:shadow-[4px_4px_16px_0px_#3F8A3114] rounded-2xl relative transition-all duration-300 h-full"
              >
                <p className="max-w-19.25 h-6 flex items-center justify-center round p-1 bg-light-green font-iner font-medium text-xs leading-100 text-center text-[#fcfcfc] w-full rounded-tr-2xl rounded-br-2xl absolute left-0 md:top-4.5 top-2">
                  20% Off
                </p>
                <span
                  onClick={() => handleWishlistToggle(product._id)}
                  className="cursor-pointer absolute md:top-4.5 top-2 md:right-4.5 right-2"
                >
                  <Icons
                    icon="heartIcon"
                    toggleIcon={isInWishlist(product._id) ? "stroke-red" : ""}
                    toggleIconFill={
                      isInWishlist(product._id) ? "fill-red stroke-red" : ""
                    }
                  />
                </span>

                <div className="sm:max-h-36.5 max-h-25 w-full mt-16">
                  <Image
                    src={product.images?.[0]}
                    alt={product.title}
                    fill={false}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain w-full max-h-full"
                  />
                </div>
                <div className="sm:p-4.5 p-2">
                  <div className="flex justify-between gap-4 mb-1">
                    <p className="font-normal text-light-green/60 leading-100 text-13 font-inter">
                      {product.categoryName}
                    </p>
                    <p className="text-black flex items-center gap-0.5 font-inter font-medium leading-100 md:text-xl sm:text-lg text-base">
                      <Image
                        src="/assets/images/svg/rating_star.svg"
                        alt="rating-star"
                        width={24}
                        height={24}
                      />
                      {product.rating}
                    </p>
                  </div>
                  <h3 className="font-inter font-semibold md:text-lg sm:text-base text-sm text-black leading-100 md:mb-1.5 mb-1 max-w-full line-clamp-2 overflow-ellipsis">
                    {product.title}
                  </h3>
                  <p className="font-inter font-normal md:text-sm text-xs text-black-600 leading-100 md:mb-4 mb-2">
                    {product.weight}
                  </p>
                  <div className="flex sm:items-center justify-between gap-2 max-sm:flex-col">
                    <p className="font-inter font-semibold md:text-base sm:text-sm text-xs text-black">
                      ${product.price.toFixed(2)}
                      <del className="font-medium md:text-xs text-[10px] text-[#6D6D6D] ms-1">
                        ${product.discountPrice.toFixed(2)}
                      </del>
                    </p>
                    {isInCart(product._id) ? (
                      <Link href="/cart"
                        className="rounded-lg bg-green-500/20 hover:bg-green-500/10 duration-300 text-green-700 p-1 h-7 sm:text-sm text-xs font-medium font-inter sm:max-w-20 w-full flex items-center justify-center gap-1"
                      >
                         <Icons
                          icon="cartIcon"
                          className="group-hover:stroke-white transition-all duration-300"
                        />
                        View
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="cursor-pointer rounded-lg bg-[#B8DDB4]/45 p-1 h-7 sm:text-sm text-xs font-medium font-inter sm:max-w-16.75 w-full flex items-center justify-center gap-1 hover:bg-light-green hover:text-white transition-all duration-300 group"
                      >
                        <Icons
                          icon="cartIcon"
                          className="group-hover:stroke-white transition-all duration-300"
                        />
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Cta
          onClick={toggleShowAllProducts}
          className="mt-10 max-w-53.75 mx-auto"
        >
          {showAllProducts ? "View Less Products" : "View All Products"}
        </Cta>
      </div>
    </div>
  );
};

export default FeaturedProducts;
