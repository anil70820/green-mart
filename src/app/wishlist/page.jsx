"use client";
import Icons from "@/components/common/Icons";
import { fetchWishlist, removeFromWishlist } from "@/redux/slice/wishlistSlice";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { addToCart } from "@/redux/slice/cartSlice";

const page = () => {
  const dispatch = useDispatch();
  const { items: wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (product) => {
    dispatch(removeFromWishlist(product.product._id));
    dispatch(fetchWishlist());
  };
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        productId: product.product._id,
        quantity: 1,
      })
    );
  };
  return (
    <div className="lg:py-16 md:py-12 sm:py-9 py-6 relative">
      <div className="container xl:max-w-285 mx-auto px-5 xl:px-0">
        <h2 className="font-gilroy-bold text-off-black text-center xl:text-[54px] lg:text-5xl md:text-4xl text-3xl leading-[130%] md:mb-6 mb-5">
          Wishlist Products
        </h2>
        {loading ? (
          <div className="bg-gray-100 rounded-3xl p-6 text-center text-black">
            Your Wishlist is Loading...
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-gray-100 rounded-3xl p-6 text-center text-black">
            Your Wishlist is empty.
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-3">
            {wishlist.map((product) => {
              return (
                <div
                  key={product.product._id}
                  className="cursor-pointer flex flex-col justify-between border hover:border-light-green/50 border-white shadow-[4px_4px_14px_0px_#3F8A3114] hover:shadow-[4px_4px_16px_0px_#3F8A3114] rounded-2xl relative transition-all duration-300 h-full"
                >
                  <p className="max-w-19.25 h-6 flex items-center justify-center round p-1 bg-light-green font-iner font-medium text-xs leading-100 text-center text-[#fcfcfc] w-full rounded-tr-2xl rounded-br-2xl absolute left-0 md:top-4.5 top-2">
                    20% Off
                  </p>
                  <span
                    onClick={() => handleRemove(product)}
                    className="cursor-pointer absolute md:top-4.5 top-2 md:right-4.5 right-2 group duration-300 transition-all"
                  >
                    <AiOutlineDelete
                      size={22}
                      className="group-hover:text-red-500 duration-300 transition-all"
                    />
                  </span>
                  <div className="sm:max-h-36.5 max-h-25 w-full mt-16">
                    <Image
                      src={product.product.images?.[0]}
                      alt={product.product.title}
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
                        {product.product.categoryName}
                      </p>
                      <p className="text-black flex items-center gap-0.5 font-inter font-medium leading-100 md:text-xl sm:text-lg text-base">
                        <Image
                          src="/assets/images/svg/rating_star.svg"
                          alt="rating-star"
                          width={24}
                          height={24}
                        />
                        {product.product.rating}
                      </p>
                    </div>
                    <h3 className="font-inter font-semibold md:text-lg sm:text-base text-sm text-black leading-100 md:mb-1.5 mb-1 max-w-full line-clamp-2 overflow-ellipsis">
                      {product.product.title}
                    </h3>
                    <p className="font-inter font-normal md:text-sm text-xs text-black-600 leading-100 md:mb-4 mb-2">
                      {product.product.weight}
                    </p>
                    <div className="flex sm:items-center justify-between gap-2 max-sm:flex-col">
                      <p className="font-inter font-semibold md:text-base sm:text-sm text-xs text-black">
                        ${Number(product.product.price).toFixed(2)}
                        <del className="font-medium md:text-xs text-[10px] text-[#6D6D6D] ms-1">
                          ${Number(product.product.discountPrice).toFixed(2)}
                        </del>
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="cursor-pointer rounded-lg bg-[#B8DDB4]/45 p-1 h-7 sm:text-sm text-xs font-medium font-inter sm:max-w-16.75 w-full flex items-center justify-center gap-1 hover:bg-light-green hover:text-white active:bg-light-green active:text-white focus:bg-light-green focus:text-white transition-all duration-300 group"
                      >
                        <Icons
                          icon="cartIcon"
                          className="group-hover:stroke-white group-active:stroke-white group-focus:stroke-white transition-all duration-300"
                        />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
