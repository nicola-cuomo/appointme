import Link from "next/link";
import { Suspense, cache } from "react";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookUser,
  CircleUserRound,
  LayoutDashboard,
  Lightbulb,
  Loader2Icon,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";
import { getUserProfileUseCase } from "@/use-cases/users";
import { ModeToggle } from "./mode-toggle";
import { MenuButton } from "./menu-button";
import { UserId } from "@/types";
import { MobileSidebar } from "../layout/mobile-sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";

const profilerLoader = cache(getUserProfileUseCase);

export async function Header() {
  const user = await getCurrentUser();

  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="md:hidden">
            <MenuButton />
          </div>
          <Link href="/" className="flex items-center gap-2 text-xl">
            <Lightbulb />
            <h1 className="text-lg font-semibold">App Name</h1>
          </Link>

          {/* <div className="flex items-center gap-2">
            {user && (
              <>
                <Button
                  variant={"link"}
                  asChild
                  className="flex items-center justify-center gap-2"
                >
                  <Link href={"/dashboard"}>
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                </Button>
                {user.role === "admin" && (
                  <Button
                    variant={"link"}
                    asChild
                    className="flex items-center justify-center gap-2"
                  ></Button>
                )}
              </>
            )}
          </div> FL commented for replace with sidebar menu  */}
        </div>

        <div className="flex items-center justify-between gap-5">
          <Suspense
            fallback={
              <div className="flex w-40 items-center justify-center">
                <Loader2Icon className="h-4 w-4 animate-spin" />
              </div>
            }
          >
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function ProfileAvatar({ userId }: { userId: number }) {
  const profile = await profilerLoader(userId);

  return (
    <Avatar>
      <AvatarImage src={profile.image ? profile.image : ""} />{" "}
      {/* FL fix view image from profile's field image */}
      <AvatarFallback>
        {profile.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
      </AvatarFallback>
    </Avatar>
  );
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <>
          {/* <div className="hidden md:block"> FL commented for always see modetoggle */}
          <ModeToggle />
          {/* </div> */}
          <ProfileDropdown userId={user.id} />
          {/*  <div className="md:hidden">
            <MenuButton />
          </div> FL move the menubutton on function Header()*/}
        </>
      ) : (
        <>
          <ModeToggle />

          <Button asChild variant="secondary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </>
  );
}
async function ProfileDropdown({ userId }: { userId: UserId }) {
  const profile = await profilerLoader(userId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Suspense
          fallback={
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800">
              ..
            </div>
          }
        >
          <ProfileAvatar userId={userId} />
        </Suspense>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="space-y-2">
        <DropdownMenuItem asChild>
          <Link className="item-left flex" href={`/config/user/${userId}`}>
            <CircleUserRound className="mr-2 h-4 w-4" />
            {profile.displayName}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="item-left flex" href={"/config/settings"}>
            <Settings className="mr-2 h-4 w-4" />
            Setting
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="flex items-center" href={"/api/sign-out"}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
