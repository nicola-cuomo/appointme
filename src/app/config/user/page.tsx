import { getCurrentUser } from "@/lib/session";
import { getOtherUsersByRole, getUserById } from "@/lib/user";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getCurrentUser();
    if (!user) return redirect("/sign-in");

    const users = await getOtherUsersByRole(user.id, user.role);

    return (
        <div>
            <h1>User</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link href={`/config/user/${user.id}`} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
                                    {user.email}
                                </Link>
                            </td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}