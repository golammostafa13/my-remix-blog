import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import "./tailwind.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Blog" },
    { name: "description", content: "A cool blog build with Remix" },
    { keywords: ["javascript", "framework", "remix"] }
  ];
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "href='https://fonts.googleapis.com/css?family=Poppins'" },
];

function Document({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="navbar">
        <Link to={"/"} className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to={"/posts"}>Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
      <footer className="bg-gray-800 text-white p-4 mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Remix Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export function ErrorBoundary({ error }: Readonly<{ error: Error }>) {
  return (
    <div className="p-6 bg-red-100 rounded shadow">
      <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="text-red-500 mt-2">{error.message}</p>
      <Link to="/" className="text-blue-500 underline">Go back to Home</Link>
    </div>
  );
}

