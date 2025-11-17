"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'


const signIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
        })
    }

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { data, error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password.trim(),
            rememberMe: true
        }, {
            onRequest: (ctx: any) => {
                setLoading(true)
            },
            onSuccess: (ctx: any) => {
                redirect('/dashboard')
            },
            onError: (ctx: any) => {
                setLoading(false);
                setError(true);
                setErrorMessage(ctx.error.message);
            },
        })
    }

    return (
        <div className='w-full sm:w-[50%] bg-black h-auto text-white flex justify-center flex-col items-center mb-10 relative'>
            <form onSubmit={signIn} className="w-[80%] max-w-md space-y-6 px-6 fixed">
                <h1 className="text-3xl font-bold mb-6">Log in to Signalist</h1>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleSubmit}
                        placeholder="Enter your email"
                        className="w-full p-3 border border-transparent border-zinc-700 rounded-md bg-zinc-900 hover:border hover:border-yellow-400 focus:outline-none"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleSubmit}
                        placeholder="Enter a strong password"
                        className="w-full p-2 hover:border hover:border-yellow-400 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none"
                    />
                    {error && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

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
                        {loading ? "Logging..." : "Log in"}
                    </button>

                    <p className="text-center text-gray-300">
                        Don't have an account?{" "}
                        <a onClick={() => router.push('/signup')} className="font-semibold decoration-none text-white hover:underline cursor-pointer">
                            Sign Up
                        </a>
                    </p>
                </div>

            </form>
        </div>
    )
}

export default signIn