import { getProfile } from "@/data-access/profiles";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Form from "./form";

export default async function Page() {
    const user = await getCurrentUser();
    if (!user) redirect("/sign-in");

    const profile = await getProfile(user.id);

    if (!profile) return <div>Profile not found</div>;

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between py-8">
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">Profile</div>
                </div>
            </div>
            <p>{`Role: ${user.role}`}
            </p>
            <Form profile={profile} />
        </div >
    );
}