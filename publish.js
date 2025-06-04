const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const { marked } = require("marked");

const bloggerId = process.env.BLOGGER_ID;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

async function publishPost(markdownPath) {
  const blogger = google.blogger({ version: "v3", auth: oauth2Client });

  const mdContent = fs.readFileSync(markdownPath, "utf-8");
  const htmlContent = marked(mdContent);

  const title = path
    .basename(markdownPath)
    .replace(".md", "")
    .replace(/-/g, " ");

  const res = await blogger.posts.insert({
    blogId: bloggerId,
    requestBody: {
      title: title,
      content: htmlContent,
    },
  });

  console.log(`✅ Published: ${res.data.url}`);
}

async function main() {
  const postsDir = path.join(__dirname, "posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    await publishPost(fullPath);
  }
}

main().catch(console.error);
