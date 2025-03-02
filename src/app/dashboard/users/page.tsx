// src/app/(dashboard)/users/page.tsx
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import UserTable from '@/components/users/user-table'
import UserDialog from '@/components/users/user-dialog'

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <UserDialog>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                </UserDialog>
            </div>
            <Suspense fallback={<div>Loading users...</div>}>
                <UserTable />
            </Suspense>
        </div>
    )
}