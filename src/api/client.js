// src/api/client.js
import { mockBackend } from "./mockBackend";

export const api = {
  get: (path) => mockBackend(path, "GET"),
  post: (path, body) => mockBackend(path, "POST", body),
  put: (path, body) => mockBackend(path, "PUT", body),
  patch: (path, body) => mockBackend(path, "PATCH", body),
  del: (path) => mockBackend(path, "DELETE"),
};
