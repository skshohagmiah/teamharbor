"use client";
import React from "react";
import { Button } from "./ui/button";
import { useSignInModal } from "@/hooks/useSignInModal";
import { cn } from "@/lib/utils";

interface SignInbuttonProps {
  label: string;
  padding?: string;
}

const SignInbutton = ({ label, padding }: SignInbuttonProps) => {
  const { onOpen } = useSignInModal();
  return (
    <Button
      onClick={onOpen}
      className={cn("mx-auto md:mx-0 hover:opacity-50 transition", padding)}
      size="sm"
    >
      {label}
    </Button>
  );
};

export default SignInbutton;
