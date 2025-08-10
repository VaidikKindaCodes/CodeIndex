"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { highlightCode } from "@/utils/shikiHighlighter";

function CodeChef() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}`;
    setBaseUrl(url);
  }, []);

  const finalUrl = baseUrl + "/codechef?username=<username>";
  function copyToClipBoard() {
    navigator.clipboard.writeText(finalUrl);
    toast.success("Copied to clipboard!");
  }
  const code = `
    data: {
            "success": true,
            "username": "vaidik_codes",
            "rating": "1629",
            "stars": "★★★",
            "totalSolved": 77
          }
`;
  const [Html, setHtml] = useState<string>("");
  useEffect(() => {
    async function helper() {
      const html = await highlightCode(code, "ts", "nord");
      setHtml(html);
    }
    helper();
  }, []);

  return (
    <div className="min-h-screen w-full  backdrop-blur-md flex flex-col items-center p-8">
      <div className="bg-white/90 dark:bg-zinc-900/80 shadow-xl rounded-2xl p-8 max-w-3xl w-full">
        <h2 className="text-4xl text-center font-extrabold text-green-500 dark:text-green-300 mb-4 tracking-tight drop-shadow">
          <span className="inline-block align-middle mr-2">📊</span>
          CodeChef API Documentation
        </h2>
        <p className="mt-3 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-200">
          Effortlessly fetch and display your{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">
            Codechef
          </span>{" "}
          profile stats with our API. Retrieve your total problems solved and
          more. Enter your Codechef username below and copy the generated API
          link.
        </p>
        <div className="mt-8 w-full max-w-xl mx-auto flex flex-col items-center">
          <label
            htmlFor="leetcode-link"
            className="mb-2 font-medium text-lg text-zinc-800 dark:text-zinc-100"
          >
            Codechef Profile API Link
          </label>
          <div className="flex w-full">
            <input
              id="leetcode-link"
              type="text"
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-zinc-800 dark:text-white"
              placeholder={finalUrl}
              disabled
            />
            <button
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-r-md hover:from-green-500 hover:to-emerald-500 transition font-semibold shadow"
              onClick={copyToClipBoard}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="mt-10 max-w-2xl mx-auto text-left text-base">
          <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400 text-lg">
            Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-200">
            <li>
              Replace{" "}
              <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                {"<username>"}
              </span>{" "}
              with your Codechef username.
            </li>
            <li>
              Send a <span className="font-semibold">GET</span> request to the
              generated URL.
            </li>
          </ul>
          <h3 className="font-semibold mt-6 mb-2 text-green-600 dark:text-green-400 text-lg">
            The JSON Response will look as follows:
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 my-4">
            <div
              className="shiki overflow-x-auto text-base leading-relaxed rounded-lg p-4 bg-gray-900 border border-gray-800"
              style={{
                fontFamily:
                  "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
              }}
              dangerouslySetInnerHTML={{ __html: Html }}
            />
          </div>

          <p className="mt-8 max-w-2xl text-center text-lg text-zinc-700 dark:text-zinc-200">
            Use this data to beautifully showcase your LeetCode coding stats on
            your website!
          </p>
        </div>
      </div>
    </div>
  );
}

export default CodeChef;
