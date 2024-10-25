import { getProfile } from "@/data-access/profiles";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import ProfileForm from "./ProfileForm";
import { getUserById } from "@/lib/user";
import { getAccountByUserId } from "@/data-access/accounts";

export default async function ProfilePage(context: {
  searchParams: Promise<{ userId: any }>;
}) {
  let userId = Number((await context.searchParams).userId);
  const loggedUser = await getCurrentUser();
  if (!loggedUser) return redirect("/sign-in");

  let user: any = await getUserById(loggedUser.id);

  if (!user) return redirect("/404");

  if (userId && user.role == "admin") user = await getUserById(userId);
  else userId = loggedUser.id;
  user["userId"] = userId;
  const profile = await getProfile(userId);

  return (
    <div>
      <ProfileForm profile={profile!} user={user} userLogged={loggedUser} />
    </div>
  );
}
