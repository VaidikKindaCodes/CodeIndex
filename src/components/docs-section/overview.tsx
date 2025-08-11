"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { highlightCode } from "@/utils/shikiHighlighter";
import {
  Code2,
  Database,
  Globe,
  ListChecks,
  ArrowRightCircle,
} from "lucide-react";

function OverView() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}`;
    setBaseUrl(url);
  }, []);

  const finalUrl = baseUrl + "/api/<website>?username=<username>";
  function copyToClipBoard() {
    navigator.clipboard.writeText(finalUrl);
    toast.success("copied to clipboard");
  }

  return (
    <div className="min-h-screen w-full  backdrop-blur-md flex flex-col items-center p-8">
      <div className="bg-white/90 dark:bg-zinc-900/80 shadow-xl rounded-2xl p-8 max-w-3xl w-full">
        <h2 className="text-4xl text-center font-extrabold text-amber-500 dark:text-amber-300 mb-4 tracking-tight drop-shadow">
          <span className="inline-block align-middle items-center mr-2 ">
            🤖
          </span>
          Welcome to Code Index
        </h2>
        <p className="mt-3 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-200">
          Your one step solution to all your problems related to data fetching
          of your accounts across various platforms
        </p>
        <div className="flex flex-col items-center mt-12 mb-8">
          <div className="relative flex items-center justify-center mb-4">
            <span className="absolute -inset-1 blur-lg opacity-70 animate-pulse bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full" />
            <span className="relative z-10 flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-amber-400 shadow-lg">
              <span className="text-3xl">🚀</span>
              <span className="text-amber-400">
                <svg
                  width="28"
                  height="28"
                  className="inline-block align-middle"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20" />
                  <path d="M5 12h14" />
                  <path d="M2 12a10 10 0 0 1 20 0 10 10 0 0 1-20 0z" />
                </svg>
              </span>
              <span className="text-3xl">✨</span>
            </span>
          </div>
          <h3 className="font-extrabold text-transparent text-3xl md:text-4xl text-center bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 drop-shadow-neon">
            How CodeIndex was born
          </h3>
        </div>

        <div className="mt-12 max-w-3xl mx-auto px-6">
          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <Code2 className="w-6 h-6 text-amber-500" />
              Why Every Developer Needs a Portfolio
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              As a developer, creating a portfolio website is one of the most
              effective ways to showcase your skills. A popular approach is to
              display your progress on various <b>Coding Platforms</b>. However,
              fetching this data can often be complicated since most leading
              platforms don’t provide official API keys.
            </p>
          </div>
          <div className="mt-8 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <Database className="w-6 h-6 text-rose-500" />
              The Problem
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Developers often rely on third-party APIs to fetch coding stats,
              but there’s no single API that consolidates all your data with
              minimal effort.
            </p>
          </div>
          <div className="mt-8 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-semibold text-xl flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Globe className="w-6 h-6" />
              Introducing Code Index
            </h3>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              CodeIndex compiles relevant data from multiple coding platforms
              into a single Web API. Under the hood, it uses HTML scraping,
              endpoint fetching, and GraphQL libraries to gather user data
              efficiently.
            </p>
          </div>
          <div className="mt-8 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <ListChecks className="w-6 h-6 text-green-500" />
              How It Works
            </h2>
            <ol className="mt-4 space-y-3 list-decimal list-inside text-neutral-600 dark:text-neutral-400">
              <li>Copy the link below:</li>
              <div className="flex">
                <code className="block bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 text-sm text-amber-600 break-all">
                  {finalUrl}
                </code>
                <button
                  onClick={copyToClipBoard}
                  className="ml-2 px-4 py-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-amber-300 min-w-[72px]"
                  title="Copy to clipboard"
                >
                  Copy
                </button>
              </div>

              <li>
                Replace <b>&lt;website&gt;</b> and <b>&lt;username&gt;</b> with
                yours.
              </li>
              <li>
                Send a GET request — a simple JSON response will be returned.
              </li>
              <li>
                Currently supports:{" "}
                <span className="font-semibold">
                  LeetCode, CodeChef, CodeForces, AtCoder, GeeksforGeeks
                </span>
                .
              </li>
            </ol>
          </div>

          {/* Usage Section */}
          <div className="mt-8 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <ArrowRightCircle className="w-6 h-6 text-blue-500" />
              Displaying Your Stats
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Use the received JSON data to display your coding stats on your
              website. For details about the response format from each platform,
              refer to their respective documentation in the sidebar/navbar.
            </p>
          </div>
        {/* GitHub Repo Section */}
        <div className="mt-8 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                <svg
                    className="w-6 h-6 text-gray-700 dark:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.421-.012 2.751 0 .267.18.578.688.48C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
                Check Out the Code
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Curious about how this website works? You can explore the complete source code and contribute on GitHub:
            </p>
            <a
                href="https://github.com/VaidikKindaCodes/CodeIndex"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-5 py-2 rounded-md bg-gray-900 text-white dark:bg-gray-800 dark:text-amber-300 font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-150 shadow"
            >
                View GitHub Repository
            </a>
        </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;
