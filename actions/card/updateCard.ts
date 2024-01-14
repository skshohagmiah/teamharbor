"use server";

import { prisma } from "@/lib/db";
import { Card, List } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { updateList } from "../list/updateList";

interface updateListProps {
  sourceId: string;
  destinationId: string;
  boardId: string;
  lists: List[] &
    {
      cards: Card[];
    }[];
}

export const updateCard = async ({
  lists,
  boardId,
  sourceId,
  destinationId,
}: updateListProps) => {
  console.log(lists);
  try {
    const sourcelist = lists.find((list) => list.id === sourceId);

    const destinationList = lists.find((list) => list.id === destinationId);

    //@ts-ignore
    const SourceListtransactions = sourcelist.cards.map((card, index) =>
      prisma.card.update({
        where: {
          id: card.id,
        },
        data: {
          position: card.position,
          content: card.content,
          listId: sourcelist?.id,
        },
      })
    );

    //@ts-ignore
    const destinationListtransactions = destinationList.cards.map(
      //@ts-ignore
      (card, index) =>
        prisma.card.update({
          where: {
            id: card.id,
          },
          data: {
            position: card.position,
            content: card.content,
            listId: destinationList?.id,
          },
        })
    );

    const result = await prisma.$transaction(SourceListtransactions);
    console.log(result);

    const destination = await prisma.$transaction(destinationListtransactions);
    console.log(destination);

    const allLists = await prisma.list.findMany({
      where: {
        boardId: boardId,
      },
      include: {
        cards: true,
      },
      orderBy: {
        position: "asc",
      },
    });

    updateList({ lists: allLists, boardId: boardId });

    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "list card updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "list card not updated, something went wrong!",
    };
  }
};
