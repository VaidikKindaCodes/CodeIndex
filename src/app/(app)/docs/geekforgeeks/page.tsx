import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import GeekForGeeks from '@/components/docs-section/Geekforgeeks';

export const metadata = {
    title: "GeekForGeeks API Documentation",
    description: "Fetch your GeekForGeeks profile stats effortlessly with our API. Enter your username and copy the generated API link.",
};


function page() {
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-black relative">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="w-full lg:w-auto hidden lg:block">
                <Sidebar />
            </div>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 text-white flex flex-col items-center justify-start relative z-10 h-full overflow-auto">
                <div className="block lg:hidden w-full mb-4">
                    <Navbar />
                </div>
                <GeekForGeeks />
            </main>
        </div>
    );
}

export default page;
