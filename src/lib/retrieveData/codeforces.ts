
type ResponseType = {
  rating: number;
  maxRating: number;
  rank: string;
  totalSolved: number;
  maxRank: string;
}

export async function retrieveCodeforcesData(username: string): Promise<ResponseType | null> {
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
    const data = await response.json();

    if (data.status !== "OK" || !data.result?.length) {
      return null;
    }

    const user = data.result[0];
    const { rating, maxRating, rank, maxRank } = user;

    const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
    const submissionsData = await submissionsResponse.json();

    let totalSolved = 0;
    if (submissionsData.status === "OK" && Array.isArray(submissionsData.result)) {
      const solvedSet = new Set<string>();
      for (const sub of submissionsData.result) {
        if (sub.verdict === "OK" && sub.problem) {
          const key = `${sub.problem.contestId}-${sub.problem.index}`;
          solvedSet.add(key);
        }
      }
      totalSolved = solvedSet.size;
    }

    return {
      rating: rating || 0,
      maxRating: maxRating || 0,
      rank: rank || "Unrated",
      totalSolved: totalSolved,
      maxRank: maxRank || "Unrated"
    };
  } catch (error) {
    console.error("Error retrieving Codeforces data:", error);
    return null;
  }
}
