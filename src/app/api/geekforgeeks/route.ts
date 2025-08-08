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

    const name = $(".profile_name").first().text().trim();

    const institute = $(".profile_inst").first().text().trim();

    const problemsSolved = $("div.score_card_value").first().text().trim();

    const rank = $(".rankNum").first().text().trim();

    return Response.json({
      success: true,
      username,
      name,
      institute,
      problemsSolved,
      rank
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
