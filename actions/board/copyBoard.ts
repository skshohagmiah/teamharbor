"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Board } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function copyBoard(boardId: string) {
  let res: Board;
  try {
    const user = await getCurrentUser();
    const existingBoard = await prisma.board.findFirst({
      where: {
        id: boardId,
      },
      include: {
        lists: {
          include: {
            cards: true,
          },
        },
        members: true,
      },
    });

    res = await prisma.board.create({
      data: {
        name: `${existingBoard?.name} Copy`,
        image: existingBoard?.image || "",
      },
    });

    for (const list of existingBoard!.lists) {
      const newList = await prisma.list.create({
        data: {
          boardId: res.id,
          name: list.name,
          position: list.position,
        },
      });

      for (const card of list.cards) {
        const newCard = await prisma.card.create({
          data: {
            content: card.content,
            position: card.position,
            listId: newList.id,
          },
        });
      }
    }

    for (const member of existingBoard!.members) {
      await prisma.member.create({
        data: {
          boardId: res.id,
          userId: member.userId,
        },
      });
    }

    await prisma.activity.create({
      data: {
        content: "new board has beeen created",
        boardId: boardId,
        userId: user?.id || "",
        type: "CREARTE",
      },
    });
    revalidatePath(`/board/${res.id}`);

    return {
      status: true,
      url: res.id,
      message: "Board copied successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      messsage: "Board not copied successfully",
    };
  }
  //@ts-ignore
}
