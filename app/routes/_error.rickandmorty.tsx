import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { conform, useForm } from "@conform-to/react";
import { Form } from "@remix-run/react";

interface Character {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }[];
}

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const searchString = searchParams.get("name");
  let characterUrl = new URL("https://rickandmortyapi.com/api/character");
  if (searchString) {
    const characterSearchParams = new URLSearchParams({ name: searchString });
    characterUrl.search = characterSearchParams.toString();
  }

  const characterResponse = await fetch(characterUrl);

  if (!characterResponse.ok) {
    if (characterResponse.status === 404) {
      return json({ imageUrls: [] });
    }
    throw new Response("Rick and Morty API Error", { status: 404 });
  }
  const characterJson: Character = await characterResponse.json();

  const imageUrls = characterJson.results.map((char) => ({
    image: char.image,
    name: char.name,
  }));

  return json({ imageUrls });
};

export default function RickAndMorty() {
  const data = useLoaderData<typeof loader>();
  const [form, { name }] = useForm({
    id: "characterNameSearch",
  });

  return (
    <div className="mx-auto w-5/6 py-20">
      <Form
        {...form.props}
        className="mx-auto mb-10 flex justify-between gap-1 rounded border-2 border-gray-400 px-4 py-4 lg:w-2/3"
      >
        <label
          htmlFor={name.id}
          className="flex flex-wrap content-center font-semibold text-gray-200"
        >
          Name
        </label>
        <input
          {...conform.input(name, { type: "text" })}
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-gray-200 hover:bg-blue-700 focus:bg-blue-500">
          Search
        </button>
      </Form>
      <div className="flex flex-wrap content-between justify-around gap-y-10">
        {data.imageUrls.map((url) => (
          <div
            key={url.image}
            className="rounded border-2 border-gray-400 px-2 py-2"
          >
            <h1 className="text-2xl font-semibold text-gray-200">{url.name}</h1>
            <img
              alt={url.name}
              src={url.image}
              className="h-[300px] w-[300px]"
            />
          </div>
        ))}
        {data.imageUrls.length === 0 && (
          <h1 className="text-3xl text-gray-200">
            No Rick and Morty Images Match Your Search
          </h1>
        )}
      </div>
    </div>
  );
}
