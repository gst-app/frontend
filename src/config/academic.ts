export const FACULTIES = [
  { id: "agriculture", name: "Agriculture" },
  { id: "arts", name: "Arts" },
  { id: "basic-clinical-sciences", name: "Basic Clinical Sciences" },
  { id: "basic-medical-sciences", name: "Basic Medical Sciences" },
  { id: "biosciences", name: "Biosciences" },
  { id: "communication-and-media-studies", name: "Communication and Media Studies" },
  { id: "education", name: "Education" },
  { id: "engineering", name: "Engineering" },
  { id: "environmental-sciences", name: "Environmental Sciences" },
  { id: "health-sciences-and-technology", name: "Health Sciences and Technology" },
  { id: "law", name: "Law" },
  { id: "management-sciences", name: "Management Sciences" },
  { id: "medical-laboratory-science", name: "Medical Laboratory Science" },
  { id: "medicine", name: "Medicine" },
  { id: "nursing-sciences", name: "Nursing Sciences" },
  { id: "pharmaceutical-sciences", name: "Pharmaceutical Sciences" },
  { id: "physical-sciences", name: "Physical Sciences" },
  { id: "social-sciences", name: "Social Sciences" },
  { id: "technology-and-vocational-education", name: "Technology and Vocational Education" },
] as const;

export type FacultyId = (typeof FACULTIES)[number]["id"];

export type Department = {
  id: string;
  name: string;
  facultyId: FacultyId;
};

export const DEPARTMENTS: Department[] = [
  // agriculture
  {
    id: "agricultural-economics-and-extension",
    name: "Agricultural Economics and Extension",
    facultyId: "agriculture",
  },
  {
    id: "animal-science-and-technology",
    name: "Animal Science and Technology",
    facultyId: "agriculture",
  },
  {
    id: "crop-science-and-horticulture",
    name: "Crop Science and Horticulture",
    facultyId: "agriculture",
  },
  { id: "fisheries-and-aquaculture", name: "Fisheries and Aquaculture", facultyId: "agriculture" },
  {
    id: "food-science-and-technology",
    name: "Food Science and Technology",
    facultyId: "agriculture",
  },
  {
    id: "forestry-and-wildlife-management",
    name: "Forestry and Wildlife Management",
    facultyId: "agriculture",
  },
  {
    id: "soil-science-and-land-resources-management",
    name: "Soil Science and Land Resources Management",
    facultyId: "agriculture",
  },

  // arts
  { id: "chinese-studies", name: "Chinese Studies", facultyId: "arts" },
  {
    id: "english-language-and-literature",
    name: "English Language and Literature",
    facultyId: "arts",
  },
  {
    id: "history-and-international-studies",
    name: "History and International Studies",
    facultyId: "arts",
  },
  {
    id: "igbo-african-and-asian-studies",
    name: "Igbo, African and Asian Studies",
    facultyId: "arts",
  },
  { id: "linguistics", name: "Linguistics", facultyId: "arts" },
  { id: "modern-european-languages", name: "Modern European Languages", facultyId: "arts" },
  { id: "music", name: "Music", facultyId: "arts" },
  { id: "philosophy", name: "Philosophy", facultyId: "arts" },
  { id: "religion-and-human-relations", name: "Religion and Human Relations", facultyId: "arts" },
  { id: "theatre-arts-and-film-studies", name: "Theatre Arts and Film Studies", facultyId: "arts" },

  // basic-clinical-sciences
  { id: "chemical-pathology", name: "Chemical Pathology", facultyId: "basic-clinical-sciences" },
  {
    id: "medical-microbiology-and-parasitology",
    name: "Medical Microbiology and Parasitology",
    facultyId: "basic-clinical-sciences",
  },
  {
    id: "pharmacology-and-therapeutics",
    name: "Pharmacology and Therapeutics",
    facultyId: "basic-clinical-sciences",
  },

  // basic-medical-sciences
  { id: "anatomy", name: "Anatomy", facultyId: "basic-medical-sciences" },
  { id: "human-biochemistry", name: "Human Biochemistry", facultyId: "basic-medical-sciences" },
  { id: "human-physiology", name: "Human Physiology", facultyId: "basic-medical-sciences" },

  // biosciences
  { id: "applied-biochemistry", name: "Applied Biochemistry", facultyId: "biosciences" },
  {
    id: "applied-microbiology-and-brewing",
    name: "Applied Microbiology and Brewing",
    facultyId: "biosciences",
  },
  { id: "botany", name: "Botany", facultyId: "biosciences" },
  {
    id: "parasitology-and-entomology",
    name: "Parasitology and Entomology",
    facultyId: "biosciences",
  },
  { id: "zoology", name: "Zoology", facultyId: "biosciences" },

  // communication-and-media-studies
  { id: "advertising", name: "Advertising", facultyId: "communication-and-media-studies" },
  { id: "broadcasting", name: "Broadcasting", facultyId: "communication-and-media-studies" },
  {
    id: "development-and-communication-studies",
    name: "Development and Communication Studies",
    facultyId: "communication-and-media-studies",
  },
  {
    id: "journalism-and-media-studies",
    name: "Journalism and Media Studies",
    facultyId: "communication-and-media-studies",
  },
  {
    id: "mass-communication",
    name: "Mass Communication",
    facultyId: "communication-and-media-studies",
  },

  // education
  {
    id: "adult-and-continuing-education",
    name: "Adult and Continuing Education",
    facultyId: "education",
  },
  {
    id: "early-childhood-and-primary-education",
    name: "Early Childhood and Primary Education",
    facultyId: "education",
  },
  { id: "educational-foundations", name: "Educational Foundations", facultyId: "education" },
  {
    id: "educational-management-and-policy",
    name: "Educational Management and Policy",
    facultyId: "education",
  },
  { id: "guidance-and-counselling", name: "Guidance and Counselling", facultyId: "education" },
  {
    id: "health-promotion-and-public-health-education",
    name: "Health Promotion and Public Health Education",
    facultyId: "education",
  },
  {
    id: "human-kinetics-and-sports-science",
    name: "Human Kinetics and Sports Science",
    facultyId: "education",
  },
  {
    id: "library-and-information-science",
    name: "Library and Information Science",
    facultyId: "education",
  },
  { id: "science-education", name: "Science Education", facultyId: "education" },

  // engineering
  {
    id: "agricultural-and-bioresources-engineering",
    name: "Agricultural and Bioresources Engineering",
    facultyId: "engineering",
  },
  { id: "biomedical-engineering", name: "Biomedical Engineering", facultyId: "engineering" },
  { id: "chemical-engineering", name: "Chemical Engineering", facultyId: "engineering" },
  { id: "civil-engineering", name: "Civil Engineering", facultyId: "engineering" },
  { id: "electrical-engineering", name: "Electrical Engineering", facultyId: "engineering" },
  {
    id: "electronic-and-computer-engineering",
    name: "Electronic and Computer Engineering",
    facultyId: "engineering",
  },
  {
    id: "industrial-and-production-engineering",
    name: "Industrial and Production Engineering",
    facultyId: "engineering",
  },
  { id: "mechanical-engineering", name: "Mechanical Engineering", facultyId: "engineering" },
  {
    id: "metallurgical-and-materials-engineering",
    name: "Metallurgical and Materials Engineering",
    facultyId: "engineering",
  },
  {
    id: "polymer-and-textile-engineering",
    name: "Polymer and Textile Engineering",
    facultyId: "engineering",
  },

  // environmental-sciences
  { id: "architecture", name: "Architecture", facultyId: "environmental-sciences" },
  { id: "building", name: "Building", facultyId: "environmental-sciences" },
  {
    id: "environmental-management",
    name: "Environmental Management",
    facultyId: "environmental-sciences",
  },
  { id: "estate-management", name: "Estate Management", facultyId: "environmental-sciences" },
  {
    id: "fine-and-applied-arts",
    name: "Fine and Applied Arts",
    facultyId: "environmental-sciences",
  },
  {
    id: "geography-and-meteorology",
    name: "Geography and Meteorology",
    facultyId: "environmental-sciences",
  },
  { id: "quantity-surveying", name: "Quantity Surveying", facultyId: "environmental-sciences" },
  {
    id: "surveying-and-geoinformatics",
    name: "Surveying and Geoinformatics",
    facultyId: "environmental-sciences",
  },

  // health-sciences-and-technology
  {
    id: "environmental-health-science",
    name: "Environmental Health Science",
    facultyId: "health-sciences-and-technology",
  },
  {
    id: "medical-rehabilitation",
    name: "Medical Rehabilitation",
    facultyId: "health-sciences-and-technology",
  },
  {
    id: "radiography-and-radiological-sciences",
    name: "Radiography and Radiological Sciences",
    facultyId: "health-sciences-and-technology",
  },

  // law
  { id: "law", name: "Law", facultyId: "law" },

  // management-sciences
  { id: "accountancy", name: "Accountancy", facultyId: "management-sciences" },
  { id: "banking-and-finance", name: "Banking and Finance", facultyId: "management-sciences" },
  {
    id: "business-administration",
    name: "Business Administration",
    facultyId: "management-sciences",
  },
  {
    id: "cooperative-economics-and-management",
    name: "Cooperative Economics and Management",
    facultyId: "management-sciences",
  },
  {
    id: "entrepreneurial-studies",
    name: "Entrepreneurial Studies",
    facultyId: "management-sciences",
  },
  { id: "marketing", name: "Marketing", facultyId: "management-sciences" },
  { id: "public-administration", name: "Public Administration", facultyId: "management-sciences" },

  // medical-laboratory-science
  {
    id: "medical-laboratory-science",
    name: "Medical Laboratory Science",
    facultyId: "medical-laboratory-science",
  },

  // medicine
  { id: "medicine-and-surgery", name: "Medicine and Surgery", facultyId: "medicine" },

  // nursing-sciences
  { id: "nursing-science", name: "Nursing Science", facultyId: "nursing-sciences" },

  // pharmaceutical-sciences
  {
    id: "clinical-pharmacy-and-pharmacy-management",
    name: "Clinical Pharmacy and Pharmacy Management",
    facultyId: "pharmaceutical-sciences",
  },
  { id: "forensic-sciences", name: "Forensic Sciences", facultyId: "pharmaceutical-sciences" },
  {
    id: "logistics-and-supply-chain-management",
    name: "Logistics and Supply Chain Management",
    facultyId: "pharmaceutical-sciences",
  },
  {
    id: "pharmaceutical-and-medicinal-chemistry",
    name: "Pharmaceutical and Medicinal Chemistry",
    facultyId: "pharmaceutical-sciences",
  },
  {
    id: "pharmaceutical-microbiology-and-biotechnology",
    name: "Pharmaceutical Microbiology and Biotechnology",
    facultyId: "pharmaceutical-sciences",
  },
  {
    id: "pharmaceutics-and-pharmaceutical-technology",
    name: "Pharmaceutics and Pharmaceutical Technology",
    facultyId: "pharmaceutical-sciences",
  },
  {
    id: "pharmacognosy-and-traditional-medicine",
    name: "Pharmacognosy and Traditional Medicine",
    facultyId: "pharmaceutical-sciences",
  },
  {
    id: "pharmacology-and-toxicology",
    name: "Pharmacology and Toxicology",
    facultyId: "pharmaceutical-sciences",
  },

  // physical-sciences
  { id: "computer-science", name: "Computer Science", facultyId: "physical-sciences" },
  { id: "geological-sciences", name: "Geological Sciences", facultyId: "physical-sciences" },
  { id: "mathematics", name: "Mathematics", facultyId: "physical-sciences" },
  {
    id: "physics-and-industrial-physics",
    name: "Physics and Industrial Physics",
    facultyId: "physical-sciences",
  },
  {
    id: "pure-and-industrial-chemistry",
    name: "Pure and Industrial Chemistry",
    facultyId: "physical-sciences",
  },
  { id: "statistics", name: "Statistics", facultyId: "physical-sciences" },

  // social-sciences
  { id: "economics", name: "Economics", facultyId: "social-sciences" },
  { id: "political-science", name: "Political Science", facultyId: "social-sciences" },
  { id: "psychology", name: "Psychology", facultyId: "social-sciences" },
  {
    id: "sociology-and-anthropology",
    name: "Sociology and Anthropology",
    facultyId: "social-sciences",
  },

  // technology-and-vocational-education
  {
    id: "business-education",
    name: "Business Education",
    facultyId: "technology-and-vocational-education",
  },
  {
    id: "technology-education",
    name: "Technology Education",
    facultyId: "technology-and-vocational-education",
  },
];

export const getDepartmentsByFaculty = (facultyId: string) =>
  DEPARTMENTS.filter((department) => department.facultyId === facultyId);
