"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCreateBoardModal } from "@/hooks/useCreateBoardModal";

const CreateBoardButton = () => {
  const { onOpen } = useCreateBoardModal();
  return (
    <Button size="sm" variant="default" onClick={onOpen}>
      Create
    </Button>
  );
};

export default CreateBoardButton;
