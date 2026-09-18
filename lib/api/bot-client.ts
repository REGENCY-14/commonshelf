/**
 * Typed client for the CommonShelf bot backend's public API
 * (POST /api/search, GET /api/books/:id). Single source of truth for the
 * request/response shape — every page/hook that needs book data goes
 * through the functions here rather than calling `fetch` directly.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BOT_API_URL ?? "http://localhost:4000";

export interface ApiBookFormat {
  type: "epub" | "pdf" | "txt";
  url: string;
}

export interface ApiBook {
  id: string;
  title: string;
  author: string;
  year: string | null;
  language: string;
  subjects: string[];
  sourceCatalog: string;
  coverUrl: string | null;
  formats: ApiBookFormat[];
  description: string | null;
}

export interface ApiBookDetail extends ApiBook {
  relatedBooks: ApiBook[];
}

export interface ApiSearchResponse {
  query: string;
  results: ApiBook[];
}

interface ApiErrorBody {
  error: string;
  message: string;
}

export class BotApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string
  ) {
    super(message);
    this.name = "BotApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, init);
  } catch {
    throw new BotApiError("Could not reach the CommonShelf service.", 0, "network_error");
  }

  if (!response.ok) {
    let body: ApiErrorBody | null = null;
    try {
      body = (await response.json()) as ApiErrorBody;
    } catch {
      // response wasn't JSON; fall through with defaults below
    }
    throw new BotApiError(
      body?.message ?? "Something went wrong.",
      response.status,
      body?.error ?? "unknown_error"
    );
  }

  return response.json() as Promise<T>;
}

export function searchBooksRemote(query: string): Promise<ApiSearchResponse> {
  return request<ApiSearchResponse>("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, source: "web" }),
  });
}

export async function getBookByIdRemote(id: string): Promise<ApiBookDetail | null> {
  try {
    return await request<ApiBookDetail>(`/api/books/${encodeURIComponent(id)}`);
  } catch (err) {
    if (err instanceof BotApiError && err.status === 404) return null;
    throw err;
  }
}
