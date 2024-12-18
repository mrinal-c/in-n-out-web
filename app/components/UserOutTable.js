"use client";
import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const UserOutTable = ({ ...props }) => {
  const { user } = useAppSelector((state) => state.user);
  const outTable = user.outTable;
  const data = useMemo(() => {
    return Object.entries(outTable).map(([key, value]) => ({
      category: key,
      id: key,
      tags: value,
    }));
  }, [outTable]);

  const columns = [
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ cell, row }) => {
        return (
          <div className="flex flex-wrap gap-2">
            {cell.getValue("tags").map((tag, index) => (
              <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded-md" key={index}>{tag}</div>
            ))}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div {...props}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
