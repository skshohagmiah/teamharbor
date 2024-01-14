import { Card, List } from "@prisma/client";
import React, { useEffect, useState } from "react";
import CreateCardButton from "../card/CreateCardButton";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ListHeader from "./ListHeader";
import { Trash } from "lucide-react";
import { deleteCard } from "@/actions/card/deleteCard";
import { toast } from "sonner";

interface SingleListProps {
  list: List & {
    cards: Card[];
  };
  index: number;
}

const SingleList = ({ list, index }: SingleListProps) => {
  const onCardDelete = async (cardId: string) => {
    const res = await deleteCard(cardId, list.boardId);
    toast(res.message);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-white/60 p-2 rounded-sm h-fit"
        >
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-between"
          >
            <ListHeader
              boardId={list.boardId}
              listId={list.id}
              name={list.name}
            />
          </div>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.cards.map((card, index) => (
                  <Draggable draggableId={card.id} index={index} key={card.id}>
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="flex items-center justify-between p-2 hover:opacity-90  bg-white/90 rounded-sm shadow-sm mt-2 group"
                      >
                        <p className="font-medium text-sm capitalize">
                          {card.content}
                        </p>
                        <Trash
                          onClick={() => onCardDelete(card.id)}
                          className="hidden group-hover:block shrink-0 w-4 h-4"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="mt-4">
            <CreateCardButton listId={list.id} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleList;
