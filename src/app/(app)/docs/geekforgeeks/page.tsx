"use client"
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Geekforgeeks from '@/components/docs-section/Geekforgeeks';

function page() {
    return (
        <div className="flex h-screen bg-black relative">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            <main className="flex-1 p-8 text-white flex flex-col items-center justify-center relative z-10 h-full overflow-auto">
                <div className="block lg:hidden w-full mb-4">
                    <Navbar />
                </div>
                <Geekforgeeks />
            </main>
        </div>
    );
}

export default page;