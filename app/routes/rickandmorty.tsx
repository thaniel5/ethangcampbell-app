import { json, type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Form } from "@remix-run/react";
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
      <Form className="mx-auto flex justify-between gap-3 rounded border-2 border-gray-400 px-4 py-4 lg:w-2/3">
        <label className="flex flex-wrap content-center font-semibold text-gray-200">
          Name
        </label>
        <input
          type="text"
          name="name"
          defaultValue={data.searchString ?? ""}
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        />
        <input type="hidden" name="page" value="1" />
        <button className="rounded bg-blue-600 px-4 py-2 text-gray-200 hover:bg-blue-700 focus:bg-blue-500">
          Search
        </button>
      </Form>
      {data.info.count > 0 ? (
        <>
          <div className="mx-auto flex w-full py-4 lg:w-2/3">
            <div className="flex flex-1 flex-wrap content-center justify-start text-gray-200">{`Page ${page} of ${data.info.pages}`}</div>
            <div className="flex gap-3">
              <Link
                to={`?${prevSearchParams.toString()}`}
                className={`rounded px-4 py-2 text-gray-200 hover:bg-gray-400${
                  page <= 1
                    ? " pointer-events-none bg-gray-600"
                    : " bg-gray-500"
                }`}
              >
                &lt;
              </Link>
              <Link
                to={`?${nextSearchParams.toString()}`}
                className={`rounded px-4 py-2 text-gray-200 hover:bg-gray-400${
                  page >= data.info.pages
                    ? " pointer-events-none bg-gray-600"
                    : " bg-gray-500"
                }`}
              >
                &gt;
              </Link>
            </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex flex-wrap content-between justify-around gap-y-10">
            {data.characters.map((character) => (
              <div
                key={character.image}
                className="rounded border-2 border-gray-400 px-2 py-2"
              >
                <h1 className="text-2xl font-semibold text-gray-200">
                  {character.name}
                </h1>
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
        <h1 className="py-24 text-3xl text-gray-200">
          No Rick and Morty Images Match Your Search
        </h1>
      )}
    </div>
  );
}
