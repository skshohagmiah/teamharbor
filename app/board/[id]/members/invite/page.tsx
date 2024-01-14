import { CreateActivity } from "@/actions/activity/createActivity";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Loader2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const InvitePage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const token = searchParams.token;
  const currentDate = new Date();
  const user = await getCurrentUser();

  const dbToken = await prisma.inviteToken.findFirst({
    where: {
      token: token,
    },
  });

  const isTokenValid = dbToken!.expires >= currentDate.getTime();

  const alreadyExistMember = await prisma.member.findFirst({
    where: {
      boardId: dbToken?.boardId,
      userId: user?.id,
    },
  });

  if (alreadyExistMember) {
    return (
      <div className="h-full w-full flex items-center justify-between text-xl">
        Sorry, This member already exist in this board.
      </div>
    );
  }

  if (isTokenValid) {
    await prisma.member.create({
      data: {
        boardId: dbToken?.boardId || "",
        userId: user?.id || "",
      },
    });
    CreateActivity({
      boardId: dbToken?.boardId || "",
      type: "CREARTE",
      content: "New member has been added.",
    });
    revalidatePath(`/board/${dbToken?.boardId}`);
    redirect(`/board/${dbToken?.boardId}`);
  } else {
    return <div>Something went wrong! Or Token is expired!</div>;
  }

  return (
    <div className="h-full w-full flex items-center justify-center fixed inset-0 z-50 gap-4 bg-white">
      <Loader2 className="animate-spin" />
      <p className="text-2xl font-medium text-center ">
        processing..., you are being added to board.
      </p>
    </div>
  );
};

export default InvitePage;
