"use server";

import { prisma } from "@/lib/db";
import { Card, List } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface updateListProps {
  boardId: string;
  lists: List[] &
    {
      cards: Card[];
    }[];
}

export const updateList = async ({ lists, boardId }: updateListProps) => {
  console.log(lists);
  try {
    const transactions = lists.map((listitem) =>
      prisma.list.update({
        where: {
          id: listitem.id,
        },
        data: {
          name: listitem.name,
          position: listitem.position,
        },
      })
    );

    await prisma.$transaction(transactions);

    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "List updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "List not updated. something went wrong!",
    };
  }
};
