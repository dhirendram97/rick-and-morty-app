import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Character } from "../types";

interface Props {
  data: Character[];
  columns: ColumnDef<Character>[];
}

export default function CharacterTable({ data, columns }: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-auto w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="py-2 px-4 border bg-gray-100 border-gray-200 text-left font-medium">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-2 px-4 border border-gray-200">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
             ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
