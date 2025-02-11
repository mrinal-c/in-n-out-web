// components/ExpenseTable.js
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
import Link from "next/link";

export function TransactionTable({ tableData, ...props }) {
  const data = useMemo(() => {
    return Object.entries(tableData).map(([key, value]) => ({
      category: key,
      id: key,
      amount: value,
    }));
  }, [tableData]);

  const columns = [
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ cell, row }) => {
        return <div>{cell.getValue()}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ cell, row }) => {
        return <div>{cell.getValue()}</div>;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-6">
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
                className={
                  row.original.category === "Total"
                    ? "font-bold bg-gray-200"
                    : ""
                }
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {
        tableData && Object.keys(tableData).length === 1 && (
          <p className="text-center text-gray-500">
            Looks like you haven't set up any categories to track transactions. Set them up in the <Link href="/settings" className="underline">Settings</Link> page.
          </p>
        )
      }
    </div>
  );
}
