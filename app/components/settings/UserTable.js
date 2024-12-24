"use client";
import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserTable } from "@/redux/slices/userSlice";

export const UserTable = ({ isOut, ...props }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { outTable, inTable } = user;
  const data = useMemo(() => {
    //if outTable is undefined, return empty array
    let table = isOut ? outTable : inTable;
    if (!table) return [];
    return table.map((row, index) => ({
      ...row,
      id: index,
    }));
  }, [outTable, inTable, isOut]);

  const deleteRow = (index) => {
    const table = isOut ? outTable : inTable;
    dispatch(
      updateUserTable(
        {
        table: table.filter((_, i) => i !== index),
        isOut
        }
      )
    );
  };

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
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {cell.getValue("tags").map((tag, index) => (
                <div
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded-md"
                  key={index}
                >
                  {tag}
                </div>
              ))}
            </div>

            <AlertDialog>
              <AlertDialogTrigger>
                <Trash />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  This will permanently remove the category from aggregating
                  data in your tables.
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => deleteRow(row.original.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
