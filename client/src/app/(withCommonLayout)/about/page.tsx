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
  const companyName = "Royal Business Company Limited";

  return (
    <div
      style={{
        backgroundImage: `url(${T2.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavBar userCartProducts={userCartProducts?.data} />
      <div className="Container mt-24 lg:mt-0 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1270px] mx-auto py-16 space-y-12">
          {/* About Section */}
          <div className="relative bg-white rounded p-10 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#008080] rounded-l-3xl"></div>
            <h1 className="text-4xl font-extrabold text-[#008080] mb-5">
              About <span className="text-[#008080] uppercase">Royal Business Company Ltd.</span>
            </h1>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                ROYAL BUSINESS COMPANY LTD. serves as a comprehensive online resource, dedicated
                to helping users discover and comprehend our world from multiple angles. We bridge
                the gap between curiosity and knowledge, covering a broad spectrum of topics—from
                international business trends and cultural phenomena to global travel and cuisine.
                Our platform is a one-stop destination for insights into our interconnected world.
              </p>
              <p>
                We curate narratives, data, and facts from trusted channels, allowing our audience
                to easily appreciate the planet's rich complexity. This platform is built for everyone:
                professionals, tourists, academics, or anyone with a passion for global knowledge.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-[#f9fdfd] rounded p-10 border border-[#d4f1f1] hover:shadow-md transition duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to capture the essence of our global tapestry by collecting and
              distributing knowledge from every facet of life, including business, travel, culture,
              and lifestyle. We are committed to making reliable, well-structured, and practical content
              universally accessible, building a platform that truly amplifies the perspectives of the worldwide community.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-white rounded p-10 shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We envision becoming the world's premier and most dependable online knowledge portal.
              We strive to create a space where a diverse, global audience can explore, share,
              and honor the experiences that make our world unique. Our goal is to spark exploration,
              foster cross-cultural appreciation, and connect people by facilitating the free exchange of information.
            </p>
          </div>

          {/* Operation Section */}
          <div className="bg-[#fefefe] rounded p-10 border border-gray-200 hover:border-[#008080]/30 hover:shadow-md transition duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">How Our Platform Operates</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              ROYAL BUSINESS COMPANY LTD. operates as a dynamic information ecosystem. Our in-house staff,
              alongside a global network of contributors, source and fact-check data, narratives, and media
              from all corners of the planet. Content is organized into key categories—such as business,
              travel, culture, and lifestyle—for intuitive navigation. Every piece of content is reviewed
              and kept current to maintain its integrity, and users are encouraged to contribute their insights,
              making this a truly collaborative resource.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default page;
