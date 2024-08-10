import { Role, roleEnum } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { getUser, updateUserRole } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function Page({ params: { userId } }: { params: { userId: number } }) {
    const loggedUser = await getCurrentUser();
    if (!loggedUser) return redirect("/sign-in");

    const user = await getUser(userId);

    if (!user) return redirect("/404");

    return (
        <div>
            <h1>{user.email}</h1>
            <form action={async (formData: FormData) => {
                "use server"
                await updateUserRole(userId, formData.get("role") as Role);
                return redirect("/config/user");
            }}>
                <select defaultValue={user.role} name="role">
                    {roleEnum.enumValues.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Save</button>
            </form>
        </div >
    );
}