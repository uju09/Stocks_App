"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

export default function Navbar() {
    const [username, setUsername] = useState(null);

    const logOut = async () => {
        await authClient.signOut();
        redirect("/signin");
    }

    useEffect(() => {
        async function fetchUser() {
            const { data } = await authClient.getSession();
            if (data?.user?.name) {
                setUsername(data.user.name);
            }
        }
        fetchUser();
    }, []);
    return (
        <nav className="hidden sm:flex w-full h-16 bg-[#0f0f0f] flex items-center px-6">
            {/* LEFT — Logo */}
            <div className="flex items-center gap-2">
                {/* <Image
                    src="/logo.png"   // change to your logo path
                    alt="Signalist Logo"
                    width={28}
                    height={28}
                /> */}
                <span className="text-white font-semibold text-lg">Signalist</span>
            </div>

            {/* CENTER — Nav Links */}
            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="text-white font-medium">
                        Dashboard
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition"
                    >
                        Search
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition"
                    >
                        Watchlist
                    </Link>
                </div>
            </div>

            {/* RIGHT — User */}
            <div className="flex items-center gap-5 cursor-pointer">
                <User className="text-white" size={22} />
                <button
                    className="gap-2 px-2 py-1 font-sans bg-gradient-to-b from-[#F3C74C] to-[#F4C94E] hover:bg-[#947A2F] cursor-pointer rounded text-black font-semibold"
                    onClick={logOut}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}