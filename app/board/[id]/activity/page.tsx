import { prisma } from "@/lib/db";
import Image from "next/image";
import React from "react";

const ActivityPage = async ({ params }: { params: { id: string } }) => {
  const activities = await prisma.activity.findMany({
    where: {
      boardId: params.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="md:p-4 p-2">
      <h2 className="text-center font-semibold text-2xl">
        Board Activity Logs
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-slate-300 flex flex-wrap md:gap-4 items-center justify-center rounded-sm"
          >
            <div className=" p-2 ">
              <p className="text-lg md:text-xl font-medium capitalize">
                {activity.content} / By
              </p>
              <small>Date: {activity.createdAt.toString().slice(0, 16)}</small>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Image
                src={activity.user.image || ""}
                alt="user image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p>{activity.user.name}</p>
              <p className="hidden md:block">{activity.user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
