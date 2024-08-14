"use server";

import { updateProfile } from "@/data-access/profiles";
import { Profile } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export async function updateProfileAction(
  state: Profile,
  formData: FormData,
): Promise<Profile> {
  "use server";
  const user = await getCurrentUser();
  if (!user) return redirect("/sign-in");
  const displayName = formData.get("display_name") as string;
  await updateProfile(user.id, {
    displayName: displayName,
  });
  return { ...structuredClone(state), displayName };
}
