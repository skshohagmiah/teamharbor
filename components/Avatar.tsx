import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";


interface AvatarComponentProps{
    src?:string;
    name?:string
}


const AvatarComponent = async({src,name}:AvatarComponentProps) => {
    const session = await auth()
  return (
    <div>
      <Avatar>
        <AvatarImage src={src || session?.user?.image as string} />
        <AvatarFallback>{name || session?.user?.name}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarComponent;
