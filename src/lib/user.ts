import { db } from "@/db";
import { profiles, Role, users } from "@/db/schema";
import { and, eq, inArray, ne } from "drizzle-orm";
import { User } from "lucia";
import "server-only";

function getInRoleCondition(role: Role): Role[] {
  switch (role) {
    case "admin":
      return ["user", "admin", "client"];
    case "client":
      return ["user", "client"];
    default:
      return [];
  }
}

export function getOtherUsers(userId: number): any {
  return db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      username: profiles.displayName,
    })
    .from(users)
    .leftJoin(profiles, eq(users.id, profiles.userId))
    .where(ne(users.id, userId));
}

export async function getUserById(
  id: number,
): Promise<{ email: string; role: Role } | undefined> {
  return (
    await db
      .select({ email: users.email, role: users.role })
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
  )[0];
}

export async function updateUserRole(id: number, role: Role): Promise<void> {
  await db.update(users).set({ role }).where(eq(users.id, id));
}
