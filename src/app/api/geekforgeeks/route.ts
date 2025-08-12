import { retrieveGeeksForGeeksData } from "@/lib/retrieveData/geeksforgeeks";
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
  const data = await retrieveGeeksForGeeksData(username)
  if (data == null) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }
  const institute = data.institute;
  const codingScore = data.codingScore;
  const contestRating = data.contestRating
  const problemsSolved = data.problemsSolved;
  const instituteRank = data.instituterank;

  return Response.json(
    {
      success: true,
      username: username,
      institute: institute,
      codingScore: codingScore,
      contestRating: contestRating,
      problemsSolved: problemsSolved,
      instituteRank: instituteRank
    },
    { status: 200 }
  );

}
