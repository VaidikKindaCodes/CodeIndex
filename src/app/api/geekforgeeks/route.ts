import axios, { AxiosError } from "axios";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();

  if (!username) {
    return Response.json(
      { success: false, message: "Enter a username" },
      { status: 404 }
    );
  }

  try {
    const { data } = await axios.get(`https://auth.geeksforgeeks.org/user/${username}/`);

    const $ = cheerio.load(data);

    const institute = $("div.educationDetails_head_left--text__tgi9I").first().text().trim();
    const codingScore = $("div.scoreCard_head_left--score__oSi_x").eq(0).first().text().trim();
    const problemsSolved = $("div.scoreCard_head_left--score__oSi_x").eq(1).first().text().trim();
    const contestRating=  $("div.scoreCard_head_left--score__oSi_x").eq(2).first().text().trim();
    const rankText = $("span.educationDetails_head_left_userRankContainer--text__wt81s").first().text().trim();
    const instituterank = rankText.replace(/\D/g, "");       

    return Response.json({
      success: true,
      username,
      institute,
      codingScore,
      problemsSolved,
      contestRating,
      instituterank
    });
  } catch (error) {
    const axiosError = error as AxiosError;
    return Response.json({
      success: false,
      message: axiosError.response?.status === 404
        ? "User not found"
        : axiosError.message
    });
  }
}