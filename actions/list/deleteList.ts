"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateActivity } from "../activity/createActivity";

export async function deleteList(listId: string, boardId: string) {
  try {
    await prisma.list.delete({
      where: {
        id: listId,
      },
    });
    CreateActivity({
      boardId: boardId,
      type: "DELETE",
      content: "List has been deleted",
    });
    revalidatePath(`/board/${boardId}`);
    return {
      status: true,
      message: "list has deleted succesfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      statas: false,
      message: "list not deleted, something went wrong!",
    };
  }
}
