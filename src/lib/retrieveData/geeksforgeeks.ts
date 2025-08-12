import axios from "axios";
import * as cheerio from "cheerio";


type ResponseType = {
  institute: string;
  codingScore: string;
  problemsSolved: string;
  contestRating: string;
  instituterank: string;
}

export async function retrieveGeeksForGeeksData(username: string): Promise<ResponseType | null> {
  try {
    const { data } = await axios.get(`https://auth.geeksforgeeks.org/user/${username}/`);

    const $ = cheerio.load(data);

    const institute = $("div.educationDetails_head_left--text__tgi9I").first().text().trim();
    const codingScore = $("div.scoreCard_head_left--score__oSi_x").eq(0).first().text().trim();
    const problemsSolved = $("div.scoreCard_head_left--score__oSi_x").eq(1).first().text().trim();
    const contestRating = $("div.scoreCard_head_left--score__oSi_x").eq(2).first().text().trim();
    const rankText = $("span.educationDetails_head_left_userRankContainer--text__wt81s").first().text().trim();
    const instituterank = rankText.replace(/\D/g, "");

    return {
      institute: institute || "Not Available",
      codingScore: codingScore || "0",
      problemsSolved: problemsSolved || "0",
      contestRating: contestRating || "0",
      instituterank: instituterank || "0"
    } as ResponseType;
  } catch (error) {
    return null
  }
}
