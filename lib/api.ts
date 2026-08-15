import { getToken } from "./storage";
import { API_BASE_URL } from "../config/api";

type FetchOptions = {
  method?: string;
  body?: unknown;
};

export async function authenticatedFetch(path: string, options: FetchOptions = {}) {
  const token = await getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}