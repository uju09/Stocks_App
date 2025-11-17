import React from 'react'
import Image from "next/image";



const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-row w-screen h-auto min-h-screen overflow-x-hidden'>
            {children}
            <div className='hidden sm:hidden md:block sm:w-[40%] md:w-[50%] overflow-hidden right-0 bg-[#0E0E0E]'>
                <section className="w-full text-white py-20 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto relative">

                        {/* Text */}
                        <h1 className="text-3xl">
                            Signalist turned my watchlist into a winning list.
                            The alerts are spot-on, and I feel more confident
                            making moves in the market
                        </h1>

                        {/* Author */}
                        <div className="mt-10">
                            <p className="font-semibold text-lg">— Ethan R.</p>
                            <p className="text-gray-400 text-base">Retail Investor</p>
                        </div>


                    </div>
                    <div className='mt-20'>
                        <Image src="/assets/images/dashboard.png" loading="eager" priority alt="testimonial" className='transform translate-x-[10%] translate-y-[10%] scale-[1.2] object-cover' height={700} width={1200} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default layout
