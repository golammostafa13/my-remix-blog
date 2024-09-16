

export default function Home() {
  return (
    <div>
      <main className="flex-grow container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Welcome to My Remix Blog</h2>
        <p className="mb-4">Explore the latest posts and updates on web development, Remix, and more.</p>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Recent Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example blog post cards */}
            <article className="p-4 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Getting Started with Remix</h4>
              <p className="mb-2">
                Learn how to get started with Remix and build scalable web applications.
              </p>
              <a href="/posts/remix-getting-started" className="text-blue-600 hover:underline">
                Read more
              </a>
            </article>

            <article className="p-4 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Advanced Remix Features</h4>
              <p className="mb-2">
                Dive deep into advanced features of Remix like nested routing and data loaders.
              </p>
              <a href="/posts/remix-advanced-features" className="text-blue-600 hover:underline">
                Read more
              </a>
            </article>

            <article className="p-4 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Using Tailwind CSS with Remix</h4>
              <p className="mb-2">
                Learn how to integrate Tailwind CSS into your Remix project for faster development.
              </p>
              <a href="/posts/remix-tailwind-integration" className="text-blue-600 hover:underline">
                Read more
              </a>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}