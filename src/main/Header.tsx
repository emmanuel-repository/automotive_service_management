import React, { useEffect, useState } from "react";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');

  useEffect(() => {
    setEmail(dataSession.email)
    setName(dataSession.name)
  }, [dataSession.email, dataSession.name])

  return (
    <>
      <header className="bg-gray-400 p-2 rounded-lg h-auto">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          <div className="flex h-5 items-center space-x-4 text-sm">
            <div className="space-y-1">
              <h4 className="text-md font-medium leading-none text-black">{name}</h4>
              <p className="text-sm text-muted-foreground ">
                {email}
              </p>
            </div>
          </div>

          <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">

              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>

                <DropdownMenuItem>
                  <User />
                  <span>Perfil</span>
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <CreditCard />
                  <span>Facturación</span>
                  {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings />
                  <span>Configuraciones</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </DropdownMenuItem>

              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LogOut />
                <span>Log out</span>
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu >
        </div>
      </header>
    </>
  )
}