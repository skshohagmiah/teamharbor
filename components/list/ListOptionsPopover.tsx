import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy, Delete, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { deleteList } from "@/actions/list/deleteList";
import { toast } from "sonner";
import { copyList } from "@/actions/list/copyList";

interface ListOptionsPopoverProps{
  listId:string,
  boardId:string
}

const ListOptionsPopover = ({listId,boardId}:ListOptionsPopoverProps) => {

  const onDelete = async() => {
      const res = await deleteList(listId,boardId);
      toast(res.message)
  }


  const onCopy = async() => {
    const res = await copyList(listId);
    toast(res.message)
  }

  return (
    <div className="hover:opacity-35">
      <Popover >
        <PopoverTrigger>
            <MoreHorizontal />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <Button onClick={onCopy} size="sm" variant='ghost' className="flex gap-2">Copy List <Copy /> </Button>
            <Button onClick={onDelete} size="sm" variant='ghost' className="flex gap-2">Delete List<Delete /> </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ListOptionsPopover;
