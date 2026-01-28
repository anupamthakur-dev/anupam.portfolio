
import { Project, Skill, Category, BlogPost } from './types';

export const PERSONAL_INFO = {
  name: "Anupam Kumar",
  role: "Senior Frontend Engineer",
  tagline: "Crafting immersive digital experiences through precision code and avant-garde design.",
  email: "anupamthakur058@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  aboutShort: "I am a multidisciplinary developer focused on building functional and beautiful user interfaces. With over 6 years of experience, I bridge the gap between design and technology.",
  aboutLong: "Based in the digital ether, I specialize in React, TypeScript, and the modern web ecosystem. My approach is rooted in minimalist aesthetics combined with high-performance engineering. I believe that every interaction is an opportunity to delight users and solve complex problems elegantly."
};

export const CATEGORIES: Category[] = ['All', 'Web Design', 'UI/UX', 'Development', 'Branding'];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "Nova Ecosystem",
    slug: "nova-ecosystem",
    category: "Development",
    description: "A comprehensive dashboard for managing multi-chain crypto assets.",
    thumbnail: "https://picsum.photos/800/600?random=1",
    heroImage: "https://picsum.photos/1600/900?random=11",
    client: "Nova Corp",
    role: "Lead Frontend",
    year: "2023",
    tags: ["React", "Web3", "D3.js"],
    challenge: "Developing a real-time visualization tool that handles thousands of data points without sacrificing UI responsiveness.",
    solution: "Implemented a custom WebGL-based charting engine and optimized React rendering cycles using memoization and virtualized lists.",
    outcome: "Increased user retention by 40% due to improved performance and intuitive data presentation."
  },
  {
    id: '2',
    title: "Lumina Brand Identity",
    slug: "lumina-brand",
    category: "Branding",
    description: "Rebranding a sustainable energy startup for a global audience.",
    thumbnail: "https://picsum.photos/800/600?random=2",
    heroImage: "https://picsum.photos/1600/900?random=12",
    client: "Lumina Solar",
    role: "Visual Designer",
    year: "2023",
    tags: ["Brand Strategy", "Typography", "Motion"],
    challenge: "The previous brand felt dated and didn't convey the high-tech nature of the solar technology.",
    solution: "Created a bold, minimalist typographic system and a vibrant palette reflecting energy and optimism.",
    outcome: "Successfully secured Series B funding with a refreshed, professional image."
  },
  {
    id: '3',
    title: "Verve E-commerce",
    slug: "verve-commerce",
    category: "UI/UX",
    description: "A high-fashion shopping experience focused on minimalist luxury.",
    thumbnail: "https://picsum.photos/800/600?random=3",
    heroImage: "https://picsum.photos/1600/900?random=13",
    client: "Verve Atelier",
    role: "UX Architect",
    year: "2022",
    tags: ["Mobile-First", "Next.js", "Tailwind"],
    challenge: "High abandonment rates on mobile devices due to a cluttered checkout process.",
    solution: "Redesigned the entire user journey with a 3-step 'seamless' checkout and improved product filtering.",
    outcome: "Mobile conversion rate increased by 25% within three months of launch."
  },
  {
    id: '4',
    title: "Aether OS",
    slug: "aether-os",
    category: "Web Design",
    description: "A concept web-based operating system for creative collaboration.",
    thumbnail: "https://picsum.photos/800/600?random=4",
    heroImage: "https://picsum.photos/1600/900?random=14",
    client: "Personal Project",
    role: "Sole Creator",
    year: "2024",
    tags: ["TypeScript", "Canvas API", "Framer Motion"],
    challenge: "Building a complex window management system in a browser environment.",
    solution: "Leveraged custom hooks for state management and CSS Grid for the layout engine.",
    outcome: "Featured on several design galleries as an example of advanced frontend capabilities."
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, icon: "⚛️" },
  { name: "TypeScript", level: 90, icon: "📘" },
  { name: "Tailwind CSS", level: 98, icon: "🎨" },
  { name: "Three.js / WebGL", level: 70, icon: "🧊" },
  { name: "Node.js", level: 85, icon: "🟢" },
  { name: "Figma", level: 80, icon: "🖋️" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: "The Future of WebGL in Enterprise Dashboards",
    excerpt: "Exploring how heavy-data visualization is shifting from canvas to low-level graphics APIs for better performance.",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    category: "Engineering"
  },
  {
    id: 'b2',
    title: "Mastering Framer Motion for Agency Sites",
    excerpt: "How to implement complex scroll-based animations without bloating your bundle size.",
    date: "Feb 28, 2024",
    readTime: "5 min read",
    category: "Motion"
  },
  {
    id: 'b3',
    title: "Design Systems: From Figma to Production",
    excerpt: "Bridging the gap between design tokens and real-world CSS implementation at scale.",
    date: "Jan 12, 2024",
    readTime: "12 min read",
    category: "UI Architecture"
  }
];
