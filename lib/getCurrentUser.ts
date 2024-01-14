import { auth } from "@/auth"
import { prisma } from "./db"

export const getCurrentUser = async() => {
    try {
        const session = await auth();
        const user = await prisma.user.findUnique({
            where:{
                email:session?.user?.email || ''
            }
        })
        return user
    } catch (error) {
        console.log(error)
    }
}