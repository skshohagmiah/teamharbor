"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSignInModal } from "@/hooks/useSignInModal";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";


const SignInModal = () => {
  const { isOpen, onClose } = useSignInModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2>Sign In</h2>
            <p className="text-sm font-light">to continue to TeamHarbor</p>
          </DialogTitle>
          <DialogDescription>
            <Button
            onClick={() => signIn('google')}
              className="w-full flex items-center gap-4 text-lg font-medium bg-blue-600 text-white mt-2"
              variant="outline"
              size="lg"
            >
              <FaGoogle />
              Sign In With Google
            </Button>
            <Button 
            onClick={() => signIn('github')}
              className="w-full flex items-center gap-4 text-lg font-medium text-white bg-black mt-2"
              variant="outline"
              size="lg"
            >
              <FaGithub />
              Sign In With GitHub
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
