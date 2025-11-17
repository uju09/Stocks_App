"use client"
import React, { useEffect, useState } from 'react'
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import MarketOverview from "@/components/TradingView/MarketOverview";
import HeatMap from "@/components/TradingView/HeatMap";
import TopStories from "@/components/TradingView/TopStories";
import MarketData from "@/components/TradingView/MarketData";



const page = () => {
    const router = useRouter();
    useEffect(() => {
        async function fetchUser() {
            const { data } = await authClient.getSession();
            console.log(data);
            if (!data) {
                router.push("/signup");
                return;
            }
        }
        fetchUser();
    }, []);
    return (
        <div className="flex flex-col sm:grid sm:grid-cols-7 w-screen h-auto p-5 sm:p-0 sm:pt-10 bg-black text-white">
            <div className='col-span-2 w-[100vw] sm:w-full h-[100%] pl-5'>
                <MarketOverview />
            </div>
            <div className='col-span-5 w-full h-[550px] flex justify-center items-center px-5'>
                <HeatMap />
            </div>
            <div className='col-span-2 w-full h-[100%] pl-5 mt-5'>
                <TopStories />
            </div>
            <div className='col-span-5 w-full h-[550px] flex justify-center items-center py-2 mt-5'>
                <MarketData />
            </div>

        </div>
    )
}

export default page