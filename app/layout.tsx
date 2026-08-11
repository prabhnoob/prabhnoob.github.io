import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#050b0e",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "prabhnoob.github.io";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Prabhnoor Singh — Software Developer",
      template: "%s · Prabhnoor Singh",
    },
    description:
      "Software developer portfolio featuring interactive 3D work, software testing, patient-data applications, HCI, requirements engineering, and systems programming.",
    applicationName: "Prabhnoor Singh Portfolio",
    authors: [{ name: "Prabhnoor Singh", url: "https://github.com/prabhnoob" }],
    creator: "Prabhnoor Singh",
    keywords: [
      "Prabhnoor Singh",
      "software developer",
      "computer science",
      "React developer",
      "TypeScript developer",
      "software testing",
      "human-computer interaction",
      "requirements engineering",
      "Python developer",
      "portfolio",
    ],
    alternates: { canonical: "/" },
    manifest: "/site.webmanifest",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      url: "/",
      title: "Prabhnoor Singh — Software Developer",
      description:
        "Clear interfaces for complex systems—from tested patient-data applications to interactive 3D worlds.",
      siteName: "Prabhnoor Singh Portfolio",
      locale: "en_CA",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Prabhnoor Singh, software developer - clear interfaces for complex systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Prabhnoor Singh — Software Developer",
      description:
        "Clear interfaces for complex systems—from tested patient-data applications to interactive 3D worlds.",
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
