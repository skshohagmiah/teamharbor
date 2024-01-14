'use client'
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams, usePathname } from "next/navigation"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react"
import { createToken } from "@/actions/member/createToken"

export function InviteMember() {
    const [value, setValue] = useState('')
    const params = useParams();
    const pathname = usePathname();
    
    const onInvite = async() => {
        const token = uuidv4();
        const expiresAt = new Date().getTime() + 3_600_000;

        await createToken(params.id as string,token,expiresAt)
        setValue(`${process.env.NEXT_PUBLIC_MEMBER_INVITE_LINK}${pathname}/invite?token=${token}`)

    }

    const onCopy = () => {
        navigator.clipboard.writeText(value);
    }


  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button onClick={onInvite} size='lg' variant="destructive"> Invite Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link to invite member</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be added to board.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={value}
              readOnly
            />
          </div>
          <Button onClick={onCopy} type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
