import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([\da-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number.parseInt(value, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/(?:&#39;|&apos;)/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function assertSecureBlankLinks(markup, context) {
  const links = markup.match(/<a\b(?=[^>]*\btarget=["']_blank["'])[^>]*>/gi) ?? [];
  assert.ok(links.length > 0, `${context} should include external links that open a new tab`);

  for (const link of links) {
    const rel = link.match(/\brel=["']([^"']+)["']/i)?.[1] ?? "";
    const tokens = new Set(rel.toLowerCase().split(/\s+/).filter(Boolean));
    assert.ok(tokens.has("noopener"), `${context} external link is missing noopener: ${link}`);
    assert.ok(tokens.has("noreferrer"), `${context} external link is missing noreferrer: ${link}`);
  }

  return links;
}

test("server-renders the completed Prabhnoor Singh portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const text = visibleText(html);

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  assert.match(title, /Prabhnoor Singh/i);
  assert.match(title, /Software Developer/i);

  const description =
    html.match(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i)?.[0] ?? "";
  assert.match(description, /Prabhnoor Singh/i);
  assert.match(description, /portfolio/i);
  assert.match(description, /software developer/i);

  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.doesNotMatch(
    html,
    /codex-preview|react-loading-skeleton|sites-skeleton|Building your site|Your site is taking shape/i,
  );

  assert.match(text, /Prabhnoor Singh/i);
  assert.match(text, /Computer Science Student.{0,12}Software Developer/i);
  assert.match(text, /Explore projects/i);
  assert.match(text, /View r.sum./i);

  assert.match(html, /<main\b(?=[^>]*\bid=["']main-content["'])[^>]*>/i);
  for (const id of ["projects", "experience", "skills", "about", "contact"]) {
    assert.match(
      html,
      new RegExp(`<section\\b(?=[^>]*\\bid=["']${id}["'])[^>]*>`, "i"),
      `expected the rendered page to include the #${id} section`,
    );
  }

  const projectButtons =
    html.match(
      /<button\b(?=[^>]*\bclass=["'][^"']*\bproject-card__button\b[^"']*["'])(?=[^>]*\baria-haspopup=["']dialog["'])[^>]*>/gi,
    ) ?? [];
  assert.ok(
    projectButtons.length >= 5,
    `expected at least five project-card dialog buttons, found ${projectButtons.length}`,
  );
  for (const projectTitle of [
    "Stock Evolver",
    "SmartLift",
    "Wildfire Tracker",
    "UVcraft",
    "CSC 360 Simple Shell",
  ]) {
    assert.match(text, new RegExp(projectTitle, "i"));
  }
  assert.match(html, /<noscript>/i);
  assert.match(text, /Project archive \/ no JavaScript/i);
  assert.match(text, /Case studies, kept readable\./i);

  assert.match(html, /href=["']mailto:prabhnoorarcher@gmail\.com["']/i);
  assert.match(html, /href=["']https:\/\/github\.com\/prabhnoob\/?["']/i);
  assert.match(html, /href=["']\/resume\/prabhnoor-singh-resume\.pdf["']/i);

  const externalLinks = assertSecureBlankLinks(html, "rendered HTML");
  assert.ok(externalLinks.length >= 3, "expected GitHub and résumé links in the rendered page");

  const jsonLdSource =
    html.match(
      /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/i,
    )?.[1] ?? "";
  assert.ok(jsonLdSource, "expected Person JSON-LD in the rendered page");
  const jsonLd = JSON.parse(jsonLdSource);
  assert.equal(jsonLd["@context"], "https://schema.org");
  assert.equal(jsonLd["@type"], "Person");
  assert.equal(jsonLd.name, "Prabhnoor Singh");
  assert.equal(jsonLd.jobTitle, "Software Developer");
  assert.deepEqual(jsonLd.sameAs, ["https://github.com/prabhnoob"]);
});

test("keeps dialog links, navigation accessibility, and reduced motion explicit", async () => {
  const [component, css, portfolioData] = await Promise.all([
    readFile(new URL("../app/components/PortfolioExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/data/portfolio.ts", import.meta.url), "utf8"),
  ]);

  const uvcraft =
    portfolioData.match(/id:\s*["']uvcraft["'][\s\S]*?featured:\s*true,?\s*\n\s*}/i)?.[0] ?? "";
  assert.match(uvcraft, /title:\s*["']UVcraft["']/i);
  assert.match(uvcraft, /githubUrl:\s*["']https:\/\/github\.com\/prabhnoob\/UVcraft["']/i);
  assert.match(uvcraft, /demoUrl:\s*["']https:\/\/prabhnoob\.github\.io\/UVcraft\/["']/i);

  assert.match(
    component,
    /<a\b(?=[^>]*href=\{project\.demoUrl})(?=[^>]*target=["']_blank["'])(?=[^>]*rel=["']noopener noreferrer["'])[^>]*>Open live project/i,
  );
  assert.match(
    component,
    /<a\b(?=[^>]*href=\{project\.githubUrl})(?=[^>]*target=["']_blank["'])(?=[^>]*rel=["']noopener noreferrer["'])[^>]*>View GitHub repository/i,
  );
  assertSecureBlankLinks(component, "portfolio component source");

  assert.match(component, /<header\b/);
  assert.match(component, /aria-label=["']Primary navigation["']/);
  assert.match(component, /aria-controls=["']primary-navigation["']/);
  assert.match(component, /Open navigation/);
  assert.match(component, /Close navigation/);
  assert.match(component, /<dialog\b[^>]*aria-labelledby=/);
  assert.match(component, /aria-haspopup=["']dialog["']/);
  assert.match(component, /aria-label=["']Close project details["']/);

  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/i);
  assert.match(css, /animation-duration:\s*0\.01ms\s*!important/i);
  assert.match(css, /animation-iteration-count:\s*1\s*!important/i);
  assert.match(css, /scroll-behavior:\s*auto\s*!important/i);
  assert.match(css, /transition-duration:\s*0\.01ms\s*!important/i);
  assert.match(css, /\.contact-links a span\s*\{[^}]*rgba\(3,\s*17,\s*14,\s*0\.72\)/i);
});
