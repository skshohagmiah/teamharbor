"use client";
import React from "react";
import { Button } from "./ui/button";
import { useSignInModal } from "@/hooks/useSignInModal";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

interface SignOutButtonProps {
  label: string;
}

const SignOutButton = ({ label }: SignOutButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/", redirect: true })}
      className={cn(
        "flex gap-2 justify-start px-6 mx-auto text-lg w-full md:mx-0 hover:opacity-50 transition"
      )}
      size="sm"
    >
      <div>
        <IoIosLogOut className="w-6 h-6" />
      </div>
      {label}
    </Button>
  );
};

export default SignOutButton;
