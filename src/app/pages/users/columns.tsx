"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { ArrowBigRightIcon, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/dist/client/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersColumns = {
  id: string;
  username: string;
  email: string;
  role: string;
  update: Icon;
  delete: Icon;
};

export const columns: ColumnDef<UsersColumns>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div>
          <Link
            href={{
              pathname: "/pages/users/profile",
              query: {
                userId: user.id,
              },
            }}
          >
            <ArrowBigRightIcon />
          </Link>
        </div>
      );
    },
  },
];
