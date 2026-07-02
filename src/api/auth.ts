import { api } from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  therapistId: number;
  name: string;
  email: string;
}

/** POST /api/auth/login → guarda el token en localStorage */
export async function login(req: LoginRequest): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", req);
  localStorage.setItem("kusigo_token", data.token);
  return data;
}

export function logout(): void {
  localStorage.removeItem("kusigo_token");
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("kusigo_token");
}
