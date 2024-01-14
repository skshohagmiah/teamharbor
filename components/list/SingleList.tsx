import { Card, List } from "@prisma/client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import CreateCardButton from "../card/CreateCardButton";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ListHeader from "./ListHeader";
import { Trash } from "lucide-react";
import { deleteCard } from "@/actions/card/deleteCard";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { editCard } from "@/actions/card/editCard";

interface SingleListProps {
  list: List & {
    cards: Card[];
  };
  index: number;
}

const SingleList = ({ list, index }: SingleListProps) => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const onCardEdit = async (cardId: string) => {
    const res = await editCard(cardId, content, list.boardId);
    toast(res.message);
    setIsEditing(false);
  };

  const onCardDelete = async (cardId: string) => {
    const res = await deleteCard(cardId, list.boardId);
    toast(res.message);
  };

  useEffect(() => {
    inputRef.current?.focus();
  },[isEditing])

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-white/70 p-2 rounded-sm h-fit"
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
                        className="relative flex items-center justify-between p-2 hover:opacity-90  bg-white/90 rounded-sm shadow-sm mt-2 group"
                      >
                        {isEditing ? (
                          <Input
                          ref={inputRef}
                            onBlur={() => onCardEdit(card.id)}
                            className="bg-transparent focus-visible:outline-none focus-visible:ring-0 border-none w-full h-6"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                        ) : (
                          <p
                            onClick={() => {
                              setIsEditing(true);
                              setContent(card.content);
                            }}
                            className="font-medium text-sm capitalize w-full"
                          >
                            {card.content}
                          </p>
                        )}
                        <Trash
                          onClick={() => onCardDelete(card.id)}
                          className="hidden group-hover:block shrink-0 w-5 h-5 absolute right-2"
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
