"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { highlightCode } from "@/utils/shikiHighlighter";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

function Leetcode() {
  const [baseUrl, setBaseUrl] = useState("");
  const [Html, setHtml] = useState<string>("");

  const code = `
    data: {
      allQuestionsCount: [
        { difficulty: "All", count: 3646 },
        { difficulty: "Easy", count: 890 },
        { difficulty: "Medium", count: 1896 },
        { difficulty: "Hard", count: 860 }
      ],
      matchedUser: {
        username: "VaidikCodes",
        profile: { reputation: 0, ranking: 192341 },
        submitStats: {
          acSubmissionNum: [
            { difficulty: "All", count: 452 },
            { difficulty: "Easy", count: 136 },
            { difficulty: "Medium", count: 260 },
            { difficulty: "Hard", count: 56 }
          ]
        }
      }
    }
  `;

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  useEffect(() => {
    async function helper() {
      const html = await highlightCode(code, "ts", "nord");
      setHtml(html);
    }
    helper();
  }, []);

  const finalUrl = baseUrl + "/api/leetcode?username=<username>";

  function copyToClipBoard() {
    navigator.clipboard.writeText(finalUrl);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="min-h-screen w-full backdrop-blur-md flex flex-col items-center p-4 sm:p-8">
      <div className="bg-white/90 dark:bg-neutral-900/80 shadow-xl rounded-2xl p-4 sm:p-8 max-w-3xl w-full border border-neutral-200 dark:border-neutral-800">

        {/* Title Badge */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="relative flex items-center justify-center mb-4">
            <span className="absolute -inset-1 blur-lg opacity-70 animate-pulse bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full" />
            <span className="relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border border-amber-400 shadow-lg">
              <span className="text-xl sm:text-3xl">👑</span>
              <span className="text-amber-400">
                <svg
                  width="20"
                  height="20"
                  className="inline-block align-middle sm:w-7 sm:h-7"
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
              <span className="text-xl sm:text-3xl">✨</span>
            </span>
          </div>
          <h2 className="font-extrabold text-transparent text-2xl sm:text-3xl md:text-4xl text-center bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 drop-shadow-neon">
            LeetCode API Documentation
          </h2>
        </div>

        {/* Intro Paragraph */}
        <p className="mt-3 max-w-2xl mx-auto text-center text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Fetch and display your{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">LeetCode</span>{" "}
          profile stats with ease. Retrieve your problems solved and more. Just enter your username and copy the API link.
        </p>

        {/* API Link Input */}
        <div className="mt-8 w-full max-w-xl mx-auto flex flex-col items-center">
          <label
            htmlFor="leetcode-link"
            className="mb-2 font-medium text-sm sm:text-lg text-neutral-800 dark:text-neutral-200"
          >
            LeetCode Profile API Link
          </label>
          <div className="flex flex-col sm:flex-row w-full">
            <input
              id="leetcode-link"
              type="text"
              className="flex-1 px-3 sm:px-4 py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-neutral-800 dark:text-white text-xs sm:text-sm"
              placeholder={finalUrl}
              disabled
            />
            <button
              type="button"
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white rounded-b-md sm:rounded-r-md sm:rounded-b-none hover:from-amber-500 hover:to-yellow-500 transition font-semibold shadow text-xs sm:text-sm"
              onClick={copyToClipBoard}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 max-w-2xl mx-auto text-left text-sm sm:text-base">
          <h3 className="font-semibold mb-2 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-base sm:text-lg">
            <ArrowRightCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <li>
              Replace{" "}
              <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs sm:text-sm">
                {"<username>"}
              </span>{" "}
              with your LeetCode username.
            </li>
            <li>Send a <span className="font-semibold">GET</span> request to the generated URL.</li>
          </ul>

          {/* JSON Response */}
          <h3 className="font-semibold mt-6 mb-2 text-amber-600 dark:text-amber-400 text-base sm:text-lg">
            The JSON Response will look like this:
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700 my-4">
            <div
              className="shiki overflow-x-auto text-xs sm:text-sm leading-relaxed rounded-lg p-3 sm:p-4 bg-gray-900 border border-gray-800"
              style={{
                fontFamily:
                  "Fira Mono, Menlo, Monaco, 'Courier New', monospace",
              }}
              dangerouslySetInnerHTML={{ __html: Html }}
            />
          </div>


          {/* Image URL Input */}
          <div className="mt-6 w-full max-w-xl mx-auto flex flex-col items-center">
            <label
              htmlFor="leetcode-image-link"
              className="mb-2 font-medium text-sm sm:text-lg text-neutral-800 dark:text-neutral-200"
            >
              LeetCode Stats Image Link
            </label>
            <div className="flex flex-col sm:flex-row w-full">
              <input
                id="leetcode-image-link"
                type="text"
                className="flex-1 px-3 sm:px-4 py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-neutral-800 dark:text-white text-xs sm:text-sm"
                placeholder={`${baseUrl}/i/leetcode?username=<username>`}
                disabled
              />
              <button
                type="button"
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white rounded-b-md sm:rounded-r-md sm:rounded-b-none hover:from-amber-500 hover:to-yellow-500 transition font-semibold shadow text-xs sm:text-sm"
                onClick={() => {
                  navigator.clipboard.writeText(`${baseUrl}/api/leetcode/image?username=<username>`);
                  toast.success("Copied image link to clipboard");
                }}
              >
                Copy
              </button>
            </div>
          </div>

          <h3 className="font-semibold mb-2 mt-10 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-base sm:text-lg">
            <ArrowRightCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Usage:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <li>
              Replace{" "}
              <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-xs sm:text-sm">
                {"<username>"}
              </span>{" "}
              with your LeetCode username.
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


          <h3 className="font-semibold mt-6 mb-2 text-amber-600 dark:text-amber-400 text-base sm:text-lg">
            The Image Response will look like this:
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700 my-4">
            <Image
              width={600}
              height={340}
              src={`/leetcode.svg`}
              alt="leetcode Stats"
              className="w-full h-auto rounded-lg"
            />
          </div>



          {/* Closing Paragraph */}
          <p className="mt-6 text-center text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Use this JSON data to showcase your LeetCode stats on your personal website.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Leetcode;
