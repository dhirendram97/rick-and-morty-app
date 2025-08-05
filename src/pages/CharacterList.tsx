import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api/client";
import { useState } from "react";
import CharacterTable from "../components/CharacterTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import type { Character } from "../types";

export default function CharacterList() {
  const [page, setPage] = useState(() => {
    const stored = localStorage.getItem("currentPage");
    return stored ? parseInt(stored) : 1;
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
    staleTime: 5000,
  });

  const columns: ColumnDef<Character>[] = [
    {
      header: "Image",
      cell: (info) => <img src={info.row.original.image} alt="" className="w-12 h-12 rounded" />,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => (
        <Link to={`/character/${info.row.original.id}`} className="text-blue-600 underline">
          {info.getValue() as string}
        </Link>
      ),
    },
    { header: "Status", accessorKey: "status" },
    { header: "Species", accessorKey: "species" },
    { header: "Gender", accessorKey: "gender" },
  ];

  const totalPages = data?.info.pages || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    localStorage.setItem("currentPage", newPage.toString());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium">Character List</h1>
        <div className="flex items-center ml-auto gap-4">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className={`px-4 py-2 rounded text-white text-sm transition ${
              isFetching ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
          <span>
            Page: {page} / {totalPages}
          </span>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CharacterTable data={data.results} columns={columns} />
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
