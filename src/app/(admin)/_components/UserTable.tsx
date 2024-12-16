"use client"
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2, UserPlus, Check } from 'lucide-react'
import { User } from "@/types/user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { toggleUserStatus } from "@/app/(admin)/actions"
import {toast, ToastContainer} from "react-toastify";
import {revalidatePath} from "next/cache";
import { useRouter } from "next/navigation";


interface UserTableProps {
  initialUsers: User[]; // Accept users as a prop
}

export default function UserTable({ initialUsers }: UserTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const filteredUsers = selectedRole ? users.filter(user => user.role === selectedRole) : users


  const router = useRouter()
  const handleAddUser = (role: string) => {
    console.log(`Add new ${role}`)
    // Implement the logic to add a new user with the specified role
  }

  const handleActivateAccount = async (userId: number) => {
    const prevUsers = [...users]

    // Optimistically update the UI
    setUsers((prevUsers) =>
        prevUsers.map((user) =>
            user.id === userId ? { ...user, is_active: !user.is_active } : user
        )
    )

    try {
      const result = await toggleUserStatus(userId)
      toast.success(result)
      console.log(result)
      router.refresh()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
      toast.error(errorMessage)
      console.error(errorMessage)
      setUsers(prevUsers)
    }
  }

  return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <ToastContainer />
          <Select onValueChange={(value) => setSelectedRole(value === 'all' ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-x-2">
            <Button onClick={() => handleAddUser('admin')} className="bg-[#0E708B] hover:bg-[#0c5f75]">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
            <Button onClick={() => handleAddUser('manager')} className="bg-[#0E708B] hover:bg-[#0c5f75]">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Manager
            </Button>
            <Button onClick={() => handleAddUser('employee')} className="bg-[#0E708B] hover:bg-[#0c5f75]">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.first_name} ${user.last_name}`} />
                          <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">{user.first_name} {user.last_name}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      {user.role === 'manager' && (
                          <div className="text-sm text-muted-foreground mt-1">{user.manager_type}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.is_active ? 'default' : 'destructive'}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleActivateAccount(user.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            {user.is_active ? 'Deactivate' : 'Activate'} Account
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
  )
}
