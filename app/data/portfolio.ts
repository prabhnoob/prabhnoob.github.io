export type ProjectArt = "markets" | "mobile" | "map" | "world" | "terminal";

export interface Project {
  id: string;
  title: string;
  category: string;
  eyebrow: string;
  summary: string;
  problem: string;
  contribution: string;
  implementation: string;
  features: string[];
  technologies: string[];
  challenge: string;
  outcome: string;
  art: ProjectArt;
  accent: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  organization: string;
  role: string;
  dates: string;
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const profile = {
  name: "Prabhnoor Singh",
  role: "Computer Science Student · Software Developer",
  headline: "I build clear interfaces for complex systems.",
  positioning:
    "From data-rich dashboards to mobile workflows and interactive 3D worlds, I turn technical ideas into responsive, useful experiences.",
  location: "Victoria, BC",
  availability: "Open to co-op, internship, and software collaboration opportunities.",
  email: "prabhnoorarcher@gmail.com",
  github: "https://github.com/prabhnoob",
  resume: "/resume/prabhnoor-singh-resume.pdf",
} as const;

export const projects: Project[] = [
  {
    id: "stock-evolver",
    title: "Stock Evolver",
    category: "Data product",
    eyebrow: "Investment analysis",
    summary:
      "An interactive dashboard that makes market movement easier to explore through focused data views.",
    problem:
      "Investment data is often dense and fragmented, making it difficult to compare movement and find a useful signal quickly.",
    contribution:
      "Designed the product structure and built the interface as a set of reusable, responsive components for fast scanning and deeper exploration.",
    implementation:
      "Typed React components organize controls, market context, and visualisation states while keeping the experience legible across screen sizes.",
    features: [
      "Interactive market visualisations",
      "Reusable dashboard components",
      "Responsive comparison views",
    ],
    technologies: ["React", "TypeScript", "Data visualisation"],
    challenge:
      "Balancing information density with a hierarchy that still feels approachable to a first-time visitor.",
    outcome:
      "A portfolio-ready analysis surface that demonstrates component architecture and information design without hiding the underlying data story.",
    art: "markets",
    accent: "#39f5c7",
    featured: true,
  },
  {
    id: "smartlift",
    title: "SmartLift",
    category: "Mobile product",
    eyebrow: "Workout tracking",
    summary:
      "A mobile workout experience that combines authenticated access with persistent routine tracking.",
    problem:
      "Workout progress becomes harder to sustain when plans, completed sets, and account history live in disconnected places.",
    contribution:
      "Shaped the mobile interaction flow and connected authenticated user sessions to durable workout data.",
    implementation:
      "Expo-based screens and Firebase services support account access, structured routines, and continuity between sessions.",
    features: [
      "Authenticated user flows",
      "Persistent workout tracking",
      "Mobile-first interaction patterns",
    ],
    technologies: ["Expo", "Firebase", "React Native"],
    challenge:
      "Keeping workout state understandable and consistent as users move between sessions and devices.",
    outcome:
      "A cohesive mobile foundation for planning, recording, and revisiting training activity.",
    art: "mobile",
    accent: "#ffb85c",
    featured: true,
  },
  {
    id: "wildfire-tracker",
    title: "Wildfire Tracker",
    category: "Data & maps",
    eyebrow: "Geographic intelligence",
    summary:
      "A map-led view of active wildfire events powered by NASA EONET geographic data.",
    problem:
      "Public event feeds are useful but difficult to interpret without geographic context and a clear way to inspect individual incidents.",
    contribution:
      "Connected the event feed to an interactive mapping experience and designed the information path from overview to incident detail.",
    implementation:
      "Imported and normalized EONET event data, plotted geographic positions, and exposed concise event context through responsive map controls.",
    features: [
      "NASA EONET data import",
      "Geographic event visualisation",
      "Focused incident details",
    ],
    technologies: ["React", "NASA EONET", "Mapping APIs"],
    challenge:
      "Transforming an external geographic feed into stable, readable markers and useful incident summaries.",
    outcome:
      "A fast visual overview that turns raw event data into a more navigable public-information experience.",
    art: "map",
    accent: "#ff725e",
    featured: true,
  },
  {
    id: "uvcraft",
    title: "UVcraft",
    category: "Interactive 3D",
    eyebrow: "Campus world",
    summary:
      "A browser-based 3D walk through a stylized University of Victoria campus, built for desktop and mobile.",
    problem:
      "Interactive campus spaces need to feel recognizable and playful without overwhelming the browser or excluding mobile visitors.",
    contribution:
      "Built the world as modular scene components and tuned navigation, camera, lighting, and interaction for multiple input types.",
    implementation:
      "React Three Fiber and Three.js power a component-driven WebGL environment with keyboard, touch, and optional LAN co-op controls.",
    features: [
      "Desktop and mobile navigation",
      "Component-driven 3D environment",
      "Optional LAN co-op play",
    ],
    technologies: ["React", "TypeScript", "Three.js", "React Three Fiber"],
    challenge:
      "Balancing environmental detail, recognizability, and responsive rendering across a range of devices.",
    outcome:
      "A live, explorable web experience that demonstrates graphics programming, scene composition, and cross-device interaction.",
    art: "world",
    accent: "#8ea7ff",
    githubUrl: "https://github.com/prabhnoob/UVcraft",
    demoUrl: "https://prabhnoob.github.io/UVcraft/",
    featured: true,
  },
  {
    id: "simple-shell",
    title: "CSC 360 Simple Shell",
    category: "Systems",
    eyebrow: "Linux processes",
    summary:
      "A command shell exploring process execution, background jobs, signals, and lifecycle management.",
    problem:
      "A shell must coordinate user input, process creation, signals, and foreground or background execution without losing control of state.",
    contribution:
      "Implemented the command lifecycle and studied the operating-system behaviour behind familiar terminal workflows.",
    implementation:
      "C and Linux system calls manage command execution, background work, signal handling, and process cleanup.",
    features: [
      "Foreground command execution",
      "Background job management",
      "Signal and process handling",
    ],
    technologies: ["C", "Linux", "Systems programming"],
    challenge:
      "Coordinating asynchronous process state while preserving a predictable command-line experience.",
    outcome:
      "A focused systems project demonstrating practical understanding of processes, signals, and command execution.",
    art: "terminal",
    accent: "#c7ff71",
    featured: false,
  },
];

export const projectRails = [
  {
    id: "featured-builds",
    eyebrow: "Start here",
    title: "Featured projects",
    description: "The strongest product stories, selected for a quick recruiter scan.",
    projectIds: ["stock-evolver", "smartlift", "wildfire-tracker"],
  },
  {
    id: "systems-interactive",
    eyebrow: "Under the surface",
    title: "Systems & interactive",
    description: "Graphics, process control, and technical builds with a little more depth.",
    projectIds: ["uvcraft", "simple-shell"],
  },
] as const;

export const experiences: ExperienceItem[] = [
  {
    organization: "Felicita's University Pub",
    role: "Cook · Customer Service",
    dates: "Apr 2025 — Present",
    summary:
      "High-tempo service work requiring clear communication, reliable execution, and calm prioritization.",
    highlights: [
      "Coordinate with a cross-functional service team during high-volume shifts.",
      "Balance quality, safety, timing, and customer needs under pressure.",
    ],
  },
  {
    organization: "Walmart · Hillside Victoria",
    role: "Sales Associate",
    dates: "2023 — 2025",
    summary:
      "Customer-facing retail experience built around problem solving, organization, and dependable teamwork.",
    highlights: [
      "Helped customers navigate product choices and resolve day-to-day questions.",
      "Supported inventory, presentation, and point-of-sale operations with accuracy.",
    ],
  },
  {
    organization: "University of Victoria",
    role: "Computer Science · Project Work",
    dates: "In progress · Expected 2027",
    summary:
      "Course and independent builds spanning data products, mobile development, systems programming, and interactive graphics.",
    highlights: [
      "Translate technical concepts into maintainable, demonstrable software projects.",
      "Use Git and GitHub to iterate, review changes, and publish working experiences.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "C", "Python", "SQL"],
  },
  {
    title: "Web & mobile",
    skills: ["React", "Vite", "Expo", "HTML", "Modern CSS"],
  },
  {
    title: "Data & platforms",
    skills: ["Firebase", "REST APIs", "NASA EONET", "Mapping", "Data visualisation"],
  },
  {
    title: "Systems & graphics",
    skills: ["Linux", "Git", "GitHub", "Three.js", "React Three Fiber"],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "GitHub",
    value: "github.com/prabhnoob",
    href: profile.github,
    external: true,
  },
];
