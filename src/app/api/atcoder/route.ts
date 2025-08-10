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
    const {data} = await axios.get(`http://atcoder.jp/users/${username}`);
    const $ = cheerio.load(data);
    const dlTable = $(".dl-table");
    const ratingCell = dlTable.find("th:contains('Rating')").next("td").text();
    const ratingMatch = ratingCell.match(/[\n\r]\s*(\d+)/);
    const rating = ratingMatch ? ratingMatch[1] : "";
    const rounds = dlTable.find("th:contains('Rated Matches')").next("td").text().trim();
    const rank = dlTable.find("th:contains('Rank')").next("td").text().trim();
    return Response.json(
        {
            username: username,
            rating:rating,
            rank:rank,
            rounds:rounds
        },{
            status: 200
        }
    )

  } catch(error){
    const errorAxios = error as AxiosError;
    return Response.json({
        message: errorAxios.response?.data
    })
  }
}
