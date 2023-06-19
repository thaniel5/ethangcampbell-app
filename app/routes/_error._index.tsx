import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="mx-auto py-40">
      <h1 className="text-6xl font-semibold text-gray-100">
        <div>Ethan Campbell</div>
        <div className="text-green-500">Web Dev</div>
      </h1>
      <div className="pt-16 text-gray-200">
        <p>
          I am a professional web developer focused on high quality user
          experiences.
          <br />
          Security and testing are always a high priority and included in all of
          my work.
        </p>
        <p className="pt-6">
          The github repo for this site is located at{" "}
          <Link
            to="https://github.com/thaniel5/ethangcampbell-app"
            className="text-blue-500 hover:text-blue-700"
          >
            https://github.com/thaniel5/ethangcampbell-app
          </Link>
        </p>
      </div>
    </div>
  );
}
