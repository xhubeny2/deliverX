// Not used anymore because of use Server Actions

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL!) {
    this.baseUrl = baseUrl;
  }

  async request(path: string, options: RequestInit = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`API error: ${res.status} – ${err}`);
    }

    return res.json();
  }

  // GET shortcut
  get(path: string) {
    return this.request(path, { method: 'GET' });
  }

  // POST shortcut
  post(path: string, body: any) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // PUT shortcut
  put(path: string, body: any) {
    return this.request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // DELETE shortcut
  delete(path: string) {
    return this.request(path, { method: 'DELETE' });
  }
}

// export single instance
export const api = new ApiClient();
