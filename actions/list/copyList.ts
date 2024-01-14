"use server";

import { prisma } from "@/lib/db";
import { CreateActivity } from "../activity/createActivity";
import { revalidatePath } from "next/cache";

export async function copyList(listId: String) {
  try {
    const existingList = await prisma.list.findFirst({
      where: {
        id: listId as string,
      },
      include: {
        cards: true,
      },
    });

    const lastList = await prisma.list.findMany({
      where: {
        boardId: existingList?.boardId,
      },
      select: {
        position: true,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newList = await prisma.list.create({
      data: {
        name: `${existingList?.name} Copy`,
        boardId: existingList?.boardId || "",
        position: lastList[0].position + 1,
      },
    });

    const newcards = existingList?.cards.map((card) => ({
      content: card.content,
      listId: newList.id,
    }));

    for (const card of newcards as []) {
      const cardItem: { content: string; listId: string } = card;
      await prisma.card.create({
        data: {
          content: cardItem?.content,
          listId: cardItem?.listId,
        },
      });
    }

    CreateActivity({
      boardId: newList.boardId,
      type: "CREARTE",
      content: "New list has been created",
    });
    revalidatePath(`/board/${newList.boardId}`);
    return {
      status: true,
      message: "new list copy has been created",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "list not copied. something went wrong!",
    };
  }
}
