export interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Array<{
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
  }>;
}

export async function getCharacters(
  page: number | null,
  searchString: string | null,
): Promise<CharacterResponse> {
  const characterSearchParams = new URLSearchParams();
  const characterUrl = new URL("https://rickandmortyapi.com/api/character");
  if (page) {
    characterSearchParams.set("page", `${page}`);
  }
  if (searchString) {
    characterSearchParams.set("name", searchString);
  }
  characterUrl.search = characterSearchParams.toString();

  const characterResponse = await fetch(characterUrl);
  if (!characterResponse.ok) {
    if (characterResponse.status === 404) {
      return {
        results: [],
        info: { count: 0, pages: 0, prev: "", next: "" },
      };
    }
    throw new Response("Rick and Morty API Error", { status: 404 });
  }
  return characterResponse.json();
}
