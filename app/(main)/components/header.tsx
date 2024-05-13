'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from 'lucide-react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Avatar, AvatarImage } from './ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Separator } from './ui/separator'
import Search from './search'

interface HeaderProps {
  searchBar?: boolean
}

const Header = ({ searchBar }: HeaderProps) => {
  const { data } = useSession()

  const handleSignInClick = () => signIn()
  const handleSignOutClick = () => signOut()

  return (
    <div className="flex items-center justify-between px-5 pt-6 xl:py-5 ">
      <Link href="/" className="relative h-[30px] w-[100px]">
        <Image src="/logo.png" alt="Next Foods" fill quality={100} />
      </Link>
      {searchBar && (
        <div className="w-[50%]">
          <Search />
        </div>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Perfil</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string}
                      alt={data?.user?.name as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(' ')[0][0]}
                      {data?.user?.name?.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data.user.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data.user.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-8">
                <h2 className="font-semibold">Olá. Faça seu login</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon size={20} />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full bg-primary p-4 text-sm font-normal text-white"
            >
              <HomeIcon size={16} />
              <span>Início</span>
            </Button>
            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full  p-4 text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span>Meus Pedidos</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full p-4 text-sm font-normal"
                >
                  <HeartIcon size={16} />
                  <span>Favoritos</span>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>
          {data?.user && (
            <Button
              onClick={handleSignOutClick}
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full  p-4 text-sm font-normal"
            >
              <LogOutIcon size={16} />
              <span>Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Header
