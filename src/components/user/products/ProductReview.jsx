export default function ProductReviews() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        Customer Reviews
        <span className="text-sm font-normal text-gray-500 bg-gray-100 dk:bg-[#1a2e1a] px-2 py-1 rounded-full">
          128
        </span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-white dk:bg-[#1a2e1a] p-6 rounded-xl h-fit border border-gray-100 dk:border-[#2a4e2a]">
          <div className="flex flex-col gap-2 mb-6">
            <p className="text-[#111811] dk:text-white text-5xl font-black leading-tight tracking-[-0.033em]">
              4.5
            </p>
            <div className="flex gap-1 text-yellow-400">
              <span className="material-symbols-outlined fill-current">
                star
              </span>
              <span className="material-symbols-outlined fill-current">
                star
              </span>
              <span className="material-symbols-outlined fill-current">
                star
              </span>
              <span className="material-symbols-outlined fill-current">
                star
              </span>
              <span className="material-symbols-outlined fill-current">
                star_half
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Based on 128 verified reviews
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 font-medium">5</span>
              <div className="flex-1 h-2 bg-gray-100 dk:bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-[#13ec13] h-full rounded-full w-[70%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">70%</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 font-medium">4</span>
              <div className="flex-1 h-2 bg-gray-100 dk:bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-[#13ec13] h-full rounded-full w-[15%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">15%</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 font-medium">3</span>
              <div className="flex-1 h-2 bg-gray-100 dk:bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-[#13ec13] h-full rounded-full w-[8%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">8%</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 font-medium">2</span>
              <div className="flex-1 h-2 bg-gray-100 dk:bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-[#13ec13] h-full rounded-full w-[2%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">2%</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-3 font-medium">1</span>
              <div className="flex-1 h-2 bg-gray-100 dk:bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-[#13ec13] h-full rounded-full w-[5%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">5%</span>
            </div>
          </div>
          <button className="w-full mt-8 py-3 border border-[#111811] dk:border-gray-500 rounded-lg font-semibold hover:bg-[#111811] hover:text-white transition-colors">
            Write a Review
          </button>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dk:bg-[#1a2e1a] p-6 rounded-xl border border-gray-100 dk:border-[#2a4e2a]">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-full bg-gray-200 dk:bg-gray-700 overflow-hidden bg-cover bg-center"
                  data-alt="Profile picture of Sarah J"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeTz_-sZPkIh43mwF5qquXy2KIKI9kpBp-CBLK8WLPtvcyVzIka8z_9UNckUCLYdamyWAC-0UG3sOWjHwZ446PzHx_E211pdrGUWLnY5m3g9upZHW_d3by_W1br9HdemU6oLJ0hEXoiA7fyVcvVRg10liO9zeRxsZ4YtUoarXu9-pQcH7-aTQ0_PQLvV2TBkgGqMeujuhXS0xmofDjjMreNFnsbU7WP7YY4IKC7DmFORqtq8DyRb05AKuAKzAVe91v9yp_mo3A5RWT"
                    alt="profile"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">Sarah J.</p>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-xs">
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                    </div>
                    <span className="text-green-600 dk:text-green-400 text-xs flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">
                        verified
                      </span>{" "}
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">2 weeks ago</span>
            </div>
            <h4 className="font-bold text-base mb-2">
              Beautiful and Functional!
            </h4>
            <p className="text-gray-600 dk:text-gray-300 text-sm leading-relaxed mb-4">
              I love this cup! The bamboo texture feels great in the hand and it
              doesn't get too hot to hold. Plus, I feel great knowing I'm not
              using single-use plastic. Highly recommend!
            </p>
            <div className="flex gap-4 text-xs text-gray-500 font-medium">
              <button className="flex items-center gap-1 hover:text-[#111811] dk:hover:text-white">
                <span className="material-symbols-outlined text-[16px]">
                  thumb_up
                </span>{" "}
                Helpful (12)
              </button>
              <button className="flex items-center gap-1 hover:text-[#111811] dk:hover:text-white">
                <span className="material-symbols-outlined text-[16px]">
                  thumb_down
                </span>{" "}
                Not helpful
              </button>
            </div>
          </div>
          <div className="bg-white dk:bg-[#1a2e1a] p-6 rounded-xl border border-gray-100 dk:border-[#2a4e2a]">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  M
                </div>
                <div>
                  <p className="font-bold text-sm">Mike T.</p>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400 text-xs">
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                      <span className="material-symbols-outlined fill-current text-[16px]">
                        star
                      </span>
                    </div>
                    <span className="text-green-600 dk:text-green-400 text-xs flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">
                        verified
                      </span>{" "}
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">1 month ago</span>
            </div>
            <h4 className="font-bold text-base mb-2">
              Good cup, lid could be tighter
            </h4>
            <p className="text-gray-600 dk:text-gray-300 text-sm leading-relaxed mb-4">
              The cup itself is excellent quality. The only reason for 4 stars
              is that the silicone lid sometimes feels a bit loose if you don't
              press it down really hard. Otherwise, great product.
            </p>
            <div className="flex gap-4 text-xs text-gray-500 font-medium">
              <button className="flex items-center gap-1 hover:text-[#111811] dk:hover:text-white">
                <span className="material-symbols-outlined text-[16px]">
                  thumb_up
                </span>{" "}
                Helpful (4)
              </button>
              <button className="flex items-center gap-1 hover:text-[#111811] dk:hover:text-white">
                <span className="material-symbols-outlined text-[16px]">
                  thumb_down
                </span>{" "}
                Not helpful
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
