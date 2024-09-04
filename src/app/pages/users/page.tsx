import { getCurrentUser } from "@/lib/session";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getOtherUsers } from "@/lib/user";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DemoPage() {
  const user = await getCurrentUser();
  if (!user) return redirect("/sign-in");

  if (user.role !== "admin") return redirect("/");

  const data = await getOtherUsers(user.id);

  return (
    <Card className="w-all">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
