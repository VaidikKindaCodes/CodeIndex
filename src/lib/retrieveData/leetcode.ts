import axios from "axios";


type ResponseType = {
  allQuestionsCount: DifficultyCount[];
  matchedUser: {
    username: string;
    profile: {
      reputation: number;
      ranking: number;
    };
    submitStats: {
      acSubmissionNum: DifficultyCount[];
    };
  };
}

type DifficultyCount = {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
}

export async function retrieveLeetcodeData(username: string): Promise<ResponseType | null> {
  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        username
        profile {
          reputation
          ranking
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables: { username } },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data.data;
    if (!data || !data.matchedUser) {
      return null
    }
    return data

  } catch (err) {
    return null
  }

}
