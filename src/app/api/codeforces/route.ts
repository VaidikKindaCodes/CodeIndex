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
  try {
    const { data } = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    if (data.status !== "OK" || !data.result?.length) {
      return Response.json(
        {
          success: false,
          message: "user not found"
        },
        {
          status: 404
        }
      );
    }

    const user = data.result[0];
    const { handle, rating, maxRating, rank, maxRank } = user;
    const submissionsRes = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
    let totalSolved = 0;
    if (submissionsRes.data.status === "OK" && Array.isArray(submissionsRes.data.result)) {
      const solvedSet = new Set<string>();
      for (const sub of submissionsRes.data.result) {
        if (sub.verdict === "OK" && sub.problem) {
          const key = `${sub.problem.contestId}-${sub.problem.index}`;
          solvedSet.add(key);
        }
      }
      totalSolved = solvedSet.size;
    }

    return Response.json(
      {
        success: true,
        handle: handle,
        rating: rating,
        maxRating: maxRating,
        rank: rank,
        maxRank: maxRank,
        totalSolved: totalSolved
      },
      { status: 200 }
    );

  } catch (error) {
    const axiosError = error as AxiosError;
    return Response.json({
      message: axiosError.response?.data,
    });
  }
}
