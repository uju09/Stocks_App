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
        <div className="flex portrait-message flex-col px-5 sm:grid sm:grid-cols-7 w-screen h-auto px-5 sm:p-0 bg-black text-white">
            <div className='col-span-2 sm:block sm:w-full h-[60vh] py-5 sm:py-0 sm:px-5 '>
                <MarketOverview />
            </div>
            <div className='col-span-5 w-full h-[60vh] flex justify-center items-center pr-0 sm:pr-5'>
                <HeatMap />
            </div>
            <div className='col-span-2 w-full h-[50vh] sm:h-screen sm:px-5 py-2 mt-5'>
                <TopStories />
            </div>
            <div className='col-span-5 w-full h-screen flex justify-center items-center py-2 mt-5 pr-0 sm:pr-5'>
                <MarketData />
            </div>
        </div>
    )
}

export default page