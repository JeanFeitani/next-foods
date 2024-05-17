import { Button } from '@/app/(main)/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/(main)/components/ui/dialog'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

interface GoogleDialogProps {
  isLoginDialogOpen: boolean
  setIsLoginDialogOpen: any
}

const GoogleDialog = ({
  isLoginDialogOpen,
  setIsLoginDialogOpen,
}: GoogleDialogProps) => {
  return (
    <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
      <DialogContent className="h-[177px] w-[318px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-base font-bold">
            Faça login na plataforma!
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            Conecte-se usando a conta do
            <br />
            google.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => signIn('google', { redirect: false })}
            className="w-full border border-red-500 bg-white font-semibold text-red-500 hover:bg-red-100"
          >
            <Image
              src="/google.svg"
              width={16}
              height={16}
              alt="Google logo"
              className="mr-1"
              quality={100}
            />
            Google
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default GoogleDialog
