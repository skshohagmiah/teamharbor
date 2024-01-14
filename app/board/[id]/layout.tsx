import MobileNavbar from "@/components/MobileNavbar";
import BoardSidebar from "@/components/board/BoardSidebar";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import React from "react";

const BoardIdLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  const boards = await prisma.board.findMany({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-2 min-h-full flex flex-col md:flex-row gap-2">
      <div className="hidden  md:block">
        <BoardSidebar boards={boards} />
      </div>
      <div className="md:hidden">
        <MobileNavbar boards={boards} />
      </div>
      <div className="w-full relative overflow-scroll">{children}</div>
    </div>
  );
};

export default BoardIdLayout;
