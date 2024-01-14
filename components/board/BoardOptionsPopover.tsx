import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy, Delete, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { copyBoard } from "@/actions/board/copyBoard";
import { toast } from "sonner";
import { deleteBoard } from "@/actions/board/deleteBoard";

const BoardOptionsPopover = () => {
  const params = useParams();
  const router = useRouter();

  const { id } = params;

  const onCopy = async () => {
    const res = await copyBoard(id as string);
    toast(res.message);
    router.push(res.url || "");
  };

  const onDelete = async () => {
    const res = await deleteBoard(id as string);
    toast(res.message);
    router.replace("/");
  };

  return (
    <div className="hover:opacity-35">
      <Popover>
        <PopoverTrigger>
          <MoreHorizontal />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <Button
              onClick={onCopy}
              size="sm"
              variant="ghost"
              className="flex gap-2"
            >
              Copy Board <Copy />{" "}
            </Button>
            <Button
              onClick={onDelete}
              size="sm"
              variant="ghost"
              className="flex gap-2"
            >
              Delete Board <Delete />{" "}
            </Button>
            {/* <Avatar /> */}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BoardOptionsPopover;
