"use client";
import { Board, Card, List } from "@prisma/client";
import React, { useEffect, useState } from "react";
import SingleList from "../list/SingleList";
import CreateListButton from "../list/CreateListButton";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { updateList } from "@/actions/list/updateList";
import { toast } from "sonner";
import { updateCard } from "@/actions/card/updateCard";
import BoardHeader from "./BoardHeader";

interface ListContainerProps {
  board: Board;
  lists: List[] &
    {
      cards: Card[];
    }[];
}

const ListContainer = ({ board, lists }: ListContainerProps) => {
  const [orderedData, setOrderData] = useState(lists);

  useEffect(() => {
    setOrderData(lists);
  }, [lists, orderedData]);

  async function onDragEnd(result: any) {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      // **Key change:** Use the spread operator to create a new array
      const newOrderData = [...orderedData];

      // **Key change:** Use correct index for removal
      const removedList = newOrderData.splice(source.index, 1)[0];

      // **Key change:** Insert at the correct destination index
      newOrderData.splice(destination.index, 0, removedList);

      setOrderData(
        newOrderData.map((list, index) => ({ ...list, position: index }))
      );

      const res = await updateList({
        lists: newOrderData.map((list, index) => ({
          ...list,
          position: index,
        })),
        boardId: board.id,
      });

      if (res) {
        toast(res.message);
      }
    }

    if (type === "card") {
      const { droppableId: sourceListId } = source;
      const { droppableId: destinationListId } = destination; // Use droppableId for destination as well

      const newOrderData = [...orderedData];
      const sourceList = newOrderData.find((list) => list.id === sourceListId);
      const removedCard = sourceList!.cards.splice(source.index, 1)[0]; // Use non-null assertion for sourceList

      if (destinationListId === sourceListId) {
        // Moving card within the same list
        sourceList!.cards.splice(destination.index, 0, removedCard); // No need for non-null assertion here
        sourceList!.cards.forEach((card, index) => {
          card.position = index; // Update position directly
        });
      } else {
        // Moving card to a different list
        const destinationList = newOrderData.find(
          (list) => list.id === destinationListId
        );
        destinationList!.cards.splice(destination.index, 0, removedCard); // Use non-null assertion for destinationList
        destinationList!.cards.forEach((card, index) => {
          card.position = index; // Update position directly
        });
      }

      const res = await updateCard({
        sourceId: sourceListId,
        destinationId: destinationListId,
        boardId: board.id,
        lists: newOrderData,
      });
      toast(res.message);
      setOrderData(newOrderData);
    }
  }

  return (
    <div style={{ backgroundImage: `url(${board?.image})` }} className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full h-full backdrop-brightness-75 ">
          <BoardHeader boardId={board?.id} boardName={board?.name} />
          <Droppable droppableId="lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-content-start w-full flex-1 rounded-md p-2 backdrop-opacity-55"
              >
                {orderedData.map((list, index) => (
                  <div key={list.id} className="h-fit">
                    {/* @ts-ignore */}
                    <SingleList list={list!} index={index} />
                  </div>
                ))}
                {provided.placeholder}
                <CreateListButton />
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ListContainer;
