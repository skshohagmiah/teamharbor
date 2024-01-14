"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateActivity } from "../activity/createActivity";

export async function editCard(
  cardId: string,
  content: string,
  boardId: string
) {
  try {
    await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        content,
      },
    });
    CreateActivity({
      boardId,
      type: "UPDATE",
      content: "Card content has been updated.",
    });
    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "card content edited successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "card content not be edited, something went wrong!",
    };
  }
}
