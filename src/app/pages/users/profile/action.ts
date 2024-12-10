"use server";

import { updateProfile } from "@/data-access/profiles";
import { Role } from "@/db/schemaLogin";
import { unauthenticatedAction } from "@/lib/safe-action";
import { updateUserRole } from "@/lib/user";
import { z } from "zod";

export const editProfile = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      displayName: z.string(),
      bio: z.string(),
      userId: z.number(),
      role: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await updateProfile(input.userId, input);
    await updateUserRole(input.userId, input.role as Role);
  });
