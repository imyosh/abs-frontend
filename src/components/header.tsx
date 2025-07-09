import { useState } from "react";
import { CircuitBoardIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import LogoutAlert from "./logout-alert";

export default function Header() {
  const { user } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-3 px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <CircuitBoardIcon className="size-8 sm:size-10 fill-primary text-background" />
        <h1 className="text-xl sm:text-2xl font-bold">Parking Spot</h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-10">
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="#"
            className="text-lg text-muted-foreground font-medium hover:text-foreground"
          >
            About
          </a>
          <a
            href="#"
            className="text-lg text-muted-foreground font-medium hover:text-foreground"
          >
            Contact
          </a>
        </div>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer size-8 sm:size-10">
                <AvatarImage src={user?.picture} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem
                className="!text-destructive"
                onClick={() => setLogoutDialogOpen(true)}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <LogoutAlert
          open={logoutDialogOpen}
          onOpenChange={setLogoutDialogOpen}
        />
      </div>
    </div>
  );
}
