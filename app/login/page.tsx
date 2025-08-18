"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function LoginPage() {
    return (
        <form>
            <Label>Email</Label>
            <Input />
            <Label>Password</Label>
            <Input />
            <Button>Login</Button>
        </form>
    );
}
