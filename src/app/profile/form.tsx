"use client";

import { Profile } from "@/db/schema";
import { useFormState, useFormStatus } from "react-dom";
import { updateProfileAction } from "./actions";

function Button() {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending}
            type="submit"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {pending ? 'Saving...' : 'Save'}
        </button>)
}

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
            <Button />
        </form>
    );
}