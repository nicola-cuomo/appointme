"use client";

import { Profile } from "@/db/schema";
import { useFormState, useFormStatus } from "react-dom";
import { updateProfileAction } from "./actions";
import { SaveButton } from "@/components/ui/saveButton";

export default function Form({ profile }: { profile: Profile }) {
    const [state, dispatch] = useFormState(updateProfileAction, profile);

    return (
        <form action={dispatch}>
            <label className="block">
                <span className="text-gray-700">Display Name</span>
                <input
                    type="text"
                    name="display_name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
                    defaultValue={state.displayName}
                />
            </label>
            <SaveButton />
        </form>
    );
}