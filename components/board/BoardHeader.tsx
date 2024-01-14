import React, { ElementRef, useEffect, useRef, useState } from "react";
import BoardOptionsPopover from "./BoardOptionsPopover";
import { Input } from "../ui/input";
import { updateBoard } from "@/actions/board/updateBoard";
import { toast } from "sonner";

interface BoardHeaderProps {
  boardId: string;
  boardName: string;
}

const BoardHeader = ({ boardId, boardName }: BoardHeaderProps) => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(boardName);

  const onEditComplete = async () => {
    const res = await updateBoard(boardId, name);
    setIsEditing(false);
    toast(res.message);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, isEditing]);

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 bg-white/70 cursor-pointer">
      {isEditing ? (
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={onEditComplete}
          className="bg-transparent outline-none focus:outline-none border-none focus-visible:ring-0 w-fit text-xl h-4"
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="text-xl font-bold capitalize"
        >
          {boardName}
        </div>
      )}
      <BoardOptionsPopover />
    </div>
  );
};

export default BoardHeader;
