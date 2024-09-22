// app/root.tsx
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Links, Meta, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { getAuthStatus } from "~/utils/auth.server"; // You need to implement this function
import Layout from "./components/Layout";
import "./tailwind.css";

// Loader function to check authentication status
export const loader: LoaderFunction = async ({ request }) => {
  const authStatus = await getAuthStatus(request);

  // Pass authentication status to the client
  return json({ authStatus });
};

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

// Document component
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

// Main App component
export default function App() {

  return (
    <Document>
      <Layout />
    </Document>
  );
}

// ErrorBoundary component
export function ErrorBoundary() {
  const error = useRouteError() as Error;

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center py-8  bg-red-50">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something wentkhkh wrong.</h1>
        <p className="text-lg text-gray-700 mb-2">Status: {error.status}</p>
        <p className="text-gray-600">{error.data.message || "An unexpected error occurred."}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          Go back to Home
        </Link>
      </div>
    );
  }
  return (
    <div className="p-6 bg-red-100 rounded shadow">
      <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="text-red-500 mt-2">{error?.message}</p>
      <Link to="/" className="text-blue-500 underline">Go back to Home</Link>
    </div>
  );
}
