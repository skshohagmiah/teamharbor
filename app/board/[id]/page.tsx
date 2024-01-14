import ListContainer from "@/components/board/ListContainer";
import { prisma } from "@/lib/db";

import React from "react";

const BoardIdPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const board = await prisma.board.findFirst({
    where: {
      id: id,
    },
  });
  const lists = await prisma.list.findMany({
    where: {
      boardId: id,
    },
    include: {
      cards: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  return (
    <div className="h-full max-w-7xl mx-auto flex gap-2">
      <ListContainer board={board!} lists={lists} />
    </div>
  );
};

export default BoardIdPage;
