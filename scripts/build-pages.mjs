import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const repositoryRoot = new URL("../", import.meta.url);
const clientDirectory = new URL("../dist/client/", import.meta.url);
const pagesDirectory = new URL("../dist-pages/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);

workerUrl.searchParams.set("static-pages-build", `${Date.now()}`);

await rm(pagesDirectory, { recursive: true, force: true });
await mkdir(pagesDirectory, { recursive: true });
await cp(clientDirectory, pagesDirectory, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://prabhnoob.github.io/", {
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

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

const html = await response.text();
if (!html.includes("Prabhnoor Singh") || !html.includes('id="projects"')) {
  throw new Error("Static render is missing required portfolio content");
}

await Promise.all([
  writeFile(new URL("index.html", pagesDirectory), html, "utf8"),
  writeFile(new URL("404.html", pagesDirectory), html, "utf8"),
]);

console.log(`GitHub Pages artifact: ${new URL("dist-pages/", repositoryRoot).pathname}`);
