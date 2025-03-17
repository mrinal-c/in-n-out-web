import axios from "axios";

export async function parseTransactionAPI(query) {
  try {
    const response = await axios.post("/api/agent/parse", { message: query });
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}
