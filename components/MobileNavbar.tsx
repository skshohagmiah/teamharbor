import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import BoardSidebar from "./board/BoardSidebar";
import { Board, List } from "@prisma/client";

const MobileNavbar = ({ boards }: { boards: Board[] }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="flex gap-2">
          <Menu /> Menu
        </SheetTrigger>
        <SheetContent>
          <BoardSidebar boards={boards} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
