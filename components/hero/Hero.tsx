import React from "react";
import Image from "next/image";
import SignInbutton from "../SignInbutton";
import heroImage from "@/public/hero.png";

const Hero = () => {
  return (
    <main className="bg-gradient-to-r from-purple-500 to-pink-500 h-full md:h-auto pt-10 md:pt-0">
      <section className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-12 w-full overflow-hidden">
        <div className="flex flex-col gap-4 text-center md:text-start ">
          <h1 className="font-semibold text-3xl md:text-5xl md:w-[500px] leading-[1.2] text-white">
            TeamHarbor brings all your tasks, teammates, and tools together
          </h1>
          <p className="text-muted md:w-[500px] text-sm">
            Simple, flexible, and powerful. All it takes are boards, lists, and
            cards to get a clear view of who’s doing what and what needs to get
            done.{" "}
          </p>
          <div>
            <SignInbutton label="Sign Up For Free" padding="p-6" />
          </div>
        </div>
        <div className="relative w-[90%] md:w-[40rem] h-[20rem] md:h-[35rem]">
          <Image
            className="object-contain"
            src={heroImage}
            alt="hero image"
            fill
          />
        </div>
      </section>
    </main>
  );
};

export default Hero;
