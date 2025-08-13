
import { retrieveGeeksForGeeksData } from "@/lib/retrieveData/geeksforgeeks";

const wrapText = (text: string, maxChars = 40): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current += " " + word;
    }
  }

  if (current) lines.push(current.trim());

  return lines;
};


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

  const data = await retrieveGeeksForGeeksData(username);
  if (!data) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const {
    institute,
    codingScore,
    contestRating,
    problemsSolved,
    instituterank
  } = data;

  const instituteLines = wrapText(institute);
  const offset = 140 + instituteLines.length * 30;

  const svg = `
    <svg width="700" height="${offset + 150}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .bg { fill: ${bg}; }
        .title { font: bold 32px sans-serif; fill: #51a2ff; }
        .label { font: 18px sans-serif; fill: #94a3b8; }
        .value { font: 22px monospace; fill: #f8fafc; }
        rect { rx: 16; ry: 16; }
        .wrap { width: 600px; }
      </style>
      <rect width="100%" height="100%" class="bg" />
      <text x="50%" y="50" text-anchor="middle" class="title">GFG Stats</text>

      <text x="40" y="100" class="label">Username:</text>
      <text x="200" y="100" class="value">${username}</text>

      <text x="40" y="140" class="label">Institute:</text>
      ${instituteLines
      .map(
        (line, index) =>
          `<text x="200" y="${140 + index * 24}" class="value">${line}</text>`
      )
      .join("\n")}
      <text x="40" y="${offset}" class="label">Coding Score:</text>
      <text x="200" y="${offset}" class="value">${codingScore}</text>

      <text x="40" y="${offset + 40}" class="label">Contest Rating:</text>
      <text x="200" y="${offset + 40}" class="value">${contestRating}</text>

      <text x="40" y="${offset + 80}" class="label">Problems Solved:</text>
      <text x="200" y="${offset + 80}" class="value">${problemsSolved}</text>

      <text x="40" y="${offset + 120}" class="label">Institute Rank:</text>
      <text x="200" y="${offset + 120}" class="value">${instituterank}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
