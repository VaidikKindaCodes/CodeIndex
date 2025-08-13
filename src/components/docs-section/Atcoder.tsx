"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { highlightCode } from "@/utils/shikiHighlighter";
import Image from "next/image";

export default function Atcoder() {
  const [baseUrl, setBaseUrl] = useState("");
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const finalUrl = `${baseUrl}/api/atcoder?username=<username>`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(finalUrl);
    toast.success("Copied to clipboard!");
  };

  const code = `data: {
  "username": "tourist",
  "rating": "4229",
  "rank": "1st",
  "rounds": "66"
}`;

  useEffect(() => {
    (async () => {
      const highlighted = await highlightCode(code, "ts", "nord");
      setHtml(highlighted);
    })();
  }, []);

  return (
    <div className="min-h-screen w-full backdrop-blur-md flex flex-col items-center p-4 sm:p-8">
      <div className="bg-white/90 dark:bg-zinc-900/80 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-3xl">
        <h2 className="text-2xl sm:text-4xl text-center font-extrabold text-orange-500 dark:text-orange-300 mb-4 tracking-tight drop-shadow">
          <span className="inline-block align-middle mr-2">🏆</span>
          AtCoder API Documentation
        </h2>

        <p className="mt-3 text-center text-base sm:text-lg text-zinc-700 dark:text-zinc-200">
          Effortlessly fetch and display your{" "}
          <span className="font-semibold text-orange-500 dark:text-orange-400">
            AtCoder
          </span>{" "}
          profile stats with our API. Retrieve your total problems solved and more.
          Enter your AtCoder username below and copy the generated API link.
        </p>

        {/* API Link Section */}
        <div className="mt-6 sm:mt-8 w-full flex flex-col items-center">
          <label
            htmlFor="atcoder-link"
            className="mb-2 font-medium text-base sm:text-lg text-zinc-800 dark:text-zinc-100"
          >
            AtCoder Profile API Link
          </label>
          <div className="flex flex-col sm:flex-row w-full ">
            <input
              id="atcoder-link"
              type="text"
              value={finalUrl}
              disabled
              className="flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded-t-md sm:rounded-l-md sm:rounded-tr-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-zinc-800 dark:text-white text-sm sm:text-base overflow-x-auto break-all w-full"
            />
            <button
              type="button"
              onClick={copyToClipBoard}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-b-md sm:rounded-r-md sm:rounded-bl-none hover:from-orange-500 hover:to-orange-500 transition font-semibold shadow text-sm sm:text-base w-full sm:w-auto"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Usage Section */}
        <div className="mt-8 sm:mt-10 text-left text-sm sm:text-base">
          <h3 className="font-semibold mb-2 text-orange-500 dark:text-orange-300 text-lg">
            Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-200">
            <li>
              Replace{" "}
              <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                {"<username>"}
              </span>{" "}
              with your AtCoder username.
            </li>
            <li>
              Send a <span className="font-semibold">GET</span> request to the generated URL.
            </li>
          </ul>

          <h3 className="font-semibold mt-6 mb-2 text-orange-500 dark:text-amber-400 text-lg">
            The JSON Response will look as follows:
          </h3>
          <div className="rounded-lg overflow-x-auto shadow-lg border border-zinc-200 dark:border-zinc-700 my-4">
            <div
              className="shiki text-sm sm:text-base leading-relaxed rounded-lg p-4 bg-gray-900 border border-gray-800"
              style={{
                fontFamily: "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          {/* Image URL Input */}
          <div className="mt-6 w-full mx-auto flex flex-col items-center">
            <label
              htmlFor="atcoder-image-link"
              className="mb-2 font-medium text-sm sm:text-lg text-neutral-800 dark:text-neutral-200"
            >
              AtCoder Stats Image Link
            </label>
            <div className="flex flex-col sm:flex-row w-full">
              <input
                id="atcoder-image-link"
                type="text"
                className="flex-1 px-3 sm:px-4 py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-neutral-800 dark:text-white text-xs sm:text-sm"
                placeholder={`${baseUrl}/i/atcoder?username=<username>`}
                disabled
              />
              <button
                type="button"
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-b-md sm:rounded-r-md sm:rounded-bl-none hover:from-orange-500 hover:to-orange-500 transition font-semibold shadow text-sm sm:text-base w-full sm:w-auto"
                onClick={() => {
                  navigator.clipboard.writeText(`${baseUrl}/i/atcoder?username=<username>`);
                  toast.success("Copied image link to clipboard");
                }}
              >
                Copy
              </button>
            </div>
          </div>

          <h3 className="font-semibold mt-6 mb-2 text-orange-500 dark:text-orange-300 text-lg">
            Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <li>
              Replace{" "}
              <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs sm:text-sm">
                {"<username>"}
              </span>{" "}
              with your AtCoder username.
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


          <h3 className="font-semibold mt-6 mb-2 text-orange-500 dark:text-amber-400 text-lg">
            📦 The Image Response will look like this          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 my-4">
            <Image
              width={600}
              height={340}
              src={`/atcoder.svg`}
              alt="LeetCode Stats"
              className="w-full h-auto rounded-lg"
            />

          </div>



          <p className="mt-6 sm:mt-8 text-center text-base sm:text-lg text-zinc-700 dark:text-zinc-200">
            Use this data to beautifully showcase your AtCoder coding stats on your website!
          </p>
        </div>
      </div>
    </div>
  );
}
