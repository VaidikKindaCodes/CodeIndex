


import { retrieveLeetcodeData } from "@/lib/retrieveData/leetcode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();
  const bgParam = searchParams.get("bg")?.trim();

  const bg = bgParam
    ? bgParam.startsWith("#")
      ? bgParam
      : `#${bgParam}`
    : "#1e1e1e";

  if (!username) {
    return Response.json(
      { success: false, message: "Enter a username" },
      { status: 400 }
    );
  }

  const data = await retrieveLeetcodeData(username);
  if (!data) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const { reputation, ranking } = data.matchedUser.profile
  const hardSolved = data.matchedUser.submitStats.acSubmissionNum[3].count;
  const mediumSolved = data.matchedUser.submitStats.acSubmissionNum[2].count;
  const easySolved = data.matchedUser.submitStats.acSubmissionNum[1].count;
  const totalSolved = data.matchedUser.submitStats.acSubmissionNum[0].count;


  const svg = `
    <svg width="600" height="340" xmlns="http://www.w3.org/2000/svg">
      <style>
        .bg { fill: ${bg}; }
        .title { font: bold 32px sans-serif; fill: #ffb900; }
        .label { font: 18px sans-serif; fill: #94a3b8; }
        .value { font: 24px monospace; fill: #f8fafc; }
        rect { rx: 16; ry: 16; }
      </style>
      <rect width="100%" height="100%" class="bg" />
      <text x="50%" y="50" text-anchor="middle" class="title">LeetCode Stats</text>

      <text x="40" y="100" class="label">Username:</text>
      <text x="200" y="100" class="value">${username}</text>

      <text x="40" y="140" class="label">Ranking:</text>
      <text x="200" y="140" class="value">#${ranking}</text>

      <text x="40" y="180" class="label">Reputation:</text>
      <text x="200" y="180" class="value">${reputation}</text>

      <text x="40" y="220" class="label">Total Solved:</text>
      <text x="200" y="220" class="value">${totalSolved}</text>

      <text x="40" y="260" class="label">Easy:</text>
      <text x="200" y="260" class="value">${easySolved}</text>

      <text x="40" y="300" class="label">Medium:</text>
      <text x="2000" y="300" class="value">${mediumSolved}</text>

      <text x="40" y="300" class="label">Hard:</text>
      <text x="200" y="300" class="value">${hardSolved}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

