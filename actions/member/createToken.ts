'use server';

import { prisma } from "@/lib/db";

export async function createToken(boardId:string,token:string,expires:number) {
    try {
        await prisma.inviteToken.create({
            data:{
                boardId,
                token,
                expires
            }
        })
    } catch (error) {
        console.log(error)
    }
}