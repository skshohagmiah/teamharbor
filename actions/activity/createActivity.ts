"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ActivityType } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateActivityProps {
  boardId: string;
  type: ActivityType;
  content: string;
}

export async function CreateActivity({
  boardId,
  type,
  content,
}: CreateActivityProps) {
  const user = await getCurrentUser();

  try {
    await prisma.activity.create({
      data: {
        content: content,
        boardId,
        type: type,
        userId: user?.id || "",
      },
    });
    revalidatePath(`/board/${boardId}/activity`);
    return {
      status: true,
      message: "activity created successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "something went wrong. no activity created.",
    };
  }
}
