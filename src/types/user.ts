export interface User {
    id: number
    username: string
    email: string
    role: 'admin' | 'manager' | 'employee'
    manager_type?: string
    first_name: string
    last_name: string
    is_active: boolean
}