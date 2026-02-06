

export type PortfolioData = {
  personal_info: PersonalInfo;
  about: AboutSection;
  skills: Skills;
};

export type PersonalInfo = {
  name: string;
  title: string;
  location: string;
  github: string;
  linkedin: string;
  email: string;
  resume_link: string;
};

export type AboutSection = {
  about_long: string;
  about_short: string;
  tagline: string;
};

export type Skills = {
  frontend: string[];
  backend: string[];
  tools: string[];
};


export interface Exp {
  id: string;
  company:string;
  startDate: string;
  endDate : string;
  location : string;
  role : string;
  employmentType: "Full-time" | "Part-time" | "Freelance";
  description:string;
}

export type CATEGORIES = string[];

export type Project = {
  id: string;

  title: string;
  slug: string;

  short_description: string;
  description: string;

  category: string;
  tags: string[];

  client: string;
  role: string[];

  challenge: string;
  solution: string;
  outcome: string;

  date_started: string;
  date_completed: string;

  featured: boolean;

  hero_image_link: string;
  gallery_links: string[];

  technologies: string[];

  source_code_url: string | null;
  live_url :string | null;
};

export type Projects = Project[];
