"use client";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateBoardModal } from "@/hooks/useCreateBoardModal";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { IMAGES } from "@/constants/imageData";
import Image from "next/image";
import { BoardForm } from "../form/CreateBoardForm";
import { cn } from "@/lib/utils";

const CreateBoardModal = () => {
  const { isOpen, onClose, onOpen } = useCreateBoardModal();
  const [selectedImage, setSelectdImage] = useState("");

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-center">Create Board</h2>
            </DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {IMAGES.map((image) => (
                  <div
                    key={image}
                    className={cn(
                      "relative w-[9rem] h-[5rem]",
                      selectedImage === image && "opacity-60"
                    )}
                    onClick={() => setSelectdImage(image)}
                  >
                    <Image
                      src={image}
                      alt="background"
                      fill
                      className="rounded-md overflow-hidden object-cover"
                    />
                    {selectedImage === image && (
                      <div className="absolute top-[30%] left-[30%]">
                        <Check className="w-10 h-10 text-black" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <BoardForm image={selectedImage} />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBoardModal;
