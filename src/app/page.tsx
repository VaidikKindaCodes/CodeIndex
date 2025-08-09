"use client"
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}`;
    setBaseUrl(url);
  }, []);

  const finalUrl = baseUrl + "/<website>?username=<username>";

  function copyToclipboard (){
    navigator.clipboard.writeText(finalUrl);
    toast.success("Copied to clip board")
  }


  return (
    <div className="min-h-screen flex-col">
      <AuroraBackground>
      <div className="mx-auto max-w-2xl bg-white/60 backdrop-blur-xl rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl flex flex-col items-center border border-white/30 ring-2 ring-blue-200/40 transition-all duration-300 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mt-2 text-gray-900 drop-shadow-lg tracking-tight">
        Welcome to <span className="text-blue-600">CodeIndex</span>
        </h1>
        <p className="text-center mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-700/80 font-medium">
        Your one click solution to get your data
        </p>
        <div className="flex flex-col items-center mt-6 sm:mt-8">
        <div className="flex items-center gap-2">
          <span className="text-pink-500 text-xl sm:text-2xl animate-pulse">♥</span>
          <span className="text-center text-base sm:text-lg text-gray-700/80 font-medium">
          Made with <span className="text-pink-500 font-bold">love</span> by{" "}
          <span className="text-blue-600 font-semibold">Vaidik</span>
          </span>
        </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-8 sm:mt-10 w-full bg-white/70 backdrop-blur-lg rounded-xl shadow-lg border border-blue-200/40 ring-1 ring-blue-100/30">
        <input
          type="text"
          disabled
          value={finalUrl}
          readOnly
          className="flex-1 px-3 py-3 sm:px-5 sm:py-4 rounded-t-xl sm:rounded-t-none sm:rounded-l-xl bg-transparent text-gray-800 font-mono text-xs sm:text-base focus:outline-none placeholder:text-gray-500/80"
          style={{
          overflowX: "auto",
          textOverflow: "unset",
          whiteSpace: "nowrap",
          fontSize: "min(0.85rem, calc(100vw / " + finalUrl.length + "))",
          }}
        />
        <button
          className="px-5 py-3 sm:px-7 sm:py-4 bg-blue-600/90 text-white rounded-b-xl sm:rounded-b-none sm:rounded-r-xl hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md backdrop-blur-lg w-full sm:w-auto"
          onClick={copyToclipboard}
        >
          Copy
        </button>
        </div>
        <Link href="/docs/overview" passHref >
        <button
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0H3m9 0a9 9 0 110-18 9 9 0 010 18z" />
          </svg>
          Read Docs
        </button>
        </Link>
      </div>
      </AuroraBackground>
    </div>
  );
}
