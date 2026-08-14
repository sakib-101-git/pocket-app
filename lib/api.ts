import { getToken } from "./storage";
import { API_BASE_URL } from "../config/api";

export async function authenticatedFetch(path: string) {
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}