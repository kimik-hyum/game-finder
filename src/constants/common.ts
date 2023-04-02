const api = process.env.API;
const isClient = typeof window !== "undefined";

export { api, isClient };
