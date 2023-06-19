import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function Public() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  let content = null;

  if (isRouteErrorResponse(error)) {
    content = (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    content = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    content = <h1>Unknown Error</h1>;
  }

  return <div className="py-40 text-gray-200">{content}</div>;
}
