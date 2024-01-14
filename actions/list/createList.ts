"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateActivity } from "../activity/createActivity";

export const createList = async (value: string, boardId: string) => {
  try {
    const lastListPostion = await prisma.list.findMany({
      where: {
        boardId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const lastPostion = lastListPostion[0]?.position
      ? lastListPostion[0].position + 1
      : 1;

    await prisma.list.create({
      data: {
        name: value,
        boardId,
        position: lastPostion,
        cards: {
          create: {
            content:
              "This card is created autumatically, bcz One card is required to DnD feature",
            position: 1,
          },
        },
      },
    });
    CreateActivity({
      boardId: boardId,
      type: "CREARTE",
      content: "New list and new card has been created",
    });
    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "board list created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "list not created something went wrong!",
    };
  }
};
