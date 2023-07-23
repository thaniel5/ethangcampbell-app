import { Link } from "@remix-run/react";

import { Button } from "~/components/ui/button";

export default function About() {
  return (
    <div className="mx-auto w-5/6 py-8 lg:w-1/3 lg:py-40">
      <h1 className="text-6xl font-semibold">
        <div>About Me</div>
      </h1>
      <div className="pt-16">
        <p>
          My name is Ethan Campbell. I am a professional web developer living in
          Carmel, Indiana. I have been working for almost a decade in various
          sectors including finance, automotive, and healthcare. I graduated
          from Rose-Hulman Institute of Technology with a double major in
          Computer Science and Software Engineering. I also have minors in
          Economics and Mathematics. I play a dozen instruments and sing, I have
          travelled to a dozen countries, and enjoy board games. I am married
          and have a wonderful son who is still a toddler.
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
