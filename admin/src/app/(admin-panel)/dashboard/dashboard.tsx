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
      <Card className="bg-[#008080] text-white shadow-lg border-none rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome to Royel Business Company Limited 🌍
          </CardTitle>
          <CardDescription className="text-white/90">
            International Blog & E-Commerce Platform
          </CardDescription>
        </CardHeader>

        <CardContent className="text-white/95 leading-relaxed">
          <p>
            Royel Business Company Limited is a global platform that blends
            modern e-commerce and blogging under one intelligent system. Manage
            your products, blogs, and users seamlessly from this dashboard.
          </p>
          <p className="mt-3 italic text-white/80">
            “Empowering innovation, connecting the world.”
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
