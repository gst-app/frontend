export const FACULTIES = [
  { id: "agriculture", name: "Agriculture" },
  { id: "arts", name: "Arts" },
  { id: "basic-medical-sciences", name: "Basic Medical Sciences" },
  { id: "biosciences", name: "Biosciences" },
  { id: "education", name: "Education" },
  { id: "engineering", name: "Engineering" },
  { id: "environmental-sciences", name: "Environmental Sciences" },
  { id: "law", name: "Law" },
  { id: "management-sciences", name: "Management Sciences" },
  { id: "pharmaceutical-sciences", name: "Pharmaceutical Sciences" },
  { id: "physical-sciences", name: "Physical Sciences" },
  { id: "social-sciences", name: "Social Sciences" },
] as const;

export type FacultyId = (typeof FACULTIES)[number]["id"];

export type Department = {
  id: string;
  name: string;
  facultyId: FacultyId;
};
