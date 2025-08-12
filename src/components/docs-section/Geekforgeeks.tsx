"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { highlightCode } from "@/utils/shikiHighlighter";
import Image from "next/image";

export default function GeekForGeeks() {
  const [baseUrl, setBaseUrl] = useState("");
  const [html, setHtml] = useState<string>("");

  const code = `data: {
  "success": true,
  "username": "manuva05nv",
  "institute": "Indian Institute of Information Technology Allahabad",
  "codingScore": "119",
  "problemsSolved": "35",
  "contestRating": "__",
  "instituterank": "2364"
}`;

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  useEffect(() => {
    (async () => {
      const highlighted = await highlightCode(code, "ts", "nord");
      setHtml(highlighted);
    })();
  }, []);

  const finalUrl = `${baseUrl}/api/geekforgeeks?username=<username>`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(finalUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen w-full backdrop-blur-md flex flex-col items-center px-4 sm:px-6 py-6">
      <div className="bg-white/90 dark:bg-zinc-900/80 shadow-xl rounded-2xl p-6 sm:p-8 max-w-full sm:max-w-3xl w-full">
        <h2 className="text-2xl sm:text-4xl text-center font-extrabold text-cyan-500 dark:text-cyan-300 mb-4 tracking-tight drop-shadow">
          <span className="inline-block align-middle mr-2">🏅</span>
          GeekForGeeks API Documentation
        </h2>

        <p className="mt-3 text-center text-base sm:text-lg text-zinc-700 dark:text-zinc-200">
          Effortlessly fetch and display your{" "}
          <span className="font-semibold text-cyan-600 dark:text-cyan-400">
            GeekForGeeks
          </span>{" "}
          profile stats with our API. Retrieve your total problems solved and more.
          Enter your GeekForGeeks username below and copy the generated API link.
        </p>

        <div className="mt-8 w-full mx-auto flex flex-col items-center">
          <label
            htmlFor="gfg-link"
            className="mb-2 font-medium text-base sm:text-lg text-zinc-800 dark:text-zinc-100 text-center"
          >
            GeekForGeeks Profile API Link
          </label>
          <div className="flex flex-col sm:flex-row w-full ">
            <input
              id="gfg-link"
              type="text"
              value={finalUrl}
              readOnly
              className="flex-1 px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:bg-zinc-800 dark:text-white"
            />
            <button
              type="button"
              onClick={copyToClipBoard}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-300 text-white rounded-md sm:rounded-r-md sm:rounded-l-none hover:from-cyan-500 hover:to-blue-200 transition font-semibold shadow"
            >
              Copy
            </button>
          </div>
        </div>

        <div className="mt-10 text-left text-sm sm:text-base">
          <h3 className="font-semibold mb-2 text-blue-600 dark:text-cyan-400 text-base sm:text-lg">
            Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-200">
            <li>
              Replace{" "}
              <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                {"<username>"}
              </span>{" "}
              with your GeekForGeeks username.
            </li>
            <li>
              Send a <span className="font-semibold">GET</span> request to the generated URL.
            </li>
          </ul>

          <h3 className="font-semibold mt-6 mb-2 text-blue-600 dark:text-blue-400 text-base sm:text-lg">
            The JSON Response will look as follows:
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 my-4">
            <div
              className="shiki overflow-x-auto text-sm sm:text-base leading-relaxed rounded-lg p-4 bg-gray-900 border border-gray-800"
              style={{
                fontFamily: "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          {/* Image URL Input */}
          <div className="mt-6 w-full mx-auto flex flex-col items-center">
            <label
              htmlFor="gfg-image-link"
              className="mb-2 font-medium text-sm sm:text-lg text-neutral-800 dark:text-neutral-200"
            >
              GeekForGeeks Stats Image Link
            </label>
            <div className="flex flex-col sm:flex-row w-full">
              <input
                id="leetcode-image-link"
                type="text"
                className="flex-1 px-3 sm:px-4 py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-neutral-800 dark:text-white text-xs sm:text-sm"
                placeholder={`${baseUrl}/i/geekforgeeks?username=<username>`}
                disabled
              />
              <button
                type="button"
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-300 text-white rounded-md sm:rounded-r-md sm:rounded-l-none hover:from-cyan-500 hover:to-blue-200 transition font-semibold shadow"
                onClick={() => {
                  navigator.clipboard.writeText(`${baseUrl}/api/leetcode/image?username=<username>`);
                  toast.success("Copied image link to clipboard");
                }}
              >
                Copy
              </button>
            </div>
          </div>

          <h3 className="font-semibold mb-2 mt-6 text-blue-600 dark:text-cyan-400 text-base sm:text-lg">
            Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <li>
              Replace{" "}
              <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs sm:text-sm">
                {"<username>"}
              </span>{" "}
              with your GeekForGeeks username.
            </li>
            <li>
              Optionally, you can add a background color by appending{" "}
              <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs sm:text-sm">
                {"&bg=<color>"}
              </span>{" "}
              to the URL, where <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs sm:text-sm">color</span> is a valid CSS color (e.g., <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs sm:text-sm">%231e1e1e</span>  (%23 is basically #)).
            </li>
            <li>Send a <span className="font-semibold">GET</span> request to the generated URL.</li>
          </ul>


          <h3 className="font-semibold mt-6 mb-2 text-blue-600 dark:text-blue-400 text-base sm:text-lg">
            The Image Response will look as follows:
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 my-4">
            <Image
              width={600}
              height={340}
              src={`/gfg.svg`}
              alt="gfg Stats"
              className="w-full h-auto rounded-lg"
            />

          </div>


          <p className="mt-8 text-center text-base sm:text-lg text-zinc-700 dark:text-zinc-200">
            Use this data to beautifully showcase your GeekForGeeks coding stats on your website!
          </p>
        </div>
      </div>
    </div>
  );
}
