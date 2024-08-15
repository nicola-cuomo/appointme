import { SaveButton } from "@/components/ui/saveButton";
import { Role, roleEnum } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getUserById, updateUserRole } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function Page({ params: { userId } }: { params: { userId: number } }) {
    const loggedUser = await getCurrentUser();
    if (!loggedUser) return redirect("/sign-in");

    const user = await getUserById(userId);

    if (!user) return redirect("/404");

    return (
        <div>
            <h1>{user.email}</h1>
            <form action={async (formData: FormData) => {
                "use server"
                await updateUserRole(userId, formData.get("role") as Role);
                lucia.invalidateUserSessions(userId);
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
                <SaveButton />
            </form>
        </div >
    );
}