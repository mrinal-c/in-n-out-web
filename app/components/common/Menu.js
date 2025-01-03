"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, LogOut, MenuIcon, Settings, ArrowDownUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export const Menu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(_) => router.push("/dashboard")}>
            <Home />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(_) => router.push("/transactions")}>
            <ArrowDownUpIcon />
            Transactions
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(_) => router.push("/settings")}>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(_) => dispatch(logout())}>
            <LogOut />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
