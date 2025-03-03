// src/components/layout/navbar.tsx
"use client"

import { useState } from 'react'
import { MoonStar, Search, Bell, User, Check } from 'lucide-react'
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Notification, NotificationIcons, NotificationListProps } from '@/types/notification'
import { signOut } from 'next-auth/react'

// Sample notification data - In a real app, this would come from your API
const sampleNotifications: Notification[] = [
    {
        id: 1,
        title: "New message",
        description: "You received a new message from Jane Smith",
        time: "Just now",
        read: false,
        type: "message"
    },
    {
        id: 2,
        title: "Project updated",
        description: "Project 'Dashboard Redesign' has been updated",
        time: "2 hours ago",
        read: false,
        type: "update"
    },
    {
        id: 3,
        title: "Meeting reminder",
        description: "Team meeting starts in 30 minutes",
        time: "5 hours ago",
        read: true,
        type: "reminder"
    },
]

// Notification Types with icons
const notificationIcons: NotificationIcons = {
    message: "💬",
    update: "🔄",
    reminder: "⏰",
    default: "📣"
}

export default function Navbar() {
    const { setTheme, theme } = useTheme()
    const [searchOpen, setSearchOpen] = useState(false)
    const [notifications, setNotifications] = useState(sampleNotifications)
    const [notificationOpen, setNotificationOpen] = useState(false)
    
    const unreadCount = notifications.filter(n => !n.read).length
    
    // Mark notification as read
    const markAsRead = (id: number) => {
        setNotifications(prev => 
            prev.map(notification => 
                notification.id === id ? { ...notification, read: true } : notification
            )
        )
    }
    
    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notification => ({ ...notification, read: true }))
        )
    }
    
    // Handle notification click
    const handleNotificationClick = (id: number) => {
        markAsRead(id)
        // Additional actions like navigation could be added here
    }

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
                <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                    {unreadCount}
                                </span>
                            )}
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h4 className="font-medium">Notifications</h4>
                            {unreadCount > 0 && (
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={markAllAsRead}
                                    className="h-8 text-xs"
                                >
                                    <Check className="h-3 w-3 mr-1" />
                                    Mark all as read
                                </Button>
                            )}
                        </div>
                        <Tabs defaultValue="all">
                            <TabsList className="w-full border-b rounded-none h-10">
                                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                                <TabsTrigger value="unread" className="flex-1">
                                    Unread
                                    {unreadCount > 0 && (
                                        <span className="ml-1 text-xs rounded-full bg-primary text-primary-foreground px-1.5">
                                            {unreadCount}
                                        </span>
                                    )}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                                <NotificationList 
                                    notifications={notifications} 
                                    handleNotificationClick={handleNotificationClick} 
                                />
                            </TabsContent>
                            <TabsContent value="unread">
                                <NotificationList 
                                    notifications={notifications.filter(n => !n.read)} 
                                    handleNotificationClick={handleNotificationClick} 
                                />
                            </TabsContent>
                        </Tabs>
                    </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
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
                        <DropdownMenuItem onClick={() => signOut()}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

// NotificationList component
function NotificationList({ notifications, handleNotificationClick }: NotificationListProps) {
    if (notifications.length === 0) {
        return (
            <div className="py-8 text-center text-muted-foreground">
                <p>No notifications to display</p>
            </div>
        )
    }

    return (
        <ScrollArea className="max-h-80">
            <div className="divide-y">
                {notifications.map((notification) => (
                    <div 
                        key={notification.id} 
                        className={`flex items-start p-4 gap-3 cursor-pointer transition-colors ${
                            notification.read 
                                ? 'bg-background hover:bg-muted/50' 
                                : 'bg-muted/20 hover:bg-muted/30'
                        }`}
                        onClick={() => handleNotificationClick(notification.id)}
                    >
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                            {notificationIcons[notification.type] || notificationIcons.default}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                </p>
                                <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                                    {notification.time}
                                </span>
                            </div>
                            <p className="text-xs mt-1 text-muted-foreground line-clamp-2">
                                {notification.description}
                            </p>
                        </div>
                        {!notification.read && (
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1"></div>
                        )}
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}