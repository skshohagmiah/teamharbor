import Image from "next/image";
import React from "react";
import SignInbutton from "../SignInbutton";
import { auth } from "@/auth";
import CreateBoardButton from "../board/CreateBoardButton";
import logo from '@/public/logo.svg'
import Link from "next/link";

const Navbar = async() => {
  const session = await auth()
  return (
    <header className="bg-white sticky top-0 left-0 right-0 z-[50] shadow-md overflow-hidden">
      <div className="max-w-7xl w-full flex justify-between items-center p-2 mx-auto">
        <Link href={'/'} className="flex gap-2">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className=""
          />
          <p className="font-bold text-lg">TeamHarbor</p>
        </Link>
        <div>
          {
            session ? (
              <CreateBoardButton />
            ):(
              <SignInbutton label="Sign In" />
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
