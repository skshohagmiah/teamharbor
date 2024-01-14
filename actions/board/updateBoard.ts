"use server";

import { prisma } from "@/lib/db";
import { CreateActivity } from "../activity/createActivity";
import { revalidatePath } from "next/cache";

export async function updateBoard(boardId: string, name: string) {
  try {
    await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        name,
      },
    });
    CreateActivity({
      boardId,
      type: "UPDATE",
      content: "Board name has been updated",
    });
    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "board name has been updated.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "board name not updated, something went wrong.",
    };
  }
}
