import { retrieveCodechefData } from "@/lib/retrieveData/codechef";

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
  const data = await retrieveCodechefData(username)
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
  const stars = data.stars;
  const totalSolved = data.totalSolved;
  return Response.json(
    {
      success: true,
      username: username,
      rating: rating,
      stars: stars,
      totalSolved: totalSolved,
    },
    { status: 200 }
  );
}

