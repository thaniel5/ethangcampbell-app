import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

export const loader = async () => {
  const characterResponse = await fetch(
    "https://rickandmortyapi.com/api/character"
  );

  if (!characterResponse.ok) {
    throw new Response("No Rick and Morty Images Found", { status: 404 });
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

  return (
    <div className="flex flex-wrap content-between justify-around gap-y-10">
      {data.imageUrls.map((url) => (
        <div key={url.image}>
          <h1 className="text-2xl font-semibold">{url.name}</h1>
          <img alt={url.name} src={url.image} className="h-[300px] w-[300px]" />
        </div>
      ))}
    </div>
  );
}
