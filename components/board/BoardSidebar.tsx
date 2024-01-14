"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaFlipboard } from "react-icons/fa";
import { X, Activity } from "lucide-react";
import { FaPeopleGroup } from "react-icons/fa6";
import { BoardCombobox } from "./BoardCombobox";
import { Board } from "@prisma/client";
import Link from "next/link";
import SignOutButton from "../signOutButton";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BoardSidebarProps {
  boards: Board[];
}

const BoardSidebar = ({ boards }: BoardSidebarProps) => {
  const [isCollopse, setIsCollopse] = useState<boolean>();
  const params = useParams();
  const pathname = usePathname();
  const active = pathname.includes("/activity");

  return (
    <div className="bg-white p-4 h-full">
      {isCollopse ? (
        <Button
          onClick={() => setIsCollopse(false)}
          size="sm"
          variant="outline"
          className="mt-2"
        >
          <FaAngleDoubleRight className="w-6 h-6" />
        </Button>
      ) : (
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          <div className="flex items-center justify-between gap-6 mt-2">
            <h2 className="text-lg font-semibold">Workspaces</h2>
            <Button
              className="hidden md:block"
              onClick={() => setIsCollopse(true)}
              size="sm"
              variant="outline"
            >
              <X className="w-6 h-8" />
            </Button>
          </div>

          <hr className="my-4" />
          <div className="flex items-center justify-between gap-2">
            <FaFlipboard className="w-6 h-6" />
            <BoardCombobox boards={boards} />
          </div>

          <hr className="my-4" />
          <div className="flex flex-col gap-4 mt-4">
            <div
              className={cn(
                "flex justify-left gap-4 hover:bg-slate-300 p-2 rounded-md transition duration-200",
                active && "bg-slate-200"
              )}
            >
              <Activity />
              <Link className="w-full" href={`/board/${params.id}/activity`}>
                Activity
              </Link>
            </div>
            <div
              className={cn(
                "flex justify-left gap-4 hover:bg-slate-300 p-2 rounded-md transition duration-200",
                pathname.includes("/members") && "bg-slate-200"
              )}
            >
              <FaPeopleGroup className="w-6 h-6" />
              <Link className="w-full" href={`/board/${params.id}/members`}>
                Members
              </Link>
            </div>
          </div>

          <div className="mt-auto mb-10 flex items-end">
            <SignOutButton label="Exit" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardSidebar;
