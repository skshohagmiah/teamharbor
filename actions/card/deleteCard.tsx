"use server";

import { prisma } from "@/lib/db";
import { CreateActivity } from "../activity/createActivity";
import { revalidatePath } from "next/cache";

export async function deleteCard(cardId: string, boardId: string) {
  try {
    await prisma.card.delete({
      where: {
        id: cardId,
      },
    });
    CreateActivity({
      boardId: boardId,
      type: "DELETE",
      content: "cart has been deleted",
    });
    revalidatePath(`/board/${boardId}`);
    return {
      status: false,
      message: "card has been deleted succesfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      messsage: "card not deleted, something went wrong!",
    };
  }
}
