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
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
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
        <main className="text-center">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
