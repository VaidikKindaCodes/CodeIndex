import { retrieveCodechefData } from "@/lib/retrieveData/codechef";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();
  const bg = searchParams.get("bg")?.trim() || "#1e1e1e";

  if (!username) {
    return Response.json(
      {
        success: false,
        message: "Enter a username",
      },
      { status: 404 }
    );
  }
  const data = await retrieveCodechefData(username);
  if (data == null) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }
  const rating = data.rating;
  const stars = data.stars;
  const totalSolved = data.totalSolved;

  const svg = `
    <svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
      <style>
        .bg { fill: ${bg}; }
        .title { font: bold 32px sans-serif; fill: #05df72; }
        .label { font: 18px sans-serif; fill: #94a3b8; }
        .value { font: 24px monospace; fill: #f8fafc; }
        .stars { font: bold 26px serif; fill: #facc15; }
        rect { rx: 16; ry: 16; }
      </style>
      <rect width="100%" height="100%" class="bg" />
      <text x="50%" y="50" text-anchor="middle" class="title">CodeChef Stats</text>

      <text x="40" y="100" class="label">Username:</text>
      <text x="200" y="100" class="value">${username}</text>

      <text x="40" y="140" class="label">Rating:</text>
      <text x="200" y="140" class="value">${rating}</text>

      <text x="40" y="180" class="label">Stars:</text>
      <text x="200" y="180" class="stars">${stars}</text>

      <text x="40" y="220" class="label">Problems Solved:</text>
      <text x="200" y="220" class="value">${totalSolved}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });

}
