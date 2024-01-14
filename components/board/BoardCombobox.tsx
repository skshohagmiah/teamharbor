"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Board } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

interface BoardComboboxProps {
  boards: Board[];
}

export function BoardCombobox({ boards }: BoardComboboxProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(params.id);

  const baordsData = boards?.map((board) => ({
    id: board.id,
    value: board.name,
    label: board.name,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? boards.find((board) => board.id === params.id)?.name
            : "Select board..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search board..." />
          <CommandEmpty>No board found.</CommandEmpty>
          <CommandGroup>
            {baordsData?.map((board) => (
              <CommandItem
                key={board.value}
                value={board.value}
                onSelect={(currentValue: string) => {
                  setValue(board.value);
                  setOpen(false);
                  router.push(`/board/${board.id}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === board.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {board.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
