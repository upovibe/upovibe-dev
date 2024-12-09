"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirection
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  ChevronDown,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
  Eye,
  SquarePen,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

// Define generic types for TableLayout
type TableLayoutProps<T> = {
  data: T[];
  title: string;
  deleteRow: (id: number) => Promise<void>;
};

const TableLayout = <T extends { id: number; name: string; slug: string }>({
  data,
  title,
  deleteRow,
}: TableLayoutProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [tableData, setTableData] = useState(data);
  const router = useRouter();

  const addRowUrl = `/dashboard/${title.toLowerCase()}/new`;

  const handleDelete = async (id: number) => {
    try {
      await deleteRow(Number(id));
      setTableData((prev) => prev.filter((row) => row.id !== id));
      toast.success("Successful.");
    } catch (error) {
      console.error("Error deleting row:", error);
      toast.error("Error occurred.");
    }
  };

  //   const deleteSelectedRows = async () => {
  //     const selectedIds = Object.keys(rowSelection)
  //       .filter((key) => rowSelection[key])
  //       .map(Number); // Ensure IDs are numbers

  //     if (selectedIds.length === 0) return;

  //     try {
  //       for (const id of selectedIds) {
  //         await deleteRow(id); // Use the numeric ID
  //       }

  //       setTableData((prev) =>
  //         prev.filter((row) => selectedIds.includes(Number(row.id)))
  //       );

  //       setRowSelection({});
  //       toast.success("Successful.");
  //     } catch (error) {
  //       console.error("Error deleting selected rows:", error);
  //       toast.error("Error occurred.");
  //     }
  //   };

  // const columns: ColumnDef<T>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     cell: ({ row }) => row.getValue("id"),
  //   },
  //   {
  //     accessorKey: "name",
  //     header: ({ column }) => (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Name <ArrowUpDown />
  //       </Button>
  //     ),
  //     cell: ({ row }) => (
  //       <Link
  //         href={`/dashboard/${title.toLowerCase()}/${row.original.slug}`}
  //         className="text-blue-600 hover:underline capitalize"
  //       >
  //         {row.getValue("name")}
  //       </Link>
  //     ),
  //   },
  //   {
  //     accessorKey: "slug",
  //     header: "Slug",
  //     cell: ({ row }) => row.getValue("slug"),
  //   },
  //   {
  //     id: "actions",
  //     header: "Actions",
  //     cell: ({ row }) => (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem>
  //             <Link
  //               href={`/dashboard/${title.toLowerCase()}/${row.original.slug}`}
  //               className="w-full flex items-center gap-2 hover:text-green-500 transition-all duration-100 ease-linear"
  //             >
  //               <Eye className="size-4" />
  //               View
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Link
  //               href={`/dashboard/${title.toLowerCase()}/${
  //                 row.original.slug
  //               }/edit`}
  //               className="w-full flex items-center gap-2 hover:text-blue-500 transition-all duration-100 ease-linear"
  //             >
  //               <SquarePen className="size-4" />
  //               Edit
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <div
  //               onClick={() => handleDelete(row.original.id)}
  //               className="text-red-600 w-full cursor-pointer flex items-center gap-2 hover:text-red-600 transition-all duration-200 ease-linear"
  //             >
  //               <Trash2 className="size-4" />
  //               Delete
  //             </div>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     ),
  //   },
  // ];

  // const columns: ColumnDef<T>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     cell: ({ row }) => row.getValue("id"),
  //   },
  //   {
  //     accessorKey: "title", // Add Title
  //     header: "Title",
  //     cell: ({ row }) => row.getValue("title"),
  //   },
  //   {
  //     accessorKey: "description", // Add Description
  //     header: "Description",
  //     cell: ({ row }) => (
  //       <div className="truncate max-w-xs" title={row.getValue("description")}>
  //         {row.getValue("description")}
  //       </div>
  //     ),
  //   },
  //   {
  //     accessorKey: "createdAt", // Add Created At
  //     header: "Created At",
  //     cell: ({ row }) => {
  //       const createdAt = new Date(row.getValue("createdAt"));
  //       return createdAt.toLocaleDateString(); // Format as needed
  //     },
  //   },
  //   {
  //     id: "actions",
  //     header: "Actions",
  //     cell: ({ row }) => (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem>
  //             <Link
  //               href={`/dashboard/${title.toLowerCase()}/${row.original.slug}`}
  //               className="w-full flex items-center gap-2 hover:text-green-500 transition-all duration-100 ease-linear"
  //             >
  //               <Eye className="size-4" />
  //               View
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Link
  //               href={`/dashboard/${title.toLowerCase()}/${row.original.slug}/edit`}
  //               className="w-full flex items-center gap-2 hover:text-blue-500 transition-all duration-100 ease-linear"
  //             >
  //               <SquarePen className="size-4" />
  //               Edit
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <div
  //               onClick={() => handleDelete(row.original.id)}
  //               className="text-red-600 w-full cursor-pointer flex items-center gap-2 hover:text-red-600 transition-all duration-200 ease-linear"
  //             >
  //               <Trash2 className="size-4" />
  //               Delete
  //             </div>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     ),
  //   },
  // ];
  
  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.getValue("id"),
    },
    {
      accessorKey: "title", // Add Title
      header: "Title",
      cell: ({ row }) => row.getValue("title"),
    },
    {
      accessorKey: "description", // Add Description
      header: "Description",
      cell: ({ row }) => (
        <div className="truncate max-w-xs" title={row.getValue("description")}>
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "categories", // Add Categories
      header: "Categories",
      cell: ({ row }) => {
        const categories = row.getValue("categories") as { name: string }[];
        return categories?.length
          ? categories.map((category) => category.name).join(", ")
          : "None";
      },
    },
    {
      accessorKey: "createdAt", // Add Created At
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = new Date(row.getValue("createdAt"));
        return createdAt.toLocaleDateString(); // Format as needed
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/${title.toLowerCase()}/${row.original.slug}`}
                className="w-full flex items-center gap-2 hover:text-green-500 transition-all duration-100 ease-linear"
              >
                <Eye className="size-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/${title.toLowerCase()}/${row.original.slug}/edit`}
                className="w-full flex items-center gap-2 hover:text-blue-500 transition-all duration-100 ease-linear"
              >
                <SquarePen className="size-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div
                onClick={() => handleDelete(row.original.id)}
                className="text-red-600 w-full cursor-pointer flex items-center gap-2 hover:text-red-600 transition-all duration-200 ease-linear"
              >
                <Trash2 className="size-4" />
                Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between space-x-5">
        <Input
          placeholder={`Filter by name...`}
          value={(table.getColumn("title")?.getFilterValue() as string) || ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 hover:text-green-500 transition-all duration-200 ease-linear">
          <Button
            onClick={() => router.push(addRowUrl)}
            className="flex items-center gap-1"
          >
            <PlusSquare className="" />
            <span className="hidden md:inline-block">Add {title}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button
          variant="destructive"
          onClick={deleteSelectedRows}
          disabled={Object.keys(rowSelection).length === 0}
        >
          Delete Selected
        </Button> */}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No {title.toLowerCase()} found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
            <span className="hidden md:inline-block">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="hidden md:inline-block">Next</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
