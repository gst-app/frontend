// Mirrors the backend response DTOs. Dates arrive as ISO strings.
export interface AcademicInfo {
  academicLevel: string;
  department: string;
  faculty: string;
}

export interface User {
  id: string;
  username: string;
  fullName?: string | null;
  email: string;
  role?: string;
  onboardingCompleted: boolean;
  profileImage?: string | null;
  academicInfo?: AcademicInfo | null;
  createdAt: string;
  updatedAt: string;
}

export type LoginResponse =
  | { status: "authenticated"; accessToken: string; user: User }
  | { status: "mfa_required"; mfaToken: string; method: string; expiresIn: number };
