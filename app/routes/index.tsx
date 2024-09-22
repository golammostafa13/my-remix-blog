import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function MainLayout() {
  return (
    <div className="p-8 space-y-8">
      jd
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return <h1>Unknown error occurred</h1>;
}
