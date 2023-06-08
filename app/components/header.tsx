import { NavLink } from "@remix-run/react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-b-gray-200 bg-white py-5 text-sm font-semibold text-gray-600">
      <div className="flex justify-center gap-7">
        <NavLink to="/" className="hover:text-blue-600">
          Home
        </NavLink>
        <NavLink to="rickandmorty" className="hover:text-blue-600">
          Rick and Morty
        </NavLink>
        <NavLink to="about" className="hover:text-blue-600">
          About
        </NavLink>
      </div>
    </header>
  );
}
