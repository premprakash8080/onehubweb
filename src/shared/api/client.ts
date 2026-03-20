import { getApiBaseUrl } from '@/shared/config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type ApiRequestOptions = Omit<RequestInit, 'method' | 'body'> & {
  body?: unknown;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_BASE_URL = getApiBaseUrl();

function buildUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

async function parseResponseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

async function request<T>(
  method: HttpMethod,
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  let body = options.body as BodyInit | undefined;

  if (body !== undefined && typeof body === 'object' && !(body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    body = JSON.stringify(body);
  }

  const url = buildUrl(path);
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      method,
      headers,
      body,
    });
  } catch (error) {
    throw new ApiError('Network error or request blocked by browser/policy', 0, error);
  }

  const data = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(response.statusText || 'Request failed', response.status, data);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<ApiRequestOptions, 'body'>) =>
    request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>('PUT', path, { ...options, body }),
  delete: <T>(path: string, options?: Omit<ApiRequestOptions, 'body'>) =>
    request<T>('DELETE', path, options),
};
