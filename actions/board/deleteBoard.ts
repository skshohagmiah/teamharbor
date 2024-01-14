"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBoard(boardId: string) {
  try {
    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
    revalidatePath("/");
    return {
      status: true,
      message: "board deleted successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "board not deleted, something went wrong!",
    };
  }
}
