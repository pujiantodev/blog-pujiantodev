import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { marked } from "marked";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { BLOGGER_ID, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

if (!BLOGGER_ID || !CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error("❌ Environment variables missing.");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function publishPost(markdownPath) {
  const blogger = google.blogger({ version: "v3", auth: oauth2Client });

  const mdContent = fs.readFileSync(markdownPath, "utf-8");
  const htmlContent = marked(mdContent);
  const title = path.basename(markdownPath, ".md").replace(/-/g, " ");

  const res = await blogger.posts.insert({
    blogId: BLOGGER_ID,
    requestBody: {
      title,
      content: htmlContent,
    },
  });

  console.log(`✅ Published: ${res.data.url}`);
}

async function main() {
  const postsDir = path.join(__dirname, "posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    await publishPost(path.join(postsDir, file));
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
