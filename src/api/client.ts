export const fetchCharacters = async (page: number) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
};

export const fetchCharacterById = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error("Failed to fetch character");
  return res.json();
};
