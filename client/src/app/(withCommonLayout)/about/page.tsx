"use server";
import React from "react";
import aboutImage from "@/assets/logo/rbcl.jpg";
import Image from "next/image";
import NavBar from "@/components/pages/header/NavBar/NavBar";
import { getCartProducts } from "@/services/cart";
import { getUser } from "@/services/auth";
import T2 from "../../../assets/texture/t8.jpg";

const page = async () => {
  const user = await getUser();
  const userRef = user?.id;
  const coupon = "";
  const userCartProducts = await getCartProducts(userRef, coupon);
  const companyName = "Royel Business Company Limited";

  return (
    <div
      style={{
        backgroundImage: `url(${T2.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavBar userCartProducts={userCartProducts?.data} />
      <div className="Container mt-28 lg:mt-0">
        <div className="max-w-[1280px] mx-auto py-10 md:py-16 px-4">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 mb-12">
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#008080] to-amber-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative border-2 border-[#008080]/30 rounded-xl p-3 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src={aboutImage}
                    alt={companyName}
                    width={140}
                    height={140}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-gradient-to-br from-white/90 to-gray-50 p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-relaxed">
                  About{" "}
                  <span className="text-[#008080] font-extrabold uppercase">
                    {companyName}
                  </span>
                </h1>
                <p className="text-gray-600 mt-4 text-lg font-medium">
                  {companyName} is a dynamic platform that combines{" "}
                  <span className="text-[#008080] font-semibold">
                    blogging and e-commerce
                  </span>{" "}
                  under one digital space. We empower creativity and commerce by
                  connecting readers, writers, and shoppers through authentic
                  content and quality products.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to create a trusted online space where{" "}
              <span className="font-semibold text-[#008080]">
                knowledge meets business
              </span>
              . Through our blog, we share insightful stories, reviews, and
              guides; while our e-commerce platform brings{" "}
              <span className="font-semibold">authentic, affordable</span> and{" "}
              <span className="font-semibold">high-quality</span> products to
              your doorstep.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 lg:p-10 border border-amber-100 hover:shadow-md transition-all duration-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We envision {companyName} as{" "}
              <span className="text-[#008080] font-semibold">
                Bangladesh’s leading digital hub
              </span>{" "}
              for lifestyle, learning, and shopping. Our goal is to inspire and
              empower people through meaningful content and a seamless shopping
              experience that reflects{" "}
              <span className="italic font-medium">
                trust, creativity, and convenience
              </span>
              .
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Our Core Values
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
              <li>
                <span className="text-[#008080] font-semibold">
                  Innovation:
                </span>{" "}
                We continuously evolve to bring fresh ideas and better solutions
                for our users and customers.
              </li>
              <li>
                <span className="text-[#008080] font-semibold">Integrity:</span>{" "}
                We value honesty, authenticity, and transparency in every
                interaction.
              </li>
              <li>
                <span className="text-[#008080] font-semibold">Quality:</span>{" "}
                We ensure every product and piece of content meets our high
                standards of excellence.
              </li>
              <li>
                <span className="text-[#008080] font-semibold">Community:</span>{" "}
                We believe in building a connected and informed community that
                grows together.
              </li>
            </ul>
          </div>

          {/* Closing Section */}
          <div className="text-center bg-white rounded-2xl p-10 lg:p-14 shadow-inner">
            <p className="text-2xl md:text-3xl font-bold text-[#008080] mb-4">
              {companyName}
            </p>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              At {companyName}, we blend{" "}
              <span className="text-[#008080] font-semibold">
                creativity, commerce, and community
              </span>{" "}
              to make digital life more inspiring and rewarding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
