"use server";
import React from "react";
import aboutImage from "@/assets/logo/rbcl.jpg";
import Image from "next/image";
import NavBar from "@/components/pages/header/NavBar/NavBar";
import { getCartProducts } from "@/services/cart";
import { getUser } from "@/services/auth";

const page = async () => {
  const user = await getUser();
  const userRef = user?.id;
  const coupon = "";
  const userCartProducts = await getCartProducts(userRef, coupon);
  const companyName = "Royel business company limited";
  return (
    <div>
      <NavBar userCartProducts={userCartProducts?.data} />
      {/* <div className="bg-[#1D4092] mt-20 w-full py-6 lg:flex hidden"></div> */}
      <div className="container mx-auto lg:py-12 lg:mt-0 mt-20 mb-32 px-4">
        {/* Main Content Wrapper */}
        <div className="max-w-6xl mx-auto">

          {/* Hero Section with Image and Introduction */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 mb-12">

            {/* Company Image */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative border-2 border-amber-600/20 rounded-xl p-3 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src={aboutImage}
                    alt="Royel Business Company"
                    width={140}
                    height={140}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="flex-1">
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed">
                  Welcome to{" "}
                  <span className="relative inline-block">
                    <span className="uppercase text-transparent bg-clip-text bg-[#D4A373] font-extrabold tracking-wide">
                      {companyName}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"></div>
                  </span>
                </h1>
                <p className="text-gray-600 mt-4 text-lg font-medium">
                  A name born from the union of Noha and Hasan, and a brand built on
                  <span className="text-[#D4A373] font-semibold"> trust, elegance, and authenticity</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="grid gap-6 lg:gap-8">

            {/* Mission Statement Card */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4A373] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    At
                    <span className="uppercase text-[#D4A373] font-semibold bg-amber-50 px-2 py-1 rounded-md">
                      {companyName}
                    </span>
                    , we are passionate about the art of fragrance. Our mission is to bring
                    you <span className="font-semibold text-gray-800">100% authentic perfumes</span> sourced from globally renowned brands
                    and trusted suppliers. Each scent in our collection is carefully
                    curated to ensure quality, originality, and a lasting impression.
                  </p>
                </div>
              </div>
            </div>

            {/* Company Story Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 lg:p-8 border border-amber-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D4A373] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Story</h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    What began as a <span className="font-semibold text-[#D4A373]">shared vision between husband and wife</span> has grown
                    into a commitment to provide our customers with a premium
                    fragrance experience. We believe that a great perfume does more
                    than smell good – it speaks of <span className="italic font-medium">identity, mood, and memory</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4A373] rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-medium">
                  We invite you to <span className="text-[#D4A373] font-semibold">explore our selection</span> and find your signature
                  scent with confidence and ease.
                </p>
              </div>
            </div>
          </div>

          {/* Brand Tagline Section */}
          <div className="mt-12 pt-8 border-t-2 border-gradient-to-r from-transparent via-amber-200 to-transparent">
            <div className="text-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 shadow-xl">
              <div className="inline-block">
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  <span className="relative">
                    <span className="uppercase text-transparent bg-clip-text bg-[#D4A373] font-black tracking-wider">
                      {companyName}
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#D4A373] rounded-full"></div>
                  </span>
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-xl md:text-2xl text-[#D4A373] font-semibold tracking-wide">
                    Authentic Scents
                  </p>
                  <div className="w-16 h-0.5 bg-[#D4A373] mx-auto rounded-full"></div>
                  <p className="text-xl md:text-2xl text-[#D4A373] font-semibold tracking-wide">
                    Honest Commitment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
