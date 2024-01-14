import React, { ElementRef, useEffect, useRef, useState } from "react";
import ListOptionsPopover from "./ListOptionsPopover";
import { Input } from "../ui/input";
import { updateListTitle } from "@/actions/list/updateListTitle";
import { toast } from "sonner";

interface ListHeaderProps{
    listId:string,
    boardId:string,
    name:string
  }

const ListHeader = ({listId,boardId,name}:ListHeaderProps) => {
    const inputRef = useRef<ElementRef<'input'>>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(name)
    
    const onEditComplete = async() => {
        const res = await updateListTitle(listId,boardId,title);
        setIsEditing(false)
        toast(res.message)
    }


    useEffect(() => {
        inputRef.current?.focus()
    }, [inputRef, isEditing])

  return (
    <div className="flex items-center justify-between w-full">
      {
        isEditing ?(
            <Input ref={inputRef} onBlur={onEditComplete} value={title} onChange={(e) => setTitle(e.target.value)} className="h-6 w-fit p-0 m-0 border-none text-xl focus-visible:ring-0 bg-transparent focus-visible:outline-none"/>
        ):(
            <div onClick={() => setIsEditing(true)} className="text-xl font-medium capitalize">{title}</div>
        )
      }
      <ListOptionsPopover listId={listId} boardId={boardId} />
    </div>
  );
};

export default ListHeader;
