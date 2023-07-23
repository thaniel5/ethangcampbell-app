import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Index() {
  return (
    <div className="mx-auto pt-8 lg:pt-40">
      <h1 className="text-6xl font-semibold">
        <div>Ethan Campbell</div>
        <div>Web Dev</div>
      </h1>
      <div className="pt-16">
        <p>
          I am a professional web developer focused on high quality user
          experiences.
          <br />
          Security and testing are always a high priority and included in all of
          my work.
        </p>
        <p className="pt-6">
          The github repo for this site is located at
          <Button asChild variant="link">
            <Link to="https://github.com/thaniel5/ethangcampbell-app">
              https://github.com/thaniel5/ethangcampbell-app
            </Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
