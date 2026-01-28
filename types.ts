
export type Category = 'All' | 'Web Design' | 'UI/UX' | 'Development' | 'Branding';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: Category;
  description: string;
  thumbnail: string;
  heroImage: string;
  client: string;
  role: string;
  year: string;
  tags: string[];
  challenge: string;
  solution: string;
  outcome: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}
