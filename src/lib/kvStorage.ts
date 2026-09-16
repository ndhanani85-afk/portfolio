// Cloudflare KV-based storage adapter
// Replaces fs-based stores for Cloudflare Workers deployment

interface KVNamespace {
  get(key: string, options?: { type?: "text" | "json" | "arrayBuffer" | "stream" }): Promise<any>;
  put(key: string, value: string | ArrayBuffer | ReadableStream, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
}

let kvNamespace: KVNamespace | null = null;

export function setKVNamespace(ns: KVNamespace | null) {
  kvNamespace = ns;
}

export function getKVNamespace(): KVNamespace | null {
  return kvNamespace;
}

// Check if we're running in Cloudflare Workers (KV available)
export function isCloudflareWorkers(): boolean {
  return kvNamespace !== null;
}

// KV helper functions for JSON data
export async function kvGetJson<T>(key: string, defaultValue: T): Promise<T> {
  if (!kvNamespace) return defaultValue;
  try {
    const value = await kvNamespace.get(key, { type: "json" });
    return value ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

export async function kvPutJson<T>(key: string, value: T): Promise<void> {
  if (!kvNamespace) return;
  await kvNamespace.put(key, JSON.stringify(value));
}

export async function kvGetText(key: string): Promise<string | null> {
  if (!kvNamespace) return null;
  return kvNamespace.get(key, { type: "text" });
}

export async function kvPutText(key: string, value: string, ttl?: number): Promise<void> {
  if (!kvNamespace) return;
  await kvNamespace.put(key, value, ttl ? { expirationTtl: ttl } : undefined);
}

export async function kvDelete(key: string): Promise<void> {
  if (!kvNamespace) return;
  await kvNamespace.delete(key);
}

export async function kvList(prefix: string): Promise<string[]> {
  if (!kvNamespace) return [];
  const result = await kvNamespace.list({ prefix });
  return result.keys.map(k => k.name);
}
