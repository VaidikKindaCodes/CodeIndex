import { retrieveAtcoderData } from "@/lib/retrieveData/atcoder";
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
  const data = await retrieveAtcoderData(username);
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
  const rank = data.rank
  const rounds = data.rounds;

  return Response.json(
    {
      success: true,
      username: username,
      rating: rating,
      rank: rank,
      rounds: rounds
    },
    { status: 200 }
  );
}
