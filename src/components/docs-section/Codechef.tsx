"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { highlightCode } from "@/utils/shikiHighlighter";

function CodeChef() {
  const [baseUrl, setBaseUrl] = useState("");
  const [Html, setHtml] = useState<string>("");

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const finalUrl = `${baseUrl}/api/codechef?username=<username>`;

  function copyToClipBoard() {
    navigator.clipboard.writeText(finalUrl);
    toast.success("Copied to clipboard!");
  }

  const code = `data: {
  "success": true,
  "username": "vaidik_codes",
  "rating": "1629",
  "stars": "★★★",
  "totalSolved": 77
}`;

  useEffect(() => {
    (async () => {
      const html = await highlightCode(code, "ts", "nord");
      setHtml(html);
    })();
  }, []);

  return (
    <div className="min-h-screen w-full backdrop-blur-md flex flex-col items-center px-4 sm:px-6 py-6">
      <div className="bg-white/90 dark:bg-zinc-900/80 shadow-2xl rounded-2xl p-6 sm:p-8 max-w-full sm:max-w-3xl w-full border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center justify-center mb-4">
            <span className="absolute -inset-1 blur-lg opacity-60 animate-pulse bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 rounded-full" />
            <span className="relative z-10 flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-green-400 shadow-lg">
              <span className="text-3xl">📊</span>
            </span>
          </div>
          <h2 className="font-extrabold text-transparent text-3xl sm:text-4xl md:text-5xl text-center bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 drop-shadow">
            CodeChef API Documentation
          </h2>
        </div>

        <p className="mt-3 text-center text-base sm:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed">
          Effortlessly fetch and display your{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">
            CodeChef
          </span>{" "}
          profile stats with our API. Retrieve your total problems solved and
          more. Enter your CodeChef username below and copy the generated API
          link.
        </p>

        <div className="mt-8 w-full mx-auto flex flex-col items-center">
          <label
            htmlFor="leetcode-link"
            className="mb-2 font-medium text-base sm:text-lg text-zinc-800 dark:text-zinc-100 text-center"
          >
            CodeChef Profile API Link
          </label>
          <div className="flex flex-col sm:flex-row w-full gap-2">
            <input
              id="leetcode-link"
              type="text"
              className="flex-1 px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-zinc-800 dark:text-white"
              placeholder={finalUrl}
              disabled
            />
            <button
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-md sm:rounded-r-md sm:rounded-l-none hover:from-green-500 hover:to-emerald-500 transition font-semibold shadow"
              onClick={copyToClipBoard}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-10 text-left text-sm sm:text-base">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400 text-base sm:text-lg">
            📌 Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-200 leading-relaxed">
            <li>
              Replace{" "}
              <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                {"<username>"}
              </span>{" "}
              with your CodeChef username.
            </li>
            <li>
              Send a <span className="font-semibold">GET</span> request to the
              generated URL.
            </li>
          </ul>

          <h3 className="font-semibold mt-6 mb-2 flex items-center gap-2 text-green-600 dark:text-green-400 text-base sm:text-lg">
            📦 The JSON Response will look as follows:
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 my-4">
            <div
              className="shiki overflow-x-auto text-sm sm:text-base leading-relaxed rounded-lg p-4 bg-gray-900 border border-gray-800"
              style={{
                fontFamily:
                  "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
              }}
              dangerouslySetInnerHTML={{ __html: Html }}
            />
          </div>

          <p className="mt-8 text-center text-base sm:text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed">
            Use this data to beautifully showcase your CodeChef coding stats on
            your website!
          </p>
        </div>
      </div>
    </div>
  );
}

export default CodeChef;
