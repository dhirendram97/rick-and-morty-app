import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../api/client";
import { IoArrowBackOutline } from "react-icons/io5";

export default function CharacterDetails() {
  const { id } = useParams({ from: "/character/$id" });

  const { data, isLoading } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id),
  });

  return (
    <>
      <h1 className="text-2xl mb-4 font-medium flex items-center gap-2">
        <Link className="hover:text-blue-500" to={'/'}><IoArrowBackOutline size={22} /></Link>
        Character Details
      </h1>
      {
        isLoading ? <p>Loading...</p> : <div className="p-4 border flex border-gray-200 rounded shadow">
          <img src={data.image} alt={data.name} className="w-32 h-32 rounded-full mb-4" />
          <div className="ml-4">
            <h2 className="text-xl font-medium">{data.name}</h2>
            <p><span className="font-regular me-2 text-gray-500">Status:</span> {data.status}</p>
            <p><span className="font-regular me-2 text-gray-500">Species:</span> {data.species}</p>
            <p><span className="font-regular me-2 text-gray-500">Gender:</span> {data.gender}</p>
            <p><span className="font-regular me-2 text-gray-500">Origin:</span> {data.origin.name}</p>
            <p><span className="font-regular me-2 text-gray-500">Location:</span> {data.location.name}</p>
          </div>
        </div>

      }

    </>
  );
}
