"use client";
import React, { useEffect } from "react";
import CreateBoardModal from "../modal/CreateBoardModal";
import { useCreateBoardModal } from "@/hooks/useCreateBoardModal";

const CreateBoard = () => {
  const { isOpen, onClose, onOpen } = useCreateBoardModal();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-white">
      <CreateBoardModal />
      <h1 className="p-4 text-xl">
        No Board Found! Please Create A Board To Continue!
      </h1>
    </div>
  );
};

export default CreateBoard;
