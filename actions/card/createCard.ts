"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateActivity } from "../activity/createActivity";

export const createCard = async (
  value: string,
  boardId: string,
  listId: string
) => {
  try {
    const lastCardPostion = await prisma.card.findMany({
      where: {
        listId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        position: true,
      },
    });
    const lastCard = lastCardPostion[0]?.position
      ? lastCardPostion[0].position + 1
      : 1;

    await prisma.card.create({
      data: {
        content: value,
        listId,
        position: lastCard,
      },
    });

    CreateActivity({
      boardId: boardId,
      type: "CREARTE",
      content: "New Card Item has been created",
    });
    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "list card created successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: "card not created something went wrong!",
    };
  }
};
