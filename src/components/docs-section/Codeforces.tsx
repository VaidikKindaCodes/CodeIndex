"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { highlightCode } from "@/utils/shikiHighlighter";

function Codeforces() {
  const [baseUrl, setBaseUrl] = useState("");
  const [Html, setHtml] = useState<string>("");

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}`;
    setBaseUrl(url);
  }, []);

  const finalUrl = baseUrl + "/api/codeforces?username=<username>";

  function copyToClipBoard() {
    navigator.clipboard.writeText(finalUrl);
    toast.success("Copied to clipboard");
  }

  const code = `
    data: {
      "success": true,
      "username": "tourist",
      "rating": "3850",
      "rank": "Legendary Grandmaster",
      "maxRating": "3892",
      "maxRank": "Legendary Grandmaster",
      "totalSolved": 2500
    }
  `;

  useEffect(() => {
    async function helper() {
      const html = await highlightCode(code, "ts", "nord");
      setHtml(html);
    }
    helper();
  }, []);

  return (
    <div className="min-h-screen w-full backdrop-blur-md flex flex-col items-center px-4 py-6 sm:px-6">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl p-6 sm:p-8 max-w-3xl w-full">
        
        {/* Gradient badge */}
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm font-semibold shadow">
          API Reference
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl text-center font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4 tracking-tight drop-shadow">
          <span className="inline-block align-middle mr-2">👨🏻‍💻</span>
          Codeforces API Documentation
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-2xl mx-auto text-center text-base sm:text-lg text-neutral-700 dark:text-neutral-300">
          Effortlessly fetch and display your{" "}
          <span className="font-semibold text-blue-500 dark:text-blue-400">
            Codeforces
          </span>{" "}
          profile stats with our API. Retrieve your rating, rank, problems solved, and more.
          Enter your Codeforces username below and copy the generated API link.
        </p>

        {/* Input section */}
        <div className="mt-8 w-full max-w-xl mx-auto flex flex-col items-center">
          <label
            htmlFor="codeforces-link"
            className="mb-2 font-medium text-base sm:text-lg text-neutral-800 dark:text-neutral-100"
          >
            Codeforces Profile API Link
          </label>
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
            <input
              id="codeforces-link"
              type="text"
              className="flex-1 px-4 py-2 rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:text-white text-sm sm:text-base"
              placeholder={finalUrl}
              disabled
            />
            <button
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:from-blue-500 hover:to-blue-700 transition font-semibold shadow text-sm sm:text-base"
              onClick={copyToClipBoard}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Usage section */}
        <div className="mt-10 max-w-2xl mx-auto text-left text-sm sm:text-base">
          <h3 className="font-semibold mb-2 text-blue-500 dark:text-blue-400 text-lg">
            Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
            <li>
              Replace{" "}
              <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded">
                {"<username>"}
              </span>{" "}
              with your Codeforces username.
            </li>
            <li>
              Send a <span className="font-semibold">GET</span> request to the
              generated URL.
            </li>
          </ul>

          {/* Response preview */}
          <h3 className="font-semibold mt-6 mb-2 text-blue-500 dark:text-blue-400 text-lg">
            The JSON Response will look as follows:
          </h3>
          <div className="rounded-xl overflow-x-auto shadow-lg border border-neutral-200 dark:border-neutral-800 my-4">
            <div
              className="shiki min-w-[320px] text-sm sm:text-base leading-relaxed rounded-lg p-4 bg-gray-900 border border-gray-800"
              style={{
                fontFamily:
                  "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
              }}
              dangerouslySetInnerHTML={{ __html: Html }}
            />
          </div>

          {/* Footer note */}
          <p className="mt-8 max-w-2xl text-center text-base sm:text-lg text-neutral-700 dark:text-neutral-300">
            Use this data to beautifully showcase your Codeforces coding stats on
            your website!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Codeforces;
