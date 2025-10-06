// src/api/fatsecretClient.ts
import axios from "axios";

class FatSecretClient {
  private baseUrl = "https://platform.fatsecret.com/rest/server.api";

  async searchFoods(query: string) {
    const res = await axios.get(this.baseUrl, {
      params: {
        method: "foods.search",
        search_expression: query,
        format: "json",
      },
      headers: {
        Authorization: `Bearer ${process.env.FATSECRET_TOKEN}`,
      },
    });

    return res.data;
  }
}

export const fatsecretClient = new FatSecretClient();
