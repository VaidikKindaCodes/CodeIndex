import { retrieveCodeforcesData } from "@/lib/retrieveData/codeforces";
import axios, { AxiosError } from "axios";

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
  const data = await retrieveCodeforcesData(username)
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
  const maxRating = data.maxRating;
  const rank = data.rank;
  const totalSolved = data.totalSolved;
  const maxRank = data.maxRank;
  return Response.json(
    {
      success: true,
      username: username,
      rating: rating,
      maxRating: maxRating,
      rank: rank,
      totalSolved: totalSolved,
      maxRank: maxRank
    },
    { status: 200 }
  );

}
