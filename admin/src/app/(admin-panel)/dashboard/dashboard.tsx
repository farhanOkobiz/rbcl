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

interface SalesDashboardProps {
  counts: DashboardMetrics;
}

export default function AdminDashboard({ counts }: SalesDashboardProps) {
  const router = useRouter();

  return (
    <div className="p-6">
      <Card className="bg-teal-50 text-teal-900 shadow-md rounded-xl border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">
            Welcome to Royel Business Company Limited 🌍
          </CardTitle>
          <CardDescription className="text-teal-700/80">
            International Blog & E-Commerce Platform
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 leading-relaxed">
          <p>
            Royel Business Company Limited is a global platform combining modern e-commerce
            and blogging under one intelligent system. Manage your products, blogs,
            and users seamlessly from this dashboard.
          </p>

          <ul className="list-disc list-inside space-y-1 text-teal-800">
            <li>🛒 Manage your products and inventory efficiently</li>
            <li>✍️ Publish blogs and news updates</li>
            <li>👥 Manage users and roles with ease</li>
            <li>📈 Track sales and performance metrics</li>
            <li>🌐 Connect globally with our integrated platform</li>
          </ul>

          <p className="italic text-teal-600/70 mt-2">
            “Empowering innovation, connecting the world.”
          </p>
        </CardContent>
      </Card>
    </div>


  );
}
