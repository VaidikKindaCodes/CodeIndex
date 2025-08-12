import axios from "axios";
import * as cheerio from "cheerio";

type ResponseType = {
  rating: number;
  rank: string;
  rounds: number;
}

export async function retrieveAtcoderData(username: string): Promise<ResponseType | null> {

  try {
    const { data } = await axios.get(`http://atcoder.jp/users/${username}`);
    const $ = cheerio.load(data);
    const dlTable = $(".dl-table");
    const ratingCell = dlTable.find("th:contains('Rating')").next("td").text();
    const ratingMatch = ratingCell.match(/[\n\r]\s*(\d+)/);
    const rating = ratingMatch ? ratingMatch[1] : "";
    const rounds = dlTable.find("th:contains('Rated Matches')").next("td").text().trim();
    const rank = dlTable.find("th:contains('Rank')").next("td").text().trim();
    return (
      {
        rating: parseInt(rating, 10) || 0,
        rank: rank || "Unrated",
        rounds: parseInt(rounds, 10) || 0
      } as ResponseType
    )

  } catch (error) {
    console.error("Error retrieving AtCoder data:", error);
    return null;
  }
}
