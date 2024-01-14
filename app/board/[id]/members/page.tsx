import { CreateActivity } from "@/actions/activity/createActivity";
import { InviteMember } from "@/components/members/InviteMember";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import React from "react";

const membersPage = async ({ params }: { params: { id: string } }) => {
  const members = await prisma.member.findMany({
    where: {
      boardId: params.id,
    },
    include: {
      user: true,
    },
  });

  async function deleteMember(formdata: FormData) {
    "use server";
    const memberId = formdata.get("id");
    await prisma.member.delete({
      where: {
        id: memberId as string,
      },
    });
    CreateActivity({
      boardId: params.id,
      type: "DELETE",
      content: "An user has been deleted.",
    });
    revalidatePath(`/board/${params.id}/members`);
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mt-4">
        <h2 className="font-semibold text-lg md:text-2xl">All Board Members</h2>
        <InviteMember />
      </div>
      <div className="flex items-center justify-center flex-col gap-2 mt-2">
        {members.map((member) => (
          <div
            key={member.id}
            className="group relative hover:opacity-80 flex items-center justify-around flex-wrap gap-4 bg-slate-300 w-full p-2 rounded-md"
          >
            <Image
              src={member.user.image || ""}
              alt="member image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="text-lg">{member.user.name}</p>
            <p className="hidden md:block">{member.user.email}</p>
            <p>{member.role}</p>
            {member.role !== "admin" && (
              <form
                action={deleteMember}
                className={cn(
                  "hidden group-hover:block absolute right-4",
                  member.role === "admin" && "block"
                )}
              >
                <Button
                  type="submit"
                  className="p-0 bg-transparent hover:bg-transparent text-black"
                >
                  <Trash />
                  <input
                    type="text"
                    className="hidden"
                    name="id"
                    value={member.id}
                  />
                </Button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default membersPage;
