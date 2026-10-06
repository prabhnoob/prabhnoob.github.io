export type ProjectArt = "clinic" | "buddy" | "map" | "world" | "testing" | "security" | "terminal";

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
    "From machine-learning research and tested software to human-centred prototypes and interactive 3D worlds, I turn technical ideas into useful, evidence-led experiences.",
  location: "Victoria, BC",
  availability: "Open to co-op, internship, and software collaboration opportunities.",
  email: "prabhnoorarcher@gmail.com",
  github: "https://github.com/prabhnoob",
  resume: "/resume/prabhnoor-singh-resume.pdf",
} as const;

export const projects: Project[] = [
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
    id: "pacman-tester",
    title: "Pacman Tester",
    category: "Software Testing",
    eyebrow: "SENG 275 · JPacman QA",
    summary:
      "A layered testing project for JPacman covering game rules, collisions, parsing, scoring, and player state.",
    problem:
      "A real-time game can look correct while edge cases in collisions, lifecycle state, map parsing, or scoring remain unverified.",
    contribution:
      "Extended the JPacman test suite with unit and parameterized tests, then paired the automated checks with scripted and exploratory play sessions.",
    implementation:
      "JUnit 5, Mockito, AssertJ, and Gradle isolate collaborators and exercise both expected behavior and failure paths across seven focused suites.",
    features: [
      "37 passing automated tests",
      "Collision and lifecycle coverage",
      "Scripted and exploratory test report",
    ],
    technologies: ["Java", "JUnit 5", "Mockito", "Gradle", "JaCoCo"],
    challenge:
      "Testing stateful game behavior without coupling each assertion to rendering, timing, or unrelated collaborators.",
    outcome:
      "All 37 automated tests pass across seven suites, backed by manual scenarios for movement, pellets, ghosts, walls, and pause or resume behavior.",
    art: "testing",
    accent: "#ffe45c",
    githubUrl: "https://github.com/prabhnoob/jpacman",
    featured: true,
  },
  {
    id: "awaretrail",
    title: "AwareTrail",
    category: "Requirements Engineering",
    eyebrow: "SENG 321 · Trail running coach",
    summary:
      "A requirements-led mobile coaching concept that recommends safer, goal-matched trail routes and full-body training plans.",
    problem:
      "Trail runners juggle race goals, elevation, terrain, weather, recovery, and local safety data across disconnected tools.",
    contribution:
      "Focused the product concept into testable requirements and a route-recommendation flow with actors, constraints, degraded states, and measurable outcomes.",
    implementation:
      "The design combines profile data, weather, route metadata, hazard filters, scoring, and local caching in a traceable use case and sequence model.",
    features: [
      "Ranked route recommendations",
      "Weather and hazard safety filters",
      "Cached offline route fallback",
      "Wearable and fitness-data integration",
    ],
    technologies: ["Requirements engineering", "UML", "UX prototyping", "API design"],
    challenge:
      "Turning many uncertain data sources into recommendations that remain understandable, privacy-aware, and useful when an API or GPS signal fails.",
    outcome:
      "A prototype-ready product specification that connects user goals to system behavior, alternative flows, business rules, and future test cases.",
    art: "map",
    accent: "#ff9b62",
    featured: true,
  },
  {
    id: "phishing-url-generalization",
    title: "Phishing URL Generalization",
    category: "Machine Learning & Cybersecurity",
    eyebrow: "SENG 474 · Leakage-resistant evaluation",
    summary:
      "A research project evaluating whether phishing URL detectors still perform when every test domain is genuinely unseen during training.",
    problem:
      "Random train-test splits can place related URLs from the same registrable domain in both partitions, making a detector appear more reliable than it would be against new attacker infrastructure.",
    contribution:
      "Defined the data-source checks and registrable-domain grouping rules used to keep evaluation splits leakage-free, while contributing to the problem formulation, experiments, and writing.",
    implementation:
      "The experimental plan compares random, host-disjoint, registrable-domain-disjoint, and cross-source splits using the 235,795-site PhiUSIIL corpus plus an independent public URL dataset.",
    features: [
      "Four realistic evaluation strategies",
      "Registrable-domain leakage controls",
      "Cross-source generalization testing",
      "Reproducible research protocol",
    ],
    technologies: ["Machine learning", "Cybersecurity", "Dataset evaluation", "eTLD+1", "LaTeX"],
    challenge:
      "Separating genuine generalization from memorized domain-family shortcuts while keeping comparisons fair across datasets collected in different ways.",
    outcome:
      "A public research proposal and formal evaluation protocol that establish the project scope, team responsibilities, and next experimental milestone.",
    art: "security",
    accent: "#5ff0c2",
    githubUrl: "https://github.com/prabhnoob/domain-generalizable-phishing-url-detection",
    featured: false,
  },
  {
    id: "study-buddy-finder",
    title: "Study Buddy Finder",
    category: "Human-Computer Interaction",
    eyebrow: "SENG 310 · Student matching",
    summary:
      "A human-centred web prototype that helps UVic students find compatible study partners by course, availability, location, and study preferences.",
    problem:
      "Students often want peer support but have no simple way to discover classmates whose courses, schedules, locations, and study habits align.",
    contribution:
      "Applied HCI methods to shape the matching flow, organize student profile information, and make compatibility cues easy to scan without overwhelming the user.",
    implementation:
      "A responsive HTML, CSS, and JavaScript prototype supports profile setup, course-based discovery, compatibility filters, match review, and connection requests.",
    features: [
      "Course and subject matching",
      "Availability and preferred-location filters",
      "Study-style compatibility profiles",
      "Match review and connection requests",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "HCI", "UX prototyping"],
    challenge:
      "Presenting enough information for a useful match while keeping the experience approachable and respectful of student privacy.",
    outcome:
      "A high-fidelity prototype that applies visibility, recognition, consistency, user control, and clear feedback to the study-partner discovery journey.",
    art: "buddy",
    accent: "#a6ff78",
    featured: false,
  },
  {
    id: "patient-data-management",
    title: "Patient Data Management",
    category: "Data & Applications",
    eyebrow: "SENG 265 · Clinic system",
    summary:
      "A clinic application for securely managing patient profiles, selecting active records, and maintaining searchable clinical notes.",
    problem:
      "Clinical staff need a consistent way to find and update patient information while preventing unauthenticated access and invalid record operations.",
    contribution:
      "Built the patient and note workflows, connected the domain model to persistence, and exercised the system through unit and integration tests.",
    implementation:
      "Python powers the controller, data-access, CLI, and PyQt6 GUI layers; C and pandas support structured data processing, with JSON and pickle persistence for patient and note records.",
    features: [
      "Authenticated patient CRUD workflows",
      "Searchable, timestamped clinical notes",
      "Command-line and PyQt6 interfaces",
      "23 unit and integration test scenarios",
    ],
    technologies: ["Python", "C", "pandas", "PyQt6", "JSON"],
    challenge:
      "Keeping authentication, current-patient state, persistence, and failure rules consistent across both command-line and graphical interfaces.",
    outcome:
      "A layered patient-record system with clear separation between controllers, domain objects, data-access components, interfaces, and automated verification.",
    art: "clinic",
    accent: "#62e7d0",
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
    projectIds: ["uvcraft", "pacman-tester", "patient-data-management"],
  },
  {
    id: "coursework-systems",
    eyebrow: "From coursework to craft",
    title: "Research, interaction & systems",
    description: "Leakage-resistant evaluation, human-centred design, traceable requirements, and lower-level systems work.",
    projectIds: ["phishing-url-generalization", "study-buddy-finder", "awaretrail", "simple-shell"],
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
      "Course and independent builds spanning software testing, HCI, requirements engineering, data applications, systems programming, and interactive graphics.",
    highlights: [
      "Translate technical concepts into maintainable, demonstrable software projects.",
      "Apply usability evaluation, requirements modelling, and automated testing to real project work.",
      "Use Git and GitHub to iterate, review changes, and publish working experiences.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Java", "C", "Python", "SQL"],
  },
  {
    title: "Web & interaction",
    skills: ["React", "Vite", "HTML", "Modern CSS", "HCI", "Heuristic evaluation"],
  },
  {
    title: "Data & machine learning",
    skills: ["Machine learning", "Dataset evaluation", "pandas", "PyQt6", "JSON", "Firebase", "REST APIs"],
  },
  {
    title: "Quality, systems & graphics",
    skills: ["JUnit", "Mockito", "Gradle", "Requirements engineering", "UML", "Linux", "Git", "Three.js", "React Three Fiber"],
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
