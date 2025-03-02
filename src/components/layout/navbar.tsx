// src/components/layout/navbar.tsx
"use client"

import { useState } from 'react'
import { MoonStar, Search, Bell, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'

export default function Navbar() {
    const { setTheme } = useTheme()
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm transition-all">
            <div className="flex flex-1 items-center gap-4">
                {searchOpen ? (
                    <div className="flex w-full max-w-sm items-center">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="rounded-r-none focus-visible:ring-0"
                            autoFocus
                            onBlur={() => setSearchOpen(false)}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 rounded-l-none border border-l-0"
                            onClick={() => setSearchOpen(false)}
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                        3
                    </span>
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setTheme('dark')}>
                    <MoonStar className="h-5 w-5" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="" alt="User" />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white">JD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">John Doe</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    admin@example.com
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <MoonStar className="mr-2 h-4 w-4" />
                            <span>Dark mode</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}