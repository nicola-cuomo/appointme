"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending}
            variant="destructive"
            type="submit"
        >
            {pending ? 'Saving...' : 'Save'}
        </Button>)
}