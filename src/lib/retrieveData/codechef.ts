import axios from "axios";
import * as cheerio from "cheerio"


type ResponseType = {
  rating: number;
  stars: string;
  totalSolved: number;
}




export async function retrieveCodechefData(username: string): Promise<ResponseType | null> {
  try {
    const { data } = await axios.get(
      `https://www.codechef.com/users/${username}`
    );
    const $ = cheerio.load(data);
    const rating = $(".rating-number").first().text().trim();
    const stars = $(".rating-star").first().text().trim();
    // const solvedStrongTags = $(".rating-data-section.problems-solved strong")
    //   .map((_, el) => parseInt($(el).text().trim()) || 0)
    //   .get();

    const totalSolvedText = $("h3:contains('Total Problems Solved')").first().text();
    const totalSolvedMatch = totalSolvedText.match(/Total Problems Solved:\s*(\d+)/i);
    const totalSolved = totalSolvedMatch ? parseInt(totalSolvedMatch[1], 10) : 0;

    return {
      rating: parseInt(rating, 10) || 0,
      stars: stars,
      totalSolved: totalSolved || 0,
    };
  } catch (error) {
    console.error("Error retrieving CodeChef data:", error);
    return null;
  }
}
