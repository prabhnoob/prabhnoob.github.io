import type { Metadata } from "next";
import { PortfolioExperience } from "./components/PortfolioExperience";
import { profile, projects } from "./data/portfolio";

export const metadata: Metadata = {
  title: { absolute: "Prabhnoor Singh — Software Developer" },
  description:
    "Portfolio of Prabhnoor Singh, a Computer Science student and software developer building interactive 3D worlds, tested systems, product concepts, and data-rich interfaces.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Developer",
  description: profile.positioning,
  email: `mailto:${profile.email}`,
  url: "https://prabhnoob.github.io/",
  sameAs: [profile.github],
  knowsAbout: Array.from(new Set(projects.flatMap((project) => project.technologies))),
};

export default function Home() {
  return (
    <>
      <PortfolioExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
