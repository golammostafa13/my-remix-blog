import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create sample posts
  const posts = [
    {
      title: "Getting Started with Remix",
      content: "This post will guide you through the basics of Remix.",
      author: "John Doe",
    },
    {
      title: "Advanced Remix Techniques",
      content: "Explore advanced techniques for building Remix apps.",
      author: "Jane Smith",
    },
    {
      title: "Using Tailwind CSS in Remix",
      content:
        "Learn how to integrate Tailwind CSS with Remix to style your apps.",
      author: "Alex Johnson",
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
