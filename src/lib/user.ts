import { db } from "@/db";
import { Role, users } from "@/db/schema";
import { and, eq, inArray, ne } from "drizzle-orm";
import "server-only";

function getInRoleCondition(role: Role): Role[] {
  switch (role) {
    case "admin":
      return ["user", "admin", "client"];
    case "client":
      return ["user", "client"];
    default:
    case "user":
      return ["user"];
  }
}

export function getOtherUsersByRole(
  userId: number,
  role: Role,
): Promise<{ id: number; email: string; role: string }[]> {
  const inRoleCondition = getInRoleCondition(role);
  return db
    .select({ id: users.id, email: users.email, role: users.role })
    .from(users)
    .where(and(inArray(users.role, inRoleCondition), ne(users.id, userId)));
}

export async function getUser(
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
