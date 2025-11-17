"use client"
import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { authClient } from "@/lib/auth-client";

export default function signUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        country: "",
        riskTolerance: "",
        preferredIndustry: "",
        investmentGoals: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.fullName,
        }, {
            onRequest: (ctx) => {
                setLoading(true);
            },
            onSuccess: (ctx) => {
                redirect("/dashboard");
            },
            onError: (ctx) => {
                setLoading(false);
                alert(ctx.error.message);
            },
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const router = useRouter();
    return (
        <div className="w-full sm:w-[50%] bg-black h-auto text-white flex justify-center flex-col items-center mb-10">
            <form className="w-[80%] max-w-md space-y-6 px-6 mt-20" onSubmit={signUp}>
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">Sign Up & Personalize</h1>

                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-transparent border-zinc-700 rounded-md bg-zinc-900 hover:border hover:border-yellow-400 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 border border-transparent border-zinc-700 rounded-md bg-zinc-900 hover:border hover:border-yellow-400 focus:outline-none"
                    />
                </div>

                {/* Country */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Country</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-3 border border-transparent border-zinc-700 rounded-md bg-zinc-900 hover:border hover:border-yellow-400 focus:outline-none"
                    >
                        <option>Australia</option>
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                    </select>
                    <p className="text-xs text-zinc-400">Helps us show market data and news relevant to you.</p>
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter a strong password"
                        className="w-full p-3 hover:border hover:border-yellow-400 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none"
                    />
                </div>

                {/* Investment Goals */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Investment Goals</label>
                    <select
                        name="investmentGoals"
                        value={formData.investmentGoals}
                        onChange={handleChange}
                        className="w-full p-3 border border-transparent border-zinc-700 rounded-md bg-zinc-900 hover:border hover:border-yellow-400 focus:outline-none"
                    >
                        <option>Growth</option>
                        <option>Income</option>
                        <option>Value</option>
                    </select>
                </div>

                {/* Risk Tolerance */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Risk Tolerance</label>
                    <select
                        name="riskTolerance"
                        value={formData.riskTolerance}
                        onChange={handleChange}
                        className="w-full p-3 border border-transparent border-zinc-700 rounded-md bg-zinc-900 hover:border hover:border-yellow-400 focus:outline-none"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                {/* Preferred Industry */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Preferred Industry</label>
                    <select
                        name="preferredIndustry"
                        value={formData.preferredIndustry}
                        onChange={handleChange}
                        className="w-full p-3 border border-transparent border-zinc-700 rounded-md bg-zinc-900 hover:border hover:border-yellow-400 focus:outline-none"
                    >
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Energy</option>
                    </select>
                </div>

                <div className="space-y-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-b from-[#F3C74C] to-[#947A2F] text-black font-semibold rounded-md transition-opacity ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading && (
                            <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                        )}
                        {loading ? "Processing..." : "Start Your Investing Journey"}
                    </button>

                    <p className="text-center text-gray-300">
                        Already have an account?{" "}
                        <a onClick={() => router.push('/signin')} className="font-semibold text-white hover:underline cursor-pointer">
                            Log In
                        </a>
                    </p>
                </div>

            </form>
        </div>
    );
}
