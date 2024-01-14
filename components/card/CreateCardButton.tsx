"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, X } from "lucide-react";
import { CreateListForm } from "../form/CreateListForm";
import { CreateCardForm } from "../form/CreateCardForm";

const CreateCardButton = ({ listId }: { listId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-sm h-fit ">
        <CreateCardForm setIsEditing={setIsEditing} listId={listId || ""} />
      </div>
    );
  } else {
    return (
      <div>
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          size="sm"
          className="p-4 rounded-sm text-lg hover:bg-white/90 text-black flex gap-2 bg-transparent"
        >
          <Plus />
          Add a Card
        </Button>
      </div>
    );
  }
};

export default CreateCardButton;
