import { retrieveLeetcodeData } from "@/lib/retrieveData/leetcode";
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
  const data = await retrieveLeetcodeData(username)
  if (data == null) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }
  return Response.json(
    {
      success: true,
      data
    }
  )

}
