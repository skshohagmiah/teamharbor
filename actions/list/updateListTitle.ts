"use server";

import { prisma } from "@/lib/db";
import { CreateActivity } from "../activity/createActivity";
import { revalidatePath } from "next/cache";

export async function updateListTitle(
  listId: string,
  boardId: string,
  name: string
) {
  try {
    await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        name,
      },
    });
    CreateActivity({
      boardId,
      type: "UPDATE",
      content: "List name has been updated",
    });
    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "List name has been updated.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "List name not updated, something went wrong.",
    };
  }
}
