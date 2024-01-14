"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, X } from "lucide-react";
import { CreateListForm } from "../form/CreateListForm";

const CreateListButton = () => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-sm h-fit ">
        <CreateListForm setIsEditing={setIsEditing} />
      </div>
    );
  } else {
    return (
      <div>
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          size="icon"
          className="w-full p-2  rounded-sm flex justify-center text-xl gap-2"
        >
          <Plus />
          Add a List
        </Button>
      </div>
    );
  }
};

export default CreateListButton;
