import { Button } from "@/components/ui/button";
import { deleteUser } from "@/data-access/users";
import { lucia } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getOtherUsers, getUserById } from "@/lib/user";
import { Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) return redirect("/sign-in");

  if (user.role !== "admin") return redirect("/");

  const users = await getOtherUsers(user.id);

  return (
    <div>
      <h1 className="pb-4 text-xl">User</h1>
      <table className="container mx-auto items-center justify-between">
        <thead className="border">
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="m-2 p-2">
                <Link
                  href={`/config/user/${user.id}`}
                  className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                >
                  {user.email}
                </Link>
              </td>
              <td className="">{user.role}</td>
              <td className="align-right">
                <Button
                  formAction={async () => {
                    "use server";
                    deleteUser(user.id);
                    revalidatePath("/config/user");
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 />
                </Button>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
