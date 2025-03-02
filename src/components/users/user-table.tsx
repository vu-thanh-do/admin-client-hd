// src/components/users/user-table.tsx
"use client"

import { useState } from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Search, MoreHorizontal, Edit, Trash } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserDialog from '@/components/users/user-dialog'

// Define the user data type
type User = {
    id: string
    name: string
    email: string
    role: string
    status: 'active' | 'inactive' | 'pending'
    lastActive: string
    initials: string
}

// Sample data
const users: User[] = [
    {
        id: '1',
        name: 'Alex Morgan',
        email: 'alex@example.com',
        role: 'Admin',
        status: 'active',
        lastActive: '2 minutes ago',
        initials: 'AM',
    },
    {
        id: '2',
        name: 'Sara Chen',
        email: 'sara@example.com',
        role: 'Editor',
        status: 'active',
        lastActive: '1 hour ago',
        initials: 'SC',
    },
    {
        id: '3',
        name: 'David Kim',
        email: 'david@example.com',
        role: 'User',
        status: 'active',
        lastActive: '3 hours ago',
        initials: 'DK',
    },
    {
        id: '4',
        name: 'Mia Johnson',
        email: 'mia@example.com',
        role: 'User',
        status: 'inactive',
        lastActive: '1 day ago',
        initials: 'MJ',
    },
    {
        id: '5',
        name: 'Ryan Patel',
        email: 'ryan@example.com',
        role: 'Editor',
        status: 'pending',
        lastActive: '2 days ago',
        initials: 'RP',
    },
    {
        id: '6',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        role: 'User',
        status: 'active',
        lastActive: '4 hours ago',
        initials: 'EW',
    },
    {
        id: '7',
        name: 'Lucas Garcia',
        email: 'lucas@example.com',
        role: 'Editor',
        status: 'active',
        lastActive: '5 hours ago',
        initials: 'LG',
    },
    {
        id: '8',
        name: 'Sophia Lee',
        email: 'sophia@example.com',
        role: 'Admin',
        status: 'active',
        lastActive: '1 day ago',
        initials: 'SL',
    },
    {
        id: '9',
        name: 'Noah Martinez',
        email: 'noah@example.com',
        role: 'User',
        status: 'inactive',
        lastActive: '3 days ago',
        initials: 'NM',
    },
    {
        id: '10',
        name: 'Olivia Brown',
        email: 'olivia@example.com',
        role: 'User',
        status: 'pending',
        lastActive: '1 week ago',
        initials: 'OB',
    },
]

export default function UserTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    // Define columns
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
                const user = row.original
                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                {user.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => <div>{row.getValue('role')}</div>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                return (
                    <div className="flex w-full justify-center">
                        <div className={`
              rounded-full px-2 py-1 text-xs font-medium
              ${status === 'active' ? 'bg-green-500/10 text-green-500' : ''}
              ${status === 'inactive' ? 'bg-gray-500/10 text-gray-500' : ''}
              ${status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : ''}
            `}>
                            {status}
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'lastActive',
            header: 'Last Active',
            cell: ({ row }) => <div className="text-sm">{row.getValue('lastActive')}</div>,
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const user = row.original
                return (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <UserDialog user={user}>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                </UserDialog>
                                <DropdownMenuItem className="text-destructive">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: users,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <div className="flex items-center border rounded-md bg-background/50 px-3 flex-1 max-w-sm">
                    <Search className="h-4 w-4 text-muted-foreground mr-2" />
                    <Input
                        placeholder="Search users..."
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                            table.getColumn('name')?.setFilterValue(event.target.value)
                        }
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    />
                </div>
            </div>
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {table.getFilteredRowModel().rows.length} of {users.length} users
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}