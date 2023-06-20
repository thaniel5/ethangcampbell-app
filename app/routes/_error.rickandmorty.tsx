import { json, type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { getCharacters } from "~/models/character.server";

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const searchString = searchParams.get("name") || "";
  const page = searchParams.get("page") || "1";
  const characterJson = await getCharacters(page, searchString);
  const characters = characterJson.results.map((char) => ({
    image: char.image,
    name: char.name,
  }));
  return json({ characters, info: characterJson.info });
};

export default function RickAndMorty() {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const name = searchParams.get("name");
  const nextSearchParams = new URLSearchParams();
  const prevSearchParams = new URLSearchParams();
  if (name) {
    nextSearchParams.set("name", name);
    prevSearchParams.set("name", name);
  }
  const isNumber = /[1-9]\d*/.test(page);
  if (isNumber) {
    const pageNum = parseInt(page, 10);
    nextSearchParams.set(
      "page",
      `${pageNum + 1 < data.info.pages ? pageNum + 1 : data.info.pages}`
    );
    prevSearchParams.set("page", `${pageNum - 1 > 0 ? pageNum - 1 : 1}`);
  } else {
    nextSearchParams.set("page", "2");
    prevSearchParams.set("page", "1");
  }

  return (
    <div className="mx-auto w-5/6 pt-8 lg:py-20">
      <Form className="mx-auto flex justify-between gap-1 rounded border-2 border-gray-400 px-4 py-4 lg:w-2/3">
        <label className="flex flex-wrap content-center font-semibold text-gray-200">
          Name
        </label>
        <input className="w-full rounded border border-gray-500 px-2 py-1 text-lg" />
        <input type="hidden" name="page" value="1" />
        <button className="rounded bg-blue-600 px-4 py-2 text-gray-200 hover:bg-blue-700 focus:bg-blue-500">
          Search
        </button>
      </Form>
      <div className="mx-auto flex w-full py-4 lg:w-2/3">
        <div className="flex flex-1 flex-wrap content-center justify-start text-gray-200">{`Page ${page} of ${data.info.pages}`}</div>
        <div className="flex gap-3">
          <Link
            className="rounded bg-gray-500 px-4 py-2 text-gray-200 hover:bg-gray-400"
            to={`?${prevSearchParams.toString()}`}
          >
            &lt;
          </Link>
          <Link
            className="rounded bg-gray-500 px-4 py-2 text-gray-200 hover:bg-gray-400"
            to={`?${nextSearchParams.toString()}`}
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
        {data.info.count === 0 && (
          <h1 className="text-3xl text-gray-200">
            No Rick and Morty Images Match Your Search
          </h1>
        )}
      </div>
    </div>
  );
}
