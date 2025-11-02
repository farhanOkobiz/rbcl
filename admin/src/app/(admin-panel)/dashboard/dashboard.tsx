"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import {
  Boxes,
  ClipboardCheck,
  Download,
  ScrollText,
  ShoppingBag,
  Users,
  UsersRound,
} from "lucide-react";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { makeBDPrice } from "@/utils/helpers";
import { DashboardMetrics } from "@/types/shared";

interface SalesDashboardProps {
  counts: DashboardMetrics;
}

export default function AdminDashboard({ counts }: SalesDashboardProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col   mb-4">
      <div className="p-4 flex flex-col items-center justify-between gap-5">
        
        <div className="flex items-center justify-between w-full gap-3">
        <Card className="bg-gradient-to-tr bg-primary flex  justify-between w-full h-36">
          <div className="flex items-center justify-start pl-6 ">
            <div className="bg-white rounded-sm h-8 w-8 flex justify-center items-center">
              <ScrollText size={20} />
            </div>
            <CardHeader className="">
              <CardDescription className="text-white">
                Total Sales
              </CardDescription>
              <CardTitle className="text-white">
                {makeBDPrice(counts.totalSales)}
              </CardTitle>
            </CardHeader>
          </div>
        </Card>

        <Card className="flex  justify-between w-full h-36">
          <div className="flex items-center justify-start pl-6 ">
            <div className="bg-[#DDFFE2] rounded-sm h-8 w-8 flex justify-center items-center">
              <ShoppingBag size={20} color="#29CC6A" />
            </div>
            <CardHeader className="">
              <CardDescription className="">Total Orders</CardDescription>
              <CardTitle className="">{counts.totalOrders}</CardTitle>
            </CardHeader>
          </div>
        </Card>
        </div>
        <div className="flex items-center justify-between w-full gap-3">
        <Card className="flex i justify-between w-full h-36">
          <div className="flex items-center justify-start pl-6 ">
            <div className="bg-[#FFF3DBEE] rounded-sm h-8 w-8 flex justify-center items-center">
              <ClipboardCheck size={20} color="#FFAA00" />
            </div>
            <CardHeader className="">
              <CardDescription className="">Total Stock</CardDescription>
              <CardTitle className="">{counts.totalStock}</CardTitle>
            </CardHeader>
          </div>
        </Card>

        <Card className="flex items-center justify-start pl-6 w-full h-36">
          <div className="bg-[#FFDCF7] rounded-sm h-8 w-8 flex justify-center items-center">
            <Boxes size={20} color="#FF1BCD" />
          </div>
          <CardHeader>
            <CardDescription>Stock Value</CardDescription>
            <CardTitle>{makeBDPrice(counts.totalStockValue)}</CardTitle>
          </CardHeader>
        </Card>
        </div>
        </div>
        {/* <div>
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold text-slate-900 dark:text-slate-200">
              {selectChartLabel}
            </Label>
            <div className="">
                <SelectDuration  setSelectChartFilter= {setSelectRadialsChart}  setSelectChartFilterLabel={setSelectChartLabel}/>
            </div>
           
          </div>
        
        <RadialsChart  selectChartDuration={selectRadialsChart}/>
        </div> */}
      
      </div>
    </div>
  );
}
