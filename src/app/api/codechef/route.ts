import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();

  if (!username) {
    return Response.json(
      {
        success: false,
        message: "Enter a username",
      },
      { status: 404 }
    );
  }
  try {
    const { data } = await axios.get(
      `https://www.codechef.com/users/${username}`
    );
    const $ = cheerio.load(data);
    const rating = $(".rating-number").first().text().trim();
    const stars = $(".rating-star").first().text().trim();
    const solvedStrongTags = $(".rating-data-section.problems-solved strong")
      .map((_, el) => parseInt($(el).text().trim()) || 0)
      .get();

    const totalSolvedText = $("h3:contains('Total Problems Solved')").first().text();
    const totalSolvedMatch = totalSolvedText.match(/Total Problems Solved:\s*(\d+)/i);
    const totalSolved = totalSolvedMatch ? parseInt(totalSolvedMatch[1], 10) : 0;

    return Response.json({
      success: true,
      username: username,
      rating: rating,
      stars: stars,
      totalSolved: totalSolved,
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    return Response.json({
      message: axiosError.response?.data,
    });
  }
}
