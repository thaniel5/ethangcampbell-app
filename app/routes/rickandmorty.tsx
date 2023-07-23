import { json, type LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { getCharacters } from "~/models/character.server";

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const searchString = searchParams.get("name");
  const pageParam = searchParams.get("page");
  let page = null;
  if (pageParam !== null) {
    const isPositiveInt = /^[1-9]\d*$/.test(pageParam);
    if (isPositiveInt) {
      page = parseInt(pageParam, 10);
    } else {
      return json({
        characters: [],
        info: { count: 0, pages: 0, next: "", prev: "" },
        page: null,
        searchString,
      });
    }
  }
  const characterJson = await getCharacters(page, searchString);
  const characters = characterJson.results.map((char) => ({
    image: char.image,
    name: char.name,
  }));
  return json({ characters, info: characterJson.info, page, searchString });
};

export default function RickAndMorty() {
  const data = useLoaderData<typeof loader>();

  const prevSearchParams = new URLSearchParams();
  const nextSearchParams = new URLSearchParams();
  const page = data.page ?? 1;

  if (data.searchString) {
    prevSearchParams.set("name", data.searchString);
    nextSearchParams.set("name", data.searchString);
  }

  prevSearchParams.set("page", `${page - 1}`);
  nextSearchParams.set("page", `${page + 1}`);

  return (
    <div className="mx-auto w-5/6 pt-8 lg:py-20">
      <Form className="mx-auto flex justify-between gap-3 rounded border-2 bg-secondary px-4 py-4 text-secondary-foreground lg:w-2/3">
        <Label className="flex flex-wrap content-center font-semibold">
          Name
        </Label>
        <Input
          type="text"
          name="name"
          defaultValue={data.searchString ?? ""}
          className="w-full rounded border px-2 py-1 text-lg"
        />
        <input type="hidden" name="page" value="1" />
        <Button className="rounded px-4 py-2">Search</Button>
      </Form>
      {data.info.count > 0 ? (
        <>
          <div className="mx-auto flex w-full py-4 lg:w-2/3">
            <div className="flex flex-1 flex-wrap content-center justify-start">{`Page ${page} of ${data.info.pages}`}</div>
            <div className="flex gap-3">
              <Button asChild size="icon">
                {page > 1 ? (
                  <Link to={`?${prevSearchParams.toString()}`}>
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                ) : (
                  <button disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
              </Button>
              <Button asChild size="icon" disabled={page >= data.info.pages}>
                {page < data.info.pages ? (
                  <Link to={`?${nextSearchParams.toString()}`}>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button disabled>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </Button>
            </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex flex-wrap content-between justify-around gap-y-10">
            {data.characters.map((character) => (
              <div
                key={character.image}
                className="rounded border-2 bg-secondary px-2 py-2 text-secondary-foreground"
              >
                <h1 className="text-2xl font-semibold">{character.name}</h1>
                <img
                  alt={character.name}
                  src={character.image}
                  className="h-[300px] w-[300px]"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1 className="py-24 text-3xl">
          No Rick and Morty Images Match Your Search
        </h1>
      )}
    </div>
  );
}
