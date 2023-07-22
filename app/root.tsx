import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { type PropsWithChildren } from "react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

function Document({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Ethan Campbell - Web Dev</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-700">
        <header className="w-full py-5 font-semibold text-gray-300">
          <div className="flex justify-center gap-7">
            <NavLink to="/" className="hover:text-green-500">
              Home
            </NavLink>
            <NavLink to="rickandmorty" className="hover:text-green-500">
              Rick and Morty
            </NavLink>
            <NavLink to="about" className="hover:text-green-500">
              About
            </NavLink>
          </div>
        </header>
        <main className="text-center">{children}</main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
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

  return (
    <Document>
      <div className="py-40 text-gray-200">{content}</div>
    </Document>
  );
}
