"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";
import { DashboardMetrics } from "@/types/shared";
import { ShoppingBag, FileText, TrendingUp, Heart } from 'lucide-react';

interface SalesDashboardProps {
  counts: DashboardMetrics;
}

export default function AdminDashboard({ counts }: SalesDashboardProps) {
  const router = useRouter();

  return (
    <div className="p-6 rounded-lg">
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 p-8 rounded-lg">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-teal-800 mb-3">
              Royal Business Company Limited
            </h1>
            <p className="text-lg text-teal-700">Blog & E-commerce Platform</p>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Blog Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-teal-100">
              <div className="flex items-center mb-6">
                <div className="bg-teal-500 p-4 rounded-xl">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-teal-800 ml-4">Blog</h2>
              </div>
              <p className="text-teal-700 leading-relaxed mb-4">
                Discover insightful articles and tips about business, technology, and lifestyle on our blog. Stay informed with quality content.
              </p>
              <div className="flex items-center text-teal-600 font-semibold">
                <Heart className="w-5 h-5 mr-2" />
                <span>Reader Favorite Content</span>
              </div>
            </div>

            {/* E-commerce Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-teal-100">
              <div className="flex items-center mb-6">
                <div className="bg-cyan-500 p-4 rounded-xl">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-teal-800 ml-4">E-commerce</h2>
              </div>
              <p className="text-teal-700 leading-relaxed mb-4">
                Find a wide variety of quality products in our online shop. Easy ordering process and fast delivery service.
              </p>
              <div className="flex items-center text-cyan-600 font-semibold">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span>Business Growing</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-teal-50 leading-relaxed text-lg">
              Royal Business Company Limited is a modern digital platform where you can find
              the best quality products and knowledge-rich content. We are committed to providing
              our customers with the best service and supporting them in their business journey.
            </p>
          </div>
        </div>
      </div>
    </div>


  );
}
