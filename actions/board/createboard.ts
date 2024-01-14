"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateActivity } from "../activity/createActivity";

export async function createboard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  let res;
  try {
    const user = await getCurrentUser();
    res = await prisma.board.create({
      data: {
        image,
        name,
      },
    });
    await prisma.member.create({
      data: {
        boardId: res.id!,
        userId: user?.id!,
        role: "admin",
      },
    });
    CreateActivity({
      boardId: res.id,
      content: "new board has been created.",
      type: "CREARTE",
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
  redirect(`/board/${res?.id}`);
}
